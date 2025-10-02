"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, User, Phone, FileText } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface ScheduleAppointment {
  id: string
  patient: string
  phone: string
  date: string
  time: string
  type: string
  status: "confirmed" | "pending" | "completed"
  notes?: string
}

export default function DoctorSchedule() {
  const { user, isLoading } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

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

  // Mock schedule data
  const appointments: ScheduleAppointment[] = [
    {
      id: "1",
      patient: "Priya Sharma",
      phone: "9876543210",
      date: "2024-01-20",
      time: "9:00 AM",
      type: "Consultation",
      status: "confirmed",
      notes: "Follow-up for blood pressure medication",
    },
    {
      id: "2",
      patient: "Raj Kumar",
      phone: "9876543211",
      date: "2024-01-20",
      time: "10:30 AM",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: "3",
      patient: "Anita Patel",
      phone: "9876543212",
      date: "2024-01-20",
      time: "2:00 PM",
      type: "Check-up",
      status: "pending",
    },
    {
      id: "4",
      patient: "Vikram Singh",
      phone: "9876543213",
      date: "2024-01-21",
      time: "9:30 AM",
      type: "Consultation",
      status: "confirmed",
    },
    {
      id: "5",
      patient: "Meera Joshi",
      phone: "9876543214",
      date: "2024-01-21",
      time: "11:00 AM",
      type: "Follow-up",
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "default"
    }
  }

  // Get unique dates for the date selector
  const availableDates = [...new Set(appointments.map((apt) => apt.date))].sort()

  // Filter appointments by selected date
  const filteredAppointments = appointments.filter((apt) => apt.date === selectedDate)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/doctor/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-balance">My Schedule</h1>
                <p className="text-muted-foreground mt-2">Manage your appointments and patient consultations</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Date Selector */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {availableDates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedDate(date)}
                    >
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Schedule View */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Appointments for{" "}
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAppointments
                        .sort((a, b) => {
                          const timeA = new Date(`2000-01-01 ${a.time}`).getTime()
                          const timeB = new Date(`2000-01-01 ${b.time}`).getTime()
                          return timeA - timeB
                        })
                        .map((appointment) => (
                          <Card key={appointment.id} className="border-l-4 border-l-primary">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                                    <Badge variant={getStatusColor(appointment.status)}>
                                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{appointment.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <FileText className="h-4 w-4" />
                                      <span>{appointment.type}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Phone className="h-4 w-4" />
                                      <span>{appointment.phone}</span>
                                    </div>
                                  </div>
                                  {appointment.notes && (
                                    <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                                      <strong>Notes:</strong> {appointment.notes}
                                    </p>
                                  )}
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                  <Button variant="outline" size="sm">
                                    <User className="h-4 w-4 mr-2" />
                                    View Patient
                                  </Button>
                                  {appointment.status === "confirmed" && <Button size="sm">Start Consultation</Button>}
                                  {appointment.status === "pending" && (
                                    <Button variant="secondary" size="sm">
                                      Confirm
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No appointments scheduled</h3>
                      <p className="text-muted-foreground">No appointments found for the selected date.</p>
                    </div>
                  )}
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
