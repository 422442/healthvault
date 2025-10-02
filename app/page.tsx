"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Calendar, FileText, Users, Lock, Smartphone, ChevronDown, Sparkles, CheckCircle, ArrowRight, Play } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      text: "HealthVault has completely transformed how I manage my family's health records. Everything is secure and accessible.",
      author: "Sarah M.",
      role: "Patient"
    },
    {
      text: "As a doctor, I love how easy it is to access patient history and manage appointments through HealthVault.",
      author: "Dr. Kumar",
      role: "Cardiologist"
    },
    {
      text: "The AI assistant is incredibly helpful for getting quick health guidance and booking appointments.",
      author: "Michael R.",
      role: "Patient"
    }
  ]

  const stats = [
    { value: "50,000+", label: "Active Users" },
    { value: "1,000+", label: "Doctors" },
    { value: "99.9%", label: "Uptime" },
    { value: "256-bit", label: "Encryption" }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-primary/5 py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-bounce" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 50,000+ users worldwide
            </Badge>
            
            <h1 className="text-4xl md:text-7xl font-bold text-balance mb-8 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Your Health Records, <span className="text-primary">Secured</span> and in Your Control
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-12 max-w-3xl mx-auto leading-relaxed">
              Access your medical history and book appointments seamlessly. HealthVault puts you in control of your
              healthcare journey with advanced AI assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-xl border-2 hover:bg-background hover:text-primary transition-all duration-300 group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Why Choose HealthVault?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Built with security, accessibility, and user experience at its core. Experience the future of healthcare management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your medical data is encrypted with military-grade security. You control who has access.",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: Calendar,
                title: "Smart Appointments",
                description: "AI-powered scheduling that finds the perfect time slots with your preferred doctors.",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: FileText,
                title: "Digital Records",
                description: "Store and access all your medical records digitally, anytime, anywhere with smart search.",
                gradient: "from-purple-500 to-violet-600"
              },
              {
                icon: Users,
                title: "Doctor Network",
                description: "Connect with verified healthcare professionals and get instant consultations.",
                gradient: "from-orange-500 to-red-600"
              },
              {
                icon: Lock,
                title: "Blockchain Security",
                description: "Advanced blockchain technology ensures data integrity and immutable access logs.",
                gradient: "from-teal-500 to-green-600"
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Optimized for mobile devices with offline capabilities for emergency access.",
                gradient: "from-pink-500 to-rose-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="group border-2 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Interactive Demo Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">See HealthVault in Action</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience our intuitive interface and powerful features through an interactive demo.
            </p>
            <Button size="lg" className="group">
              Try Interactive Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm border shadow-xl p-8 md:p-12">
              <div className="text-center transition-all duration-500">
                <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="font-semibold text-lg">{testimonials[currentTestimonial].author}</div>
                    <div className="text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2">
                About HealthVault
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Revolutionizing Healthcare Access
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We're building the future of healthcare management with cutting-edge technology and user-centric design.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                    For Patients
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Secure storage of all medical records with blockchain technology",
                      "AI-powered appointment booking and smart scheduling",
                      "Complete control over data sharing and access permissions",
                      "Intelligent health insights and personalized reminders",
                      "24/7 access to medical history and emergency information"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start group">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <div className="w-3 h-3 bg-secondary rounded-full mr-3"></div>
                    For Doctors
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Streamlined patient record access with smart search",
                      "Efficient appointment scheduling and calendar management",
                      "Secure patient communication with end-to-end encryption",
                      "Advanced practice management and analytics tools",
                      "Integration with existing healthcare systems"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start group">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h3>
                  <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                    Join thousands of users who trust HealthVault with their healthcare journey.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90">
                      Start Free Trial
                    </Button>
                    <Button size="lg" className="text-lg px-8 py-4 bg-white border-2 border-white text-primary hover:bg-gray-100 hover:text-primary hover:border-gray-100">
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
