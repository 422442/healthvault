"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, CalendarIcon, Clock, MapPin, Star, User, CreditCard } from "lucide-react"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  location: string
  image: string
  consultationFee: number
  availableSlots: { [key: string]: string[] }
}

export default function BookAppointment() {
  const { user, isLoading } = useAuth()
  const params = useParams()
  const doctorId = params.doctorId as string
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [notes, setNotes] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()

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

  // Mock doctor data - in real app, this would be fetched based on doctorId
  const doctor: Doctor = {
    id: doctorId,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: 15,
    rating: 4.8,
    location: "Heart Care Clinic, Mumbai",
    image: "/female-doctor.png",
    consultationFee: 800,
    availableSlots: {
      "2024-01-20": ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
      "2024-01-21": ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"],
      "2024-01-22": ["10:00 AM", "11:30 AM", "3:00 PM", "4:30 PM"],
      "2024-01-23": ["9:00 AM", "10:00 AM", "1:30 PM", "3:00 PM"],
    },
  }

  const selectedDateString = selectedDate?.toISOString().split("T")[0]
  const availableSlots = selectedDateString ? doctor.availableSlots[selectedDateString] || [] : []

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your appointment.",
        variant: "destructive",
      })
      return
    }

    setIsBooking(true)

    // Mock booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment with ${doctor.name} is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
    })

    setIsBooking(false)

    // Redirect to appointments page
    setTimeout(() => {
      window.location.href = "/patient/appointments"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/patient/find-doctor">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search
                </Link>
              </Button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-balance">Book Appointment</h1>
              <p className="text-muted-foreground mt-2">Schedule your consultation with {doctor.name}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Doctor Information */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Doctor Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                    <p className="text-primary font-medium mb-3">{doctor.specialty}</p>

                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{doctor.experience} years</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{doctor.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{doctor.location}</span>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span className="font-medium">Consultation Fee: ₹{doctor.consultationFee}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Select Date
                  </CardTitle>
                  <CardDescription>Choose your preferred appointment date</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const dateString = date.toISOString().split("T")[0]
                      return date < new Date() || !doctor.availableSlots[dateString]
                    }}
                    className="rounded-md border w-fit mx-auto"
                  />
                </CardContent>
              </Card>

              {/* Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Select Time
                  </CardTitle>
                  <CardDescription>
                    {selectedDate
                      ? `Available slots for ${selectedDate.toLocaleDateString()}`
                      : "Please select a date first"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? "default" : "outline"}
                          onClick={() => setSelectedTime(slot)}
                          className="h-12"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {selectedDate
                          ? "No available slots for this date"
                          : "Select a date to view available time slots"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                  <CardDescription>Any specific concerns or symptoms you'd like to mention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Describe your symptoms or reason for consultation..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Doctor:</span>
                      <span className="font-medium">{doctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Specialty:</span>
                      <span>{doctor.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{selectedDate ? selectedDate.toLocaleDateString() : "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{selectedTime || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="text-sm">{doctor.location}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-medium">
                        <span>Consultation Fee:</span>
                        <span>₹{doctor.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleBookAppointment}
                    disabled={!selectedDate || !selectedTime || isBooking}
                    className="w-full mt-6"
                    size="lg"
                  >
                    {isBooking ? "Booking..." : "Confirm Booking"}
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
