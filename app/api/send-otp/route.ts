import { NextRequest, NextResponse } from 'next/server'

// This API route is deprecated in favor of client-side EmailJS integration
// See lib/email-service.ts for the new implementation

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This API endpoint is deprecated. The application now uses client-side EmailJS for sending emails.',
      message: 'Please update your code to use the client-side email service instead.'
    },
    { status: 410 } // 410 Gone - indicates this endpoint is no longer available
  )
}
