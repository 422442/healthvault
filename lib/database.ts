import Dexie, { Table } from 'dexie'

// User interfaces
export interface User {
  id?: number
  email: string
  role: 'patient' | 'doctor'
  profile: PatientProfile | DoctorProfile
  createdAt: Date
  isVerified: boolean
  lastLogin?: Date
}

export interface PatientProfile {
  fullName: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  address: string
  emergencyContact: string
  emergencyPhone: string
  bloodGroup?: string
  allergies?: string[]
  medicalHistory?: string
}

export interface DoctorProfile {
  fullName: string
  phone: string
  specialty: string
  licenseNumber: string
  experience: number
  qualifications: string[]
  clinicName: string
  clinicAddress: string
  consultationFee: number
  bio?: string
  languages: string[]
}

// OTP storage
export interface OTPRecord {
  id?: number
  email: string
  otp: string
  purpose: 'registration' | 'login' | 'reset'
  expiresAt: Date
  attempts: number
  createdAt: Date
}

// Session management
export interface Session {
  id?: number
  userId: number
  token: string
  expiresAt: Date
  createdAt: Date
}

// Database class
export class HealthVaultDB extends Dexie {
  users!: Table<User>
  otps!: Table<OTPRecord>
  sessions!: Table<Session>

  constructor() {
    super('HealthVaultDB')
    
    this.version(1).stores({
      users: '++id, email, role, isVerified, createdAt',
      otps: '++id, email, purpose, expiresAt, createdAt',
      sessions: '++id, userId, token, expiresAt, createdAt'
    })
  }

  // User methods
  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<number> {
    const user: User = {
      ...userData,
      createdAt: new Date(),
    }
    return await this.users.add(user)
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.users.where('email').equals(email).first()
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.users.get(id)
  }

  async updateUser(id: number, updates: Partial<User>): Promise<void> {
    await this.users.update(id, updates)
  }

  async verifyUser(email: string): Promise<void> {
    await this.users.where('email').equals(email).modify({ isVerified: true })
  }

  // OTP methods
  async createOTP(email: string, otp: string, purpose: OTPRecord['purpose']): Promise<void> {
    console.log('💾 Creating OTP record:', { email, otp, purpose })
    
    // Delete existing OTPs for this email and purpose
    await this.otps.where('email').equals(email).and(record => record.purpose === purpose).delete()
    
    const otpRecord: OTPRecord = {
      email,
      otp,
      purpose,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      attempts: 0,
      createdAt: new Date()
    }
    
    const id = await this.otps.add(otpRecord)
    console.log('✅ OTP record created successfully with ID:', id)
    
    // Verify the record was actually saved
    const saved = await this.otps.get(id)
    if (saved) {
      console.log('✅ OTP record verified in database:', { 
        id: saved.id, 
        email: saved.email, 
        otp: saved.otp,
        expiresAt: saved.expiresAt 
      })
    } else {
      console.error('❌ OTP record NOT found in database after creation!')
    }
  }

  async verifyOTP(email: string, otp: string, purpose: OTPRecord['purpose']): Promise<boolean> {
    console.log('🔐 Verifying OTP:', { email, otp, purpose })
    
    // Debug: Show all OTP records
    const allOTPs = await this.otps.toArray()
    console.log('📋 All OTP records in database:', allOTPs)
    
    // Try to find matching records
    const emailMatches = await this.otps.where('email').equals(email).toArray()
    console.log('📧 OTP records for email:', emailMatches)
    
    const record = await this.otps
      .where('email')
      .equals(email)
      .and(r => r.purpose === purpose && r.expiresAt > new Date())
      .first()

    if (!record) {
      console.log('❌ No OTP record found or OTP expired')
      const purposeMatches = await this.otps.where('email').equals(email).and(r => r.purpose === purpose).toArray()
      console.log('🔍 Records with matching email and purpose (ignoring expiry):', purposeMatches)
      return false
    }

    console.log('📝 OTP Record found:', { 
      storedOTP: record.otp, 
      providedOTP: otp, 
      attempts: record.attempts, 
      expiresAt: record.expiresAt 
    })

    // Check if max attempts exceeded BEFORE incrementing
    if (record.attempts >= 3) {
      console.log('❌ Too many attempts (3+), deleting OTP')
      // Too many attempts, delete the OTP
      await this.otps.delete(record.id!)
      return false
    }

    // Check if OTP matches
    if (record.otp === otp) {
      console.log('✅ OTP is correct! Verification successful.')
      // OTP is correct, delete it
      await this.otps.delete(record.id!)
      return true
    }

    console.log('❌ OTP is incorrect, incrementing attempts')
    // OTP is incorrect, increment attempts
    await this.otps.update(record.id!, { attempts: record.attempts + 1 })

    return false
  }

  async cleanupExpiredOTPs(): Promise<void> {
    await this.otps.where('expiresAt').below(new Date()).delete()
  }

  // Session methods
  async createSession(userId: number, token: string): Promise<void> {
    // Clean up existing sessions for this user
    await this.sessions.where('userId').equals(userId).delete()
    
    const session: Session = {
      userId,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      createdAt: new Date()
    }
    
    await this.sessions.add(session)
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    return await this.sessions
      .where('token')
      .equals(token)
      .and(session => session.expiresAt > new Date())
      .first()
  }

  async deleteSession(token: string): Promise<void> {
    await this.sessions.where('token').equals(token).delete()
  }

  async cleanupExpiredSessions(): Promise<void> {
    await this.sessions.where('expiresAt').below(new Date()).delete()
  }
}

// Singleton instance
export const db = new HealthVaultDB()
