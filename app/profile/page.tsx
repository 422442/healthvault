"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, User, Mail, Phone, Calendar, Save, Settings, Stethoscope, Shield, Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Common fields
    email: "",
    // Profile fields (will be populated based on user type)
    fullName: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    specialization: "",
    licenseNumber: "",
    experience: 0,
  })

  // Initialize form data when user data loads
  useEffect(() => {
    if (user?.profile) {
      const profile = user.profile as any // Type assertion for mixed profile types
      setFormData({
        email: user.email,
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        dateOfBirth: profile.dateOfBirth || "",
        address: profile.address || "",
        specialization: profile.specialization || "",
        licenseNumber: profile.licenseNumber || "",
        experience: profile.experience || 0,
      })
    }
  }, [user])

  // Redirect to login if no user
  if (!user) {
    router.push("/")
    return null
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    try {
      // Prepare profile updates based on user role
      const profileUpdates = user.role === "patient" 
        ? {
            profile: {
              fullName: formData.fullName,
              phone: formData.phone,
              dateOfBirth: formData.dateOfBirth,
              address: formData.address,
            }
          }
        : {
            profile: {
              fullName: formData.fullName,
              phone: formData.phone,
              specialization: formData.specialization,
              licenseNumber: formData.licenseNumber,
              experience: formData.experience,
            }
          }

      const result = await updateProfile(profileUpdates)
      
      if (result.success) {
        toast({
          title: "Profile Updated! 🎉",
          description: "Your profile has been successfully updated.",
        })
        setIsEditing(false)
      } else {
        toast({
          title: "Update Failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card className="shadow-lg border-2">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{(user.profile as any)?.fullName || "User"}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {user.role} Account
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h3>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      disabled={!isEditing}
                      className={isEditing ? "border-2 border-primary/20" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className={isEditing ? "border-2 border-primary/20" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className={isEditing ? "border-2 border-primary/20" : ""}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Account Details
                </h3>
                
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Account Type</span>
                    <Badge variant="secondary" className="capitalize">
                      {user.role}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">User ID</span>
                    <code className="text-xs bg-background px-2 py-1 rounded">
                      {user.id}
                    </code>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        email: user?.email || "",
                        fullName: (user?.profile as any)?.fullName || "",
                        phone: (user?.profile as any)?.phone || "",
                        dateOfBirth: (user?.profile as any)?.dateOfBirth || "",
                        address: (user?.profile as any)?.address || "",
                        specialization: (user?.profile as any)?.specialization || "",
                        licenseNumber: (user?.profile as any)?.licenseNumber || "",
                        experience: (user?.profile as any)?.experience || 0,
                      })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push(user.role === "patient" ? "/patient/dashboard" : "/doctor/dashboard")}
              >
                <User className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
              
              {user.role === "patient" && (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/patient/appointments")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    View Appointments
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push("/patient/records")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Medical Records
                  </Button>
                </>
              )}
              
              <Separator />
              
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  logout()
                  router.push("/")
                }}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
