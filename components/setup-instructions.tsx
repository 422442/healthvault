"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ExternalLink, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import config from "@/lib/config"

export function SetupInstructions() {
  const { toast } = useToast()
  
  const missingVars = [
    { name: 'NEXT_PUBLIC_SUPABASE_URL', present: !!config.supabase.url },
    { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', present: !!config.supabase.anonKey },
    { name: 'NEXT_PUBLIC_GEMINI_API_KEY', present: !!config.gemini.apiKey },
  ].filter(v => !v.present)

  // Only show if there are missing variables
  if (missingVars.length === 0) {
    return null
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Environment variable name copied!",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
            <AlertTriangle className="h-6 w-6" />
            Setup Required
            <Badge variant="outline" className="bg-orange-100 dark:bg-orange-900">
              Environment Variables Missing
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-orange-700 dark:text-orange-300">
            To use HealthVault, you need to configure the following environment variables:
          </p>

          <div className="space-y-3">
            {missingVars.map((envVar) => (
              <div key={envVar.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <code className="text-sm font-mono text-red-600 dark:text-red-400">
                  {envVar.name}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(envVar.name)}
                  className="h-6 px-2"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Quick Setup Instructions:</h4>
            <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
              <li>Get your Supabase URL and API key from your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">Supabase dashboard</a></li>
              <li>Get your Google Gemini API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
              <li>Add these variables to your <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">.env.local</code> file</li>
              <li>Restart your development server</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Supabase Dashboard
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open('https://ai.google.dev/', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Google AI Studio
            </Button>
          </div>

          <div className="text-xs text-muted-foreground border-t pt-3">
            <p><strong>For Vercel deployment:</strong> Set these variables in your Vercel project settings under Environment Variables.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
