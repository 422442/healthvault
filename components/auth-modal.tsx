"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, Shield, CheckCircle, ArrowLeft, UserPlus, LogIn, User, Stethoscope } from "lucide-react"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: "login" | "register"
}

export function AuthModal({ open, onOpenChange, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [step, setStep] = useState<"form" | "otp">("form")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(0)
  
  // Registration form state
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState<"patient" | "doctor">("patient")
  const [phone, setPhone] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [address, setAddress] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [experience, setExperience] = useState("")

  const { user: authUser, registerUser, verifyRegistration, sendOTP, verifyOTPAndLogin } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const resetForm = () => {
    setStep("form")
    setEmail("")
    setOtp("")
    setFullName("")
    setPhone("")
    setDateOfBirth("")
    setAddress("")
    setSpecialization("")
    setLicenseNumber("")
    setExperience("")
    setTimer(0)
  }

  const handleSendOTP = async (isLogin = false) => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    if (!isLogin && !fullName) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (!isLogin) {
        // Registration flow
        const profile = role === "patient" 
          ? { phone, dateOfBirth, address }
          : { phone, specialization, licenseNumber, experience: parseInt(experience) || 0 }

        const result = await registerUser(email, fullName, role, profile)
        
        if (!result.success) {
          toast({
            title: "Registration Failed",
            description: result.message,
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }
        
        toast({
          title: "Registration Successful! 📧",
          description: "Please check your email for the verification code.",
        })
      } else {
        // Login flow
        const result = await sendOTP(email)
        
        if (!result.success) {
          toast({
            title: "Login Failed",
            description: result.message,
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }
        
        toast({
          title: "OTP Sent! 📧",
          description: "Please check your email for the verification code.",
        })
      }

      setStep("otp")
      setTimer(60) // 60 second timer
      
      // Start countdown
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Check if this is registration or login
      const isRegistration = activeTab === "register"
      
      if (isRegistration) {
        // For registration, verify the OTP and auto-login
        const result = await verifyRegistration(email, otp)
        
        if (result.success) {
          // Registration verified and user is automatically logged in!
          toast({
            title: "Welcome to HealthVault! 🎉",
            description: "Registration successful! Redirecting to your dashboard...",
          })
          
          onOpenChange(false)
          resetForm()
          
          // Redirect based on actual user role from registration
          setTimeout(() => {
            const dashboardPath = role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard"
            router.push(dashboardPath)
          }, 1000)
        } else {
          toast({
            title: "Invalid OTP",
            description: result.message,
            variant: "destructive",
          })
        }
      } else {
        // For login, verify the login OTP
        const result = await verifyOTPAndLogin(email, otp)
        
        if (result.success) {
          toast({
            title: "Welcome to HealthVault! 🎉",
            description: "Authentication successful. Redirecting to your dashboard...",
          })
          
          onOpenChange(false)
          resetForm()
          
          // Wait a bit for auth context to update, then redirect based on user role
          setTimeout(() => {
            // Check auth context for user role, or fetch from database
            // Use window.location for full page reload to ensure auth state is fresh
            if (authUser) {
              const dashboardPath = authUser.role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard"
              window.location.href = dashboardPath
            } else {
              // Fallback to patient dashboard if user not yet in context
              window.location.href = "/patient/dashboard"
            }
          }, 1000)
        } else {
          toast({
            title: "Invalid OTP",
            description: result.message,
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = () => {
    if (timer === 0) {
      handleSendOTP(activeTab === "login")
    }
  }

  const handleBackToForm = () => {
    setStep("form")
    setOtp("")
    setTimer(0)
  }

  if (step === "otp") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <DialogTitle className="text-center text-2xl font-bold">
              Check Your Email
            </DialogTitle>
            
            <DialogDescription className="text-center">
              We sent a {activeTab === "register" ? "registration" : "login"} verification code to<br />
              <span className="font-medium text-foreground">{email}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify Code
                </>
              )}
            </Button>

            <div className="flex items-center justify-between text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToForm}
                className="p-0 h-auto"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResendOTP}
                disabled={timer > 0}
                className="p-0 h-auto"
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to HealthVault
          </DialogTitle>
          
          <DialogDescription className="text-center">
            Your secure health management platform
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email Address</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              onClick={() => handleSendOTP(true)}
              disabled={isLoading || !email}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Login Code
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => {
                      // Simple toggle between patient and doctor
                      setRole(role === "patient" ? "doctor" : "patient")
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {role === "patient" ? (
                        <>
                          <User className="h-4 w-4" />
                          Patient
                        </>
                      ) : (
                        <>
                          <Stethoscope className="h-4 w-4" />
                          Doctor
                        </>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">Click to switch</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email Address</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {role === "patient" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      placeholder="e.g., Cardiology"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="e.g., 5"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    placeholder="Enter medical license number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                </div>
              </div>
            )}

            <Button
              onClick={() => handleSendOTP(false)}
              disabled={isLoading || !email || !fullName}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
