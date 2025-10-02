"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Loader2 } from "lucide-react"

interface UploadRecordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadRecordModal({ open, onOpenChange }: UploadRecordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    doctor: "",
    date: "",
    notes: "",
    file: null as File | null,
  })
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.type || !formData.doctor || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Mock upload process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Record Uploaded Successfully",
      description: "Your medical record has been securely stored.",
    })

    setIsLoading(false)
    onOpenChange(false)

    // Reset form
    setFormData({
      title: "",
      type: "",
      doctor: "",
      date: "",
      notes: "",
      file: null,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Medical Record
          </DialogTitle>
          <DialogDescription>Add a new medical record to your HealthVault</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Record Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Blood Test Results"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Record Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select record type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="lab-report">Lab Report</SelectItem>
                <SelectItem value="x-ray">X-Ray</SelectItem>
                <SelectItem value="mri">MRI Scan</SelectItem>
                <SelectItem value="ct-scan">CT Scan</SelectItem>
                <SelectItem value="consultation">Consultation Notes</SelectItem>
                <SelectItem value="vaccination">Vaccination Record</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor Name *</Label>
            <Input
              id="doctor"
              placeholder="e.g., Dr. Sarah Johnson"
              value={formData.doctor}
              onChange={(e) => setFormData((prev) => ({ ...prev, doctor: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileChange}
                className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-primary file:text-primary-foreground"
              />
              {formData.file && <FileText className="h-4 w-4 text-primary" />}
            </div>
            <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about this record..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
