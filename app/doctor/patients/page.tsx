"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, ArrowLeft, User, Phone, Calendar, FileText, Eye } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

interface Patient {
  id: string
  name: string
  phone: string
  age: number
  gender: string
  lastVisit: string
  totalVisits: number
  conditions: string[]
}

export default function DoctorPatients() {
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

  // Mock patients data
  const patients: Patient[] = [
    {
      id: "1",
      name: "Priya Sharma",
      phone: "9876543210",
      age: 34,
      gender: "Female",
      lastVisit: "2024-01-15",
      totalVisits: 8,
      conditions: ["Hypertension", "Diabetes"],
    },
    {
      id: "2",
      name: "Raj Kumar",
      phone: "9876543211",
      age: 45,
      gender: "Male",
      lastVisit: "2024-01-12",
      totalVisits: 12,
      conditions: ["High Cholesterol"],
    },
    {
      id: "3",
      name: "Anita Patel",
      phone: "9876543212",
      age: 28,
      gender: "Female",
      lastVisit: "2024-01-10",
      totalVisits: 3,
      conditions: [],
    },
    {
      id: "4",
      name: "Vikram Singh",
      phone: "9876543213",
      age: 52,
      gender: "Male",
      lastVisit: "2024-01-08",
      totalVisits: 15,
      conditions: ["Arthritis", "Hypertension"],
    },
    {
      id: "5",
      name: "Meera Joshi",
      phone: "9876543214",
      age: 38,
      gender: "Female",
      lastVisit: "2024-01-05",
      totalVisits: 6,
      conditions: ["Migraine"],
    },
  ]

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.conditions.some((condition) => condition.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
                <h1 className="text-3xl font-bold text-balance">Patient Records</h1>
                <p className="text-muted-foreground mt-2">Search and manage your patient records</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Search by name, phone number, or condition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Patients List */}
          <div className="space-y-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {patient.age} years • {patient.gender}
                            </p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.totalVisits} total visits</span>
                          </div>
                        </div>

                        {patient.conditions.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-muted-foreground mb-2">Conditions:</p>
                            <div className="flex flex-wrap gap-2">
                              {patient.conditions.map((condition) => (
                                <Badge key={condition} variant="secondary">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Records
                        </Button>
                        <Button size="sm">Schedule Appointment</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQuery ? "No patients found" : "No patients yet"}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try adjusting your search terms or check the spelling."
                      : "Patient records will appear here as you start seeing patients."}
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
