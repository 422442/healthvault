"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, Clock, Plus, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

interface Appointment {
  id: string
  doctor: string
  specialty: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  location: string
}

export default function PatientAppointments() {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "patient")) {
      redirect("/")
    }
  }, [user, isLoading])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "patient") {
    return null
  }

  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-20",
      time: "10:30 AM",
      status: "upcoming",
      location: "Heart Care Clinic, Mumbai",
    },
    {
      id: "2",
      doctor: "Dr. Raj Patel",
      specialty: "General Physician",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "completed",
      location: "City Hospital, Mumbai",
    },
    {
      id: "3",
      doctor: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      date: "2024-01-25",
      time: "11:00 AM",
      status: "upcoming",
      location: "Skin Care Center, Mumbai",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default"
      case "completed":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status === "upcoming")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/patient/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-balance">My Appointments</h1>
                <p className="text-muted-foreground mt-2">Manage your upcoming and past appointments</p>
              </div>
              <Button asChild className="flex items-center gap-2">
                <Link href="/patient/find-doctor">
                  <Plus className="h-4 w-4" />
                  Book New Appointment
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
              {upcomingAppointments.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                              <Badge variant={getStatusColor(appointment.status)}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{appointment.specialty}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming appointments</h3>
                    <p className="text-muted-foreground mb-4">
                      Book your next appointment with a healthcare professional
                    </p>
                    <Button asChild>
                      <Link href="/patient/find-doctor">
                        <Plus className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Past Appointments */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Past Appointments</h2>
              {pastAppointments.length > 0 ? (
                <div className="grid gap-4">
                  {pastAppointments.map((appointment) => (
                    <Card key={appointment.id} className="opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                              <Badge variant={getStatusColor(appointment.status)}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">{appointment.specialty}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Book Again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No past appointments to display</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
