"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileText, Download, Share, Plus, Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { UploadRecordModal } from "@/components/upload-record-modal"

interface MedicalRecord {
  id: string
  type: string
  title: string
  doctor: string
  date: string
  status: "recent" | "normal"
}

export default function MedicalRecords() {
  const { user, isLoading } = useAuth()
  const [showUploadModal, setShowUploadModal] = useState(false)

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

  // Mock medical records data
  const medicalRecords: MedicalRecord[] = [
    {
      id: "1",
      type: "Prescription",
      title: "Blood Pressure Medication",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-15",
      status: "recent",
    },
    {
      id: "2",
      type: "Lab Report",
      title: "Complete Blood Count",
      doctor: "Dr. Sharma",
      date: "2024-01-10",
      status: "normal",
    },
    {
      id: "3",
      type: "X-Ray",
      title: "Chest X-Ray",
      doctor: "Dr. Patel",
      date: "2024-01-05",
      status: "normal",
    },
    {
      id: "4",
      type: "Prescription",
      title: "Antibiotic Course",
      doctor: "Dr. Kumar",
      date: "2023-12-28",
      status: "normal",
    },
  ]

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "Prescription":
        return "💊"
      case "Lab Report":
        return "🧪"
      case "X-Ray":
        return "🩻"
      default:
        return "📄"
    }
  }

  return (
    <>
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
                  <h1 className="text-3xl font-bold text-balance">My Medical Records</h1>
                  <p className="text-muted-foreground mt-2">Manage and view all your medical documents</p>
                </div>
                <Button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload New Record
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {medicalRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{getRecordIcon(record.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{record.title}</h3>
                            {record.status === "recent" && <Badge variant="secondary">Recent</Badge>}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{record.doctor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(record.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Badge variant="outline">{record.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Coming Soon
                          </Badge>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {medicalRecords.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No medical records yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload your first medical record to get started with HealthVault
                    </p>
                    <Button onClick={() => setShowUploadModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Your First Record
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <UploadRecordModal open={showUploadModal} onOpenChange={setShowUploadModal} />
    </>
  )
}
