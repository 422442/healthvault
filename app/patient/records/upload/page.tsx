"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function UploadRecordRedirect() {
  useEffect(() => {
    redirect("/patient/records")
  }, [])

  return null
}
