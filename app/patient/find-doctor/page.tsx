"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AdvancedSearch } from "@/components/advanced-search"
import { DoctorCardSkeleton, SearchResultsSkeleton } from "@/components/loading-skeletons"
import { Search, ArrowLeft, MapPin, Star, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  location: string
  image: string
  availableSlots: string[]
  consultationFee: number
}

export default function FindDoctor() {
  const { user, isLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

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

  // Mock doctors data
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: 15,
      rating: 4.8,
      location: "Heart Care Clinic, Mumbai",
      image: "/female-doctor.png",
      availableSlots: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
      consultationFee: 800,
    },
    {
      id: "2",
      name: "Dr. Raj Patel",
      specialty: "General Physician",
      experience: 12,
      rating: 4.6,
      location: "City Hospital, Mumbai",
      image: "/male-doctor.png",
      availableSlots: ["10:00 AM", "11:30 AM", "4:00 PM", "5:30 PM"],
      consultationFee: 500,
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      experience: 8,
      rating: 4.7,
      location: "Skin Care Center, Mumbai",
      image: "/female-dermatologist.png",
      availableSlots: ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"],
      consultationFee: 700,
    },
    {
      id: "4",
      name: "Dr. Amit Kumar",
      specialty: "Orthopedic",
      experience: 20,
      rating: 4.9,
      location: "Bone & Joint Clinic, Mumbai",
      image: "/male-orthopedic-doctor.png",
      availableSlots: ["8:00 AM", "9:30 AM", "1:00 PM", "2:30 PM"],
      consultationFee: 900,
    },
    {
      id: "5",
      name: "Dr. Meera Joshi",
      specialty: "Pediatrician",
      experience: 10,
      rating: 4.5,
      location: "Children's Hospital, Mumbai",
      image: "/female-pediatrician.png",
      availableSlots: ["10:00 AM", "11:30 AM", "3:00 PM", "4:30 PM"],
      consultationFee: 600,
    },
  ]

  const specialties = [
    "All Specialties",
    "Cardiologist",
    "General Physician",
    "Dermatologist",
    "Orthopedic",
    "Pediatrician",
  ]
  const locations = ["All Locations", "Mumbai", "Delhi", "Bangalore", "Chennai"]

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty =
      !selectedSpecialty || selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty
    const matchesLocation =
      !selectedLocation || selectedLocation === "All Locations" || doctor.location.includes(selectedLocation)

    return matchesSearch && matchesSpecialty && matchesLocation
  })

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
            <div>
              <h1 className="text-3xl font-bold text-balance">Find a Doctor</h1>
              <p className="text-muted-foreground mt-2">
                Search and book appointments with verified healthcare professionals
              </p>
            </div>
          </div>

          {/* Advanced Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Find Your Perfect Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedSearch 
                onSearch={(filters) => {
                  console.log('Search with filters:', filters)
                  // Handle search logic here
                }}
                onFiltersChange={(filters) => {
                  console.log('Filters changed:', filters)
                  // Handle filter changes here
                }}
              />
            </CardContent>
          </Card>

          {/* Doctors List */}
          <div className="space-y-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Doctor Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            className="w-20 h-20 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                            <p className="text-primary font-medium mb-2">{doctor.specialty}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{doctor.experience} years experience</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{doctor.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Consultation Fee:</span>
                          <Badge variant="secondary">₹{doctor.consultationFee}</Badge>
                        </div>
                      </div>

                      {/* Available Slots */}
                      <div className="lg:w-80">
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            Available Today
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {doctor.availableSlots.map((slot) => (
                              <Button key={slot} variant="outline" size="sm" className="text-xs bg-transparent">
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full" asChild>
                            <Link href={`/patient/book-appointment/${doctor.id}`}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Book Appointment
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or browse all available doctors.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
