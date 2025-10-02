"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, FileText, Plus, Clock, User, Activity, Heart, TrendingUp, Bell, Shield, Stethoscope, Pill } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function PatientDashboard() {
  const { user, isLoading } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    healthScore: 0,
    animationStep: 0
  })

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "patient")) {
      redirect("/")
    }
  }, [user, isLoading])

  // Animate dashboard on load
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setDashboardData({
          healthScore: 85,
          animationStep: 1
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "patient") {
    return null
  }

  // Enhanced mock data
  const upcomingAppointment = {
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Tomorrow",
    time: "10:30 AM",
    type: "Follow-up",
    avatar: "👩‍⚕️"
  }

  const recentActivity = [
    {
      type: "Prescription",
      doctor: "Dr. Sharma",
      date: "2 days ago",
      status: "Active",
      icon: Pill,
      color: "text-blue-500"
    },
    {
      type: "Lab Results",
      doctor: "Dr. Kim",
      date: "1 week ago",
      status: "Normal",
      icon: Activity,
      color: "text-green-500"
    },
    {
      type: "Appointment",
      doctor: "Dr. Johnson",
      date: "2 weeks ago",
      status: "Completed",
      icon: Calendar,
      color: "text-purple-500"
    }
  ]

  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", status: "Normal", trend: "stable", color: "green" },
    { label: "Heart Rate", value: "72 bpm", status: "Good", trend: "down", color: "blue" },
    { label: "Weight", value: "75 kg", status: "Stable", trend: "up", color: "orange" },
    { label: "BMI", value: "24.2", status: "Normal", trend: "stable", color: "green" }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <Navbar />

      <div className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className={`mb-8 transition-all duration-1000 ${dashboardData.animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Welcome back, {user.profile?.fullName?.split(" ")[0] || "Patient"}! 👋
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Here's your health overview for today
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Link href="/patient/find-doctor">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Find Doctor
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-2 hover:bg-muted/50 transition-all duration-300 hover:scale-105">
                  <Link href="/patient/records/upload">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Record
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Health Score Card */}
          <div className={`mb-8 transition-all duration-1000 delay-200 ${dashboardData.animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Card className="relative overflow-hidden border-2 hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Heart className="w-6 h-6 text-red-500 animate-pulse" />
                      Health Score
                    </CardTitle>
                    <CardDescription className="text-base">
                      Based on your recent checkups and vital signs
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary">{dashboardData.healthScore}</div>
                    <Badge variant="secondary" className="mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Excellent
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <Progress value={dashboardData.healthScore} className="h-3" />
                <p className="text-sm text-muted-foreground mt-3">
                  Keep up the great work! Your health metrics are looking excellent.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Grid */}
          <div className={`grid lg:grid-cols-3 gap-8 transition-all duration-1000 delay-400 ${dashboardData.animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointment */}
              <Card className="border-2 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Next Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                    <div className="text-4xl">{upcomingAppointment.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{upcomingAppointment.doctor}</h3>
                      <p className="text-muted-foreground">{upcomingAppointment.specialty}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {upcomingAppointment.date} at {upcomingAppointment.time}
                        </Badge>
                        <Badge className="text-xs">
                          {upcomingAppointment.type}
                        </Badge>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href="/patient/appointments">View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Health Metrics */}
              <Card className="border-2 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Health Metrics
                  </CardTitle>
                  <CardDescription>Your latest vital signs and measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {healthMetrics.map((metric, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">{metric.label}</span>
                          <TrendingUp className={`w-4 h-4 ${
                            metric.color === 'green' ? 'text-green-500' :
                            metric.color === 'blue' ? 'text-blue-500' :
                            metric.color === 'orange' ? 'text-orange-500' : 'text-gray-500'
                          }`} />
                        </div>
                        <div className="text-xl font-bold">{metric.value}</div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {metric.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-2 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest health updates and interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center`}>
                          <activity.icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{activity.type}</h3>
                          <p className="text-sm text-muted-foreground">by {activity.doctor}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                        <Badge variant={activity.status === "Active" ? "default" : activity.status === "Normal" ? "secondary" : "outline"}>
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <Card className="border-2 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/10" asChild>
                    <Link href="/patient/appointments/book">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/10" asChild>
                    <Link href="/patient/records">
                      <FileText className="mr-2 h-4 w-4" />
                      Medical Records
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/10" asChild>
                    <Link href="/patient/find-doctor">
                      <User className="mr-2 h-4 w-4" />
                      Find Doctor
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/10" asChild>
                    <Link href="/patient/records/upload">
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Record
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Health Tips */}
              <Card className="border-2 hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Health Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-green-800 dark:text-green-200">💧 Stay Hydrated</h4>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                        Drink at least 8 glasses of water daily for optimal health.
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200">🏃‍♂️ Exercise Regularly</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                        30 minutes of moderate activity can boost your mood and health.
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h4 className="font-medium text-purple-800 dark:text-purple-200">😴 Quality Sleep</h4>
                      <p className="text-sm text-purple-600 dark:text-purple-300 mt-1">
                        Aim for 7-9 hours of quality sleep each night.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
