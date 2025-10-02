// Gemini API integration utility
// This file contains the actual API integration code from the original specification

export async function getBotResponse(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("Gemini API key not configured")
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful assistant for the HealthVault website. You help users with:
- Navigating the platform features
- Understanding how to book appointments  
- Managing medical records
- General health information and wellness tips
- Explaining HealthVault's security and privacy features

Important guidelines:
- Always remind users that you cannot provide medical diagnosis or replace professional medical advice
- For specific medical concerns, recommend they consult with doctors through the platform
- Be helpful, professional, and empathetic
- Keep responses concise and actionable

Question: ${prompt}`,
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    return text || "Sorry, I couldn't process that. Please try again."
  } catch (error) {
    console.error("Error fetching from Gemini API:", error)
    return "There was an error connecting to the assistant."
  }
}
