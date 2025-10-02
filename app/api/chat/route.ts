import { type NextRequest, NextResponse } from "next/server"
import { getBotResponse } from "@/lib/gemini-api"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await getBotResponse(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 })
  }
}
