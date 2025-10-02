import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { GeminiChatbot } from "@/components/gemini-chatbot"
import { ErrorBoundary } from "@/components/error-boundary"
import { Suspense } from "react"

// Loading component for better UX
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading HealthVault...</p>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "HealthVault - Secure Health Records & Appointments",
  description:
    "Your health records, secured and in your control. Access your medical history and book appointments seamlessly.",
  generator: "v0.app",
  icons: {
    icon: "/placeholder-logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <AuthProvider>
              {children}
              <Toaster />
              <GeminiChatbot />
            </AuthProvider>
          </Suspense>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
