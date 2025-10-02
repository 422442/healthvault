"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Bot, User, Loader2, Minimize2, Maximize2, X, Sparkles, ChevronDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isTyping?: boolean
}

export function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your HealthVault Assistant powered by AI. I can help you with:\n\n• Navigating platform features\n• Booking appointments\n• Understanding health information\n• Managing your records\n\nHow can I assist you today? 😊",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Check if user has scrolled up
  const handleScroll = (e: any) => {
    const scrollContainer = e.target
    const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 10
    setShowScrollButton(!isAtBottom && messages.length > 3)
  }

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' })
    }
  }

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isLoading, isTyping])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen, isMinimized])

  // Simulate typing effect
  const simulateTyping = (text: string): Promise<string> => {
    return new Promise((resolve) => {
      setIsTyping(true)
      const typingDelay = Math.min(text.length * 20, 2000) // Max 2 seconds
      setTimeout(() => {
        setIsTyping(false)
        resolve(text)
      }, typingDelay)
    })
  }

  // Function to call Gemini API
  const getBotResponse = async (prompt: string): Promise<string> => {
    // Note: In a real application, you would store the API key securely on the server
    // For demo purposes, we'll simulate the API call
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "demo-key"

    if (apiKey === "demo-key") {
      // Mock response for demo with enhanced responses
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const healthKeywords = ['pain', 'symptoms', 'medicine', 'doctor', 'appointment', 'health', 'medical']
      const hasHealthKeyword = healthKeywords.some(keyword => 
        prompt.toLowerCase().includes(keyword)
      )

      if (hasHealthKeyword) {
        const responses = [
          "I understand you're asking about health-related concerns. While I can provide general information, it's important to consult with our verified doctors for personalized medical advice. Would you like me to help you book an appointment? 🩺",
          "For specific medical symptoms or concerns, I recommend scheduling a consultation with one of our healthcare professionals. They can provide proper diagnosis and treatment recommendations. Should I help you find a suitable doctor? 👨‍⚕️",
          "Your health is important! While I can guide you through HealthVault features, for medical advice please consult with our qualified doctors. I can help you book an appointment right away. 💊",
          "That's a great health question! Our certified doctors are best equipped to provide accurate medical guidance. Let me help you connect with the right specialist for your needs. 🏥"
        ]
        return responses[Math.floor(Math.random() * responses.length)]
      }

      const generalResponses = [
        "I'm here to help you navigate HealthVault! I can assist with booking appointments, managing your medical records, or explaining our security features. What would you like to know more about? ✨",
        "Great question! I can help you with various HealthVault features like appointment scheduling, record management, or connecting with doctors. How can I make your healthcare journey easier? 🌟",
        "I'm your personal HealthVault assistant! Whether you need help with appointments, records, or understanding our platform, I'm here to guide you. What can I help with today? 💫",
        "Welcome to HealthVault! I can help you explore our features, book appointments, or answer questions about using the platform. What would you like to discover? 🚀"
      ]

      return generalResponses[Math.floor(Math.random() * generalResponses.length)]
    }

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful and friendly assistant for the HealthVault healthcare platform. You help users with:
- Navigating the platform features
- Understanding how to book appointments
- Managing medical records
- General health information and wellness tips
- Explaining HealthVault's security and privacy features

Personality: Be warm, professional, empathetic, and use appropriate emojis to make conversations engaging.

Important guidelines:
- Always remind users that you cannot provide medical diagnosis or replace professional medical advice
- For specific medical concerns, recommend they consult with doctors through the platform
- Be helpful, professional, and empathetic
- Keep responses concise and actionable
- Use emojis appropriately to make conversations more engaging

User question: ${prompt}`,
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
      return text || "Sorry, I couldn't process that. Please try again. 😅"
    } catch (error) {
      console.error("Error fetching from Gemini API:", error)
      return "There was an error connecting to the assistant. Please try again later. 🔧"
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const botResponse = await getBotResponse(userMessage.content)
      const typedResponse = await simulateTyping(botResponse)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: typedResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from assistant. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    "Book an appointment",
    "View my records",
    "Find a doctor",
    "How does HealthVault work?"
  ]

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="group h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-primary to-secondary border-0 relative overflow-hidden"
          size="icon"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
          <MessageCircle className="h-7 w-7 text-white relative z-10 group-hover:scale-110 transition-transform" />
        </Button>
      </div>

      {/* Chat Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className={`transition-all duration-300 ${isMinimized ? 'sm:max-w-sm h-20' : 'sm:max-w-lg h-[600px]'} flex flex-col p-0 overflow-hidden max-h-[90vh]`}
          showCloseButton={false}
        >
          {/* Header */}
          <DialogHeader className="p-4 pb-3 border-b bg-gradient-to-r from-primary/10 to-secondary/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold">HealthVault Assistant</div>
                  <div className="text-xs text-muted-foreground">
                    {isTyping ? "Typing..." : "Online • AI Powered"}
                  </div>
                </div>
              </DialogTitle>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0 hover:bg-muted/50"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-muted/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
                <div 
                  ref={scrollAreaRef}
                  className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
                  onScroll={handleScroll}
                >
                  <div className="space-y-4 pb-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "bot" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}

                        <div
                          className={`max-w-[75%] rounded-2xl px-3 py-2 shadow-sm ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-primary to-secondary text-white"
                              : "bg-muted/70 text-foreground border"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>

                        {message.sender === "user" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center flex-shrink-0 shadow-sm">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}

                    {(isLoading || isTyping) && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-muted/70 text-foreground rounded-2xl px-3 py-2 border shadow-sm">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-sm">{isTyping ? "Assistant is typing..." : "Thinking..."}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Scroll to Bottom Button */}
                {showScrollButton && (
                  <Button
                    onClick={scrollToBottom}
                    className="absolute bottom-20 right-4 h-8 w-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary/90 hover:bg-primary z-10"
                    size="icon"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="px-4 py-2 border-t border-border/50 flex-shrink-0">
                  <div className="text-xs text-muted-foreground mb-2">Quick actions:</div>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-white transition-colors duration-200 text-xs py-1"
                        onClick={() => setInputMessage(action)}
                      >
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 pt-3 border-t bg-muted/10 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    placeholder="Ask me anything about HealthVault..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="flex-1 rounded-xl border-2 border-border/50 focus:border-primary transition-colors duration-200"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputMessage.trim() || isLoading} 
                    size="icon"
                    className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-200 hover:scale-105 flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI assistant • For medical advice, consult our doctors
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
