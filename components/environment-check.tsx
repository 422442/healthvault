"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Eye, EyeOff, AlertTriangle } from "lucide-react"
import config from "@/lib/config"

export function EnvironmentCheck() {
  const [showDetails, setShowDetails] = useState(false)

  const checks = [
    {
      name: "Supabase URL",
      status: !!config.supabase.url,
      value: config.supabase.url,
      masked: config.supabase.url && config.supabase.url.length > 30 
        ? `${config.supabase.url.substring(0, 20)}...${config.supabase.url.slice(-10)}`
        : config.supabase.url || "Not set"
    },
    {
      name: "Supabase Anon Key",
      status: !!config.supabase.anonKey,
      value: config.supabase.anonKey,
      masked: config.supabase.anonKey && config.supabase.anonKey.length > 20
        ? `${config.supabase.anonKey.substring(0, 20)}...` 
        : config.supabase.anonKey || "Not set"
    },
    {
      name: "Gemini API Key",
      status: !!config.gemini.apiKey,
      value: config.gemini.apiKey,
      masked: config.gemini.apiKey && config.gemini.apiKey.length > 20
        ? `${config.gemini.apiKey.substring(0, 20)}...` 
        : config.gemini.apiKey || "Not set"
    }
  ]

  // Show in development or when there are missing variables
  if (config.isProduction && process.env.NODE_ENV === 'production' && checks.every(c => c.status)) {
    return null
  }

  return (
    <Card className="m-4 border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
          <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900">
            {config.isDevelopment ? "DEV" : "PROD"}
          </Badge>
          Environment Configuration Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {checks.map((check) => (
          <div key={check.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {check.status ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm font-medium">{check.name}</span>
            </div>
            {check.status && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <code className="bg-muted px-2 py-1 rounded">
                  {showDetails ? check.value : check.masked}
                </code>
              </div>
            )}
          </div>
        ))}
        
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            All systems: {checks.every(c => c.status) ? "✅ Ready" : "❌ Issues detected"}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="h-6 px-2 text-xs"
          >
            {showDetails ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {showDetails ? "Hide" : "Show"} Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
