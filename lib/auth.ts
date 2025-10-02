import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import { db, User, PatientProfile, DoctorProfile } from './database'
import { emailService } from './email-service'

// JWT secret - in production, this should be an environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'healthvault-secure-jwt-secret-key-2024-production'

export interface AuthUser {
  id: number
  email: string
  role: 'patient' | 'doctor'
  profile: PatientProfile | DoctorProfile
  isVerified: boolean
}

export class AuthService {
  // Generate a 6-digit OTP
  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Send OTP via email using EmailJS (client-side)
  static async sendOTP(email: string, otp: string, purpose: 'registration' | 'login' | 'reset'): Promise<boolean> {
    try {
      const result = await emailService.sendOTP(email, otp, purpose)
      return result.success
    } catch (error) {
      console.error('Failed to send OTP:', error)
      return false
    }
  }

  // Register user
  static async registerUser(
    email: string,
    role: 'patient' | 'doctor',
    profile: PatientProfile | DoctorProfile
  ): Promise<{ success: boolean; message: string; requiresOTP?: boolean }> {
    try {
      // Check if user already exists
      const existingUser = await db.getUserByEmail(email)
      if (existingUser) {
        return { success: false, message: 'User with this email already exists' }
      }

      // Create user (unverified)
      const userId = await db.createUser({
        email,
        role,
        profile,
        isVerified: false,
      })

      // Generate and send OTP
      const otp = this.generateOTP()
      await db.createOTP(email, otp, 'registration')
      
      const otpSent = await this.sendOTP(email, otp, 'registration')
      if (!otpSent) {
        return { success: false, message: 'Failed to send verification email' }
      }

      return { 
        success: true, 
        message: 'Registration successful! Please check your email for verification code.',
        requiresOTP: true 
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: 'Registration failed. Please try again.' }
    }
  }

  // Verify registration OTP and auto-login
  static async verifyRegistration(email: string, otp: string): Promise<{ success: boolean; message: string; user?: AuthUser; token?: string }> {
    try {
      const isValid = await db.verifyOTP(email, otp, 'registration')
      if (!isValid) {
        return { success: false, message: 'Invalid or expired verification code' }
      }

      // Mark user as verified
      await db.verifyUser(email)
      
      // Get the user
      const user = await db.getUserByEmail(email)
      if (!user || !user.id) {
        return { success: false, message: 'User not found after verification' }
      }

      // Update last login
      await db.updateUser(user.id, { lastLogin: new Date() })

      // Generate simple token for browser (using crypto-js which already works)
      const tokenPayload = JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      
      const token = CryptoJS.AES.encrypt(tokenPayload, JWT_SECRET).toString()

      // Store session
      await db.createSession(user.id, token)

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isVerified: user.isVerified,
      }

      return { 
        success: true, 
        message: 'Registration successful! Welcome to HealthVault.', 
        user: authUser,
        token 
      }
    } catch (error) {
      console.error('Verification error:', error)
      return { success: false, message: 'Verification failed. Please try again.' }
    }
  }

  // Login request (send OTP)
  static async requestLogin(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const user = await db.getUserByEmail(email)
      if (!user) {
        return { success: false, message: 'No account found with this email address' }
      }

      if (!user.isVerified) {
        return { success: false, message: 'Please verify your email address first' }
      }

      // Generate and send login OTP
      const otp = this.generateOTP()
      await db.createOTP(email, otp, 'login')
      
      const otpSent = await this.sendOTP(email, otp, 'login')
      if (!otpSent) {
        return { success: false, message: 'Failed to send login code' }
      }

      return { success: true, message: 'Login code sent to your email' }
    } catch (error) {
      console.error('Login request error:', error)
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  // Verify login OTP
  static async verifyLogin(email: string, otp: string): Promise<{ success: boolean; message: string; user?: AuthUser; token?: string }> {
    try {
      const isValid = await db.verifyOTP(email, otp, 'login')
      if (!isValid) {
        return { success: false, message: 'Invalid or expired login code' }
      }

      const user = await db.getUserByEmail(email)
      if (!user || !user.id) {
        return { success: false, message: 'User not found' }
      }

      // Update last login
      await db.updateUser(user.id, { lastLogin: new Date() })

      // Generate token using CryptoJS (browser-compatible)
      const tokenPayload = JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      
      const token = CryptoJS.AES.encrypt(tokenPayload, JWT_SECRET).toString()

      // Store session
      await db.createSession(user.id, token)

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isVerified: user.isVerified,
      }

      return { 
        success: true, 
        message: 'Login successful!', 
        user: authUser, 
        token 
      }
    } catch (error) {
      console.error('Login verification error:', error)
      return { success: false, message: 'Login failed. Please try again.' }
    }
  }

  // Validate token and get user
  static async validateToken(token: string): Promise<AuthUser | null> {
    try {
      // Check if session exists
      const session = await db.getSessionByToken(token)
      if (!session) {
        return null
      }

      let decoded: any
      
      // Try to decode token - handle both JWT and CryptoJS encrypted tokens
      try {
        // First try JWT (for login tokens)
        decoded = jwt.verify(token, JWT_SECRET) as any
      } catch (jwtError) {
        // If JWT fails, try CryptoJS decryption (for registration tokens)
        try {
          const decrypted = CryptoJS.AES.decrypt(token, JWT_SECRET).toString(CryptoJS.enc.Utf8)
          decoded = JSON.parse(decrypted)
          
          // Check if token expired
          if (decoded.exp && Date.now() > decoded.exp) {
            return null
          }
        } catch (cryptoError) {
          console.error('Token decode error:', cryptoError)
          return null
        }
      }

      if (!decoded.userId) {
        return null
      }

      // Get user data
      const user = await db.getUserById(decoded.userId)
      if (!user || !user.id) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        isVerified: user.isVerified,
      }
    } catch (error) {
      console.error('Token validation error:', error)
      return null
    }
  }

  // Logout
  static async logout(token: string): Promise<void> {
    try {
      await db.deleteSession(token)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Update user profile
  static async updateProfile(userId: number, profile: Partial<PatientProfile | DoctorProfile>): Promise<{ success: boolean; message: string }> {
    try {
      const user = await db.getUserById(userId)
      if (!user) {
        return { success: false, message: 'User not found' }
      }

      const updatedProfile = { ...user.profile, ...profile }
      await db.updateUser(userId, { profile: updatedProfile })

      return { success: true, message: 'Profile updated successfully' }
    } catch (error) {
      console.error('Profile update error:', error)
      return { success: false, message: 'Failed to update profile' }
    }
  }

  // Cleanup expired data
  static async cleanup(): Promise<void> {
    try {
      await db.cleanupExpiredOTPs()
      await db.cleanupExpiredSessions()
    } catch (error) {
      console.error('Cleanup error:', error)
    }
  }
}

// Auto-cleanup every hour
if (typeof window !== 'undefined') {
  setInterval(() => {
    AuthService.cleanup()
  }, 60 * 60 * 1000) // 1 hour
}

// Export types
export type { User, PatientProfile, DoctorProfile } from './database'
export type UserRole = 'patient' | 'doctor'

// Create a convenient service instance
export const authService = {
  // User management
  getCurrentUser: async (): Promise<AuthUser | null> => {
    if (typeof window === 'undefined') return null
    
    const token = localStorage.getItem('healthvault_token')
    if (!token) return null
    
    return AuthService.validateToken(token)
  },

  // Registration flow
  registerUser: async (
    email: string, 
    fullName: string, 
    role: UserRole, 
    additionalProfile: any
  ): Promise<{ success: boolean; message: string }> => {
    const profile = role === 'patient' 
      ? { fullName, dateOfBirth: '', address: '', phone: '', ...additionalProfile }
      : { fullName, specialization: '', licenseNumber: '', experience: 0, phone: '', ...additionalProfile }
    
    return AuthService.registerUser(email, role, profile)
  },

  verifyRegistration: AuthService.verifyRegistration,

  // Login flow
  sendOTP: async (email: string): Promise<{ success: boolean; message: string }> => {
    return AuthService.requestLogin(email)
  },

  verifyOTPAndLogin: async (email: string, otp: string): Promise<{ success: boolean; message: string; user?: AuthUser }> => {
    const result = await AuthService.verifyLogin(email, otp)
    if (result.success && result.token) {
      localStorage.setItem('healthvault_token', result.token)
    }
    return {
      success: result.success,
      message: result.message,
      user: result.user
    }
  },

  // Session management
  logout: async (): Promise<void> => {
    const token = localStorage.getItem('healthvault_token')
    if (token) {
      await AuthService.logout(token)
      localStorage.removeItem('healthvault_token')
    }
  },

  // Profile management
  updateProfile: async (userId: number, updates: any): Promise<{ success: boolean; message: string }> => {
    return AuthService.updateProfile(userId, updates)
  }
}
