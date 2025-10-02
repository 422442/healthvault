"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
    this.setState({ error, errorInfo })
    
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === "production") {
      // Add error reporting service here
      console.error("Production error:", { error, errorInfo })
    }
  }

  handleRefresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  handleGoHome = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-lg w-full">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-xl">Oops! Something went wrong</CardTitle>
              <CardDescription>
                We&apos;re sorry for the inconvenience. An unexpected error occurred while loading this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={this.handleRefresh} className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh Page
                </Button>
                <Button variant="outline" onClick={this.handleGoHome} className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </div>
              
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Show Error Details (Development Mode)
                  </summary>
                  <div className="mt-3 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Error Message:</h4>
                    <p className="text-xs text-destructive mb-3">{this.state.error.message}</p>
                    
                    <h4 className="font-semibold text-sm mb-2">Stack Trace:</h4>
                    <pre className="text-xs bg-background p-2 rounded overflow-auto max-h-40 text-muted-foreground">
                      {this.state.error.stack}
                    </pre>
                    
                    {this.state.errorInfo && (
                      <>
                        <h4 className="font-semibold text-sm mb-2 mt-3">Component Stack:</h4>
                        <pre className="text-xs bg-background p-2 rounded overflow-auto max-h-40 text-muted-foreground">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </div>
                </details>
              )}
              
              <div className="text-xs text-muted-foreground mt-4">
                If this problem persists, please contact our support team at{" "}
                <a href="mailto:support@healthvault.com" className="text-primary hover:underline">
                  support@healthvault.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
