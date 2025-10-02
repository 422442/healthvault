"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function BookAppointmentRedirect() {
  useEffect(() => {
    redirect("/patient/find-doctor")
  }, [])

  return null
}
