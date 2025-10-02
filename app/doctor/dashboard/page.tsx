"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, Users, Search, Clock, Activity, FileText, Phone } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface TodayAppointment {
  id: string
  patient: string
  time: string
  type: string
  phone: string
}

export default function DoctorDashboard() {
  const { user, isLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "doctor")) {
      redirect("/")
    }
  }, [user, isLoading])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "doctor") {
    return null
  }

  // Mock data for demonstration
  const todayAppointments: TodayAppointment[] = [
    {
      id: "1",
      patient: "Priya Sharma",
      time: "9:00 AM",
      type: "Consultation",
      phone: "9876543210",
    },
    {
      id: "2",
      patient: "Raj Kumar",
      time: "10:30 AM",
      type: "Follow-up",
      phone: "9876543211",
    },
    {
      id: "3",
      patient: "Anita Patel",
      time: "2:00 PM",
      type: "Check-up",
      phone: "9876543212",
    },
    {
      id: "4",
      patient: "Vikram Singh",
      time: "3:30 PM",
      type: "Consultation",
      phone: "9876543213",
    },
  ]

  const stats = {
    totalPatients: 156,
    appointmentsThisWeek: 24,
    todayAppointments: todayAppointments.length,
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance">Welcome, {user.profile?.fullName || "Doctor"}!</h1>
            <p className="text-muted-foreground mt-2">Here's your practice overview for today</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/doctor/dashboard">
                      <Activity className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/doctor/schedule">
                      <Calendar className="mr-2 h-4 w-4" />
                      My Schedule
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/doctor/patients">
                      <Users className="mr-2 h-4 w-4" />
                      Patient Records
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Patients</p>
                        <p className="text-2xl font-bold">{stats.totalPatients}</p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">This Week</p>
                        <p className="text-2xl font-bold">{stats.appointmentsThisWeek}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Lookup */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Patient Lookup
                  </CardTitle>
                  <CardDescription>Search for patients by phone number or name</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      placeholder="Enter patient name or phone number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Today's Appointments
                  </CardTitle>
                  <CardDescription>{todayAppointments.length} appointments scheduled for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">{appointment.patient}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span>{appointment.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{appointment.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Records
                          </Button>
                          <Button size="sm">Start Consultation</Button>
                        </div>
                      </div>
                    ))}

                    {todayAppointments.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No appointments today</h3>
                        <p className="text-muted-foreground">Enjoy your free day!</p>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/doctor/schedule">View Full Schedule</Link>
                  </Button>
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
