"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService, type AuthUser, type UserRole } from "@/lib/auth"

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  // Registration methods
  registerUser: (email: string, fullName: string, role: UserRole, profile: any) => Promise<{ success: boolean; message: string }>
  verifyRegistration: (email: string, otp: string) => Promise<{ success: boolean; message: string }>
  // OTP methods
  sendOTP: (email: string) => Promise<{ success: boolean; message: string }>
  verifyOTPAndLogin: (email: string, otp: string) => Promise<{ success: boolean; message: string }>
  // Session management
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
  // Profile management
  updateProfile: (updates: any) => Promise<{ success: boolean; message: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for existing session
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const registerUser = async (email: string, fullName: string, role: UserRole, profile: any) => {
    try {
      const result = await authService.registerUser(email, fullName, role, profile)
      return result
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "Registration failed. Please try again." }
    }
  }

  const verifyRegistration = async (email: string, otp: string) => {
    try {
      const result = await authService.verifyRegistration(email, otp)
      // If registration verification successful, user is auto-logged in
      if (result.success && result.user && result.token) {
        setUser(result.user)
        localStorage.setItem('healthvault_token', result.token)
      }
      return result
    } catch (error) {
      console.error("Verify registration error:", error)
      return { success: false, message: "Verification failed. Please try again." }
    }
  }

  const sendOTP = async (email: string) => {
    try {
      const result = await authService.sendOTP(email)
      return result
    } catch (error) {
      console.error("Send OTP error:", error)
      return { success: false, message: "Failed to send OTP. Please try again." }
    }
  }

  const verifyOTPAndLogin = async (email: string, otp: string) => {
    try {
      const result = await authService.verifyOTPAndLogin(email, otp)
      if (result.success && result.user) {
        setUser(result.user)
      }
      return { success: result.success, message: result.message }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Login failed. Please try again." }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const refreshSession = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error("Refresh session error:", error)
      setUser(null)
    }
  }

  const updateProfile = async (updates: any) => {
    try {
      if (!user?.id) {
        return { success: false, message: "No user logged in" }
      }
      
      const result = await authService.updateProfile(user.id, updates)
      if (result.success) {
        // Refresh user data
        await refreshSession()
      }
      return result
    } catch (error) {
      console.error("Update profile error:", error)
      return { success: false, message: "Failed to update profile. Please try again." }
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        registerUser, 
        verifyRegistration,
        sendOTP, 
        verifyOTPAndLogin, 
        logout, 
        refreshSession, 
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
