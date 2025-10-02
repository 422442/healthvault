"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Book, MessageCircle, Phone, Mail, ChevronRight, HelpCircle, FileText, Users, Shield, Calendar, User, Heart, Clock } from "lucide-react"

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      icon: User,
      title: "Getting Started",
      description: "Learn the basics of HealthVault",
      articles: [
        "How to create an account",
        "Setting up your profile",
        "First-time user guide",
        "Mobile app download"
      ]
    },
    {
      icon: Calendar,
      title: "Appointments",
      description: "Managing your healthcare appointments",
      articles: [
        "How to book an appointment",
        "Canceling or rescheduling",
        "Video consultation setup",
        "Appointment reminders"
      ]
    },
    {
      icon: FileText,
      title: "Medical Records",
      description: "Accessing and managing your health data",
      articles: [
        "Uploading medical documents",
        "Sharing records with doctors",
        "Privacy and security",
        "Export your data"
      ]
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Keeping your health data safe",
      articles: [
        "Two-factor authentication",
        "Data encryption explained",
        "Privacy controls",
        "Account security tips"
      ]
    }
  ]

  const popularArticles = [
    "How to book your first appointment",
    "Understanding your health dashboard",
    "Sharing medical records securely",
    "Setting up notifications",
    "Mobile app features",
    "Billing and payments"
  ]

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "To book an appointment, navigate to 'Find Doctors', select your preferred doctor, choose an available time slot, and confirm your booking. You'll receive a confirmation email with all the details."
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, we use industry-standard encryption and follow HIPAA compliance guidelines. Your data is encrypted both in transit and at rest, and we never share your personal health information without your explicit consent."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule appointments up to 24 hours before the scheduled time through your dashboard. For urgent changes, please contact our support team."
    },
    {
      question: "How do I upload medical records?",
      answer: "Go to your dashboard, click on 'Medical Records', then 'Upload Document'. You can upload PDFs, images, or other document formats. All uploads are encrypted and securely stored."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely at the time of booking or after your consultation."
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Help Center</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to your questions and get the most out of HealthVault
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {faqCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                          <span className="text-sm text-left">{article}</span>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <div className="bg-muted/30 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6">Popular Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularArticles.map((article, index) => (
                <Button key={index} variant="ghost" className="justify-between h-auto p-4">
                  <span className="text-left">{article}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Still need help?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our support team is here to assist you 24/7
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Support
            </Button>
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
