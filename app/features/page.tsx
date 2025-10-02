"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, FileText, Shield, MessageCircle, Bell, Search, 
  Smartphone, Heart, Clock, Users, Lock, ChevronRight,
  Video, BarChart3, Bot, Share2
} from "lucide-react"

export default function Features() {
  const coreFeatures = [
    {
      icon: Calendar,
      title: "Smart Appointment Scheduling",
      description: "Book, reschedule, and manage appointments with ease. AI-powered scheduling finds the best times for you and your healthcare providers.",
      benefits: ["24/7 online booking", "Automated reminders", "Calendar integration", "Provider availability sync"]
    },
    {
      icon: FileText, 
      title: "Secure Medical Records",
      description: "Store, organize, and access your complete medical history in one secure location. Share records instantly with authorized providers.",
      benefits: ["Bank-level encryption", "Instant sharing", "Document organization", "Version control"]
    },
    {
      icon: MessageCircle,
      title: "Provider Communication",
      description: "Communicate directly with your healthcare team through secure messaging, video calls, and consultation requests.",
      benefits: ["HIPAA-compliant messaging", "Video consultations", "File sharing", "Real-time notifications"]
    },
    {
      icon: Bell,
      title: "Health Notifications",
      description: "Stay on top of your health with intelligent reminders for medications, appointments, and preventive care.",
      benefits: ["Medication reminders", "Appointment alerts", "Health milestone tracking", "Custom notifications"]
    }
  ]

  const advancedFeatures = [
    {
      icon: Bot,
      title: "AI Health Assistant",
      description: "Get instant answers to health questions and personalized recommendations based on your medical history.",
      tag: "AI-Powered"
    },
    {
      icon: BarChart3,
      title: "Health Analytics",
      description: "Visualize your health trends with interactive charts and reports that help you make informed decisions.",
      tag: "Analytics"
    },
    {
      icon: Video,
      title: "Telemedicine Integration",
      description: "Seamless video consultations with your healthcare providers from the comfort of your home.",
      tag: "Telehealth"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Access all features on-the-go with our native mobile applications for iOS and Android.",
      tag: "Mobile"
    },
    {
      icon: Share2,
      title: "Family Health Management",
      description: "Manage health records for your entire family with appropriate privacy controls and permissions.",
      tag: "Family"
    },
    {
      icon: Search,
      title: "Provider Network",
      description: "Find and connect with healthcare providers in your area with detailed profiles and patient reviews.",
      tag: "Network"
    }
  ]

  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using military-grade encryption protocols."
    },
    {
      icon: Shield,
      title: "HIPAA Compliance",
      description: "Full compliance with healthcare privacy regulations ensuring your data is protected."
    },
    {
      icon: Users,
      title: "Access Controls",
      description: "Granular permissions system allows you to control exactly who can access your information."
    },
    {
      icon: Clock,
      title: "Audit Logs",
      description: "Complete audit trail of all access to your health information for transparency and security."
    }
  ]

  const patientFeatures = [
    "Personal health dashboard",
    "Appointment booking and management", 
    "Medical record storage and sharing",
    "Prescription management",
    "Health goal tracking",
    "Provider communication",
    "Test result access",
    "Insurance integration"
  ]

  const providerFeatures = [
    "Patient management dashboard",
    "Secure patient communication",
    "Electronic health records access",
    "Appointment scheduling tools",
    "Prescription management",
    "Clinical decision support",
    "Practice analytics", 
    "Billing integration"
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Platform Features</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Everything You Need for Better Healthcare
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover powerful features designed to simplify healthcare management, 
              improve communication, and keep your health information secure.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Core Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Essential Healthcare Management Tools
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Advanced Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Next-Generation Healthcare Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge features that leverage AI, analytics, and modern technology 
              to enhance your healthcare experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary">{feature.tag}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User-Specific Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Tailored Experience</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for Patients and Providers
            </h2>
          </div>

          <Tabs defaultValue="patients" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="patients" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                For Patients
              </TabsTrigger>
              <TabsTrigger value="providers" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                For Providers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patients">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Patient-Focused Features</CardTitle>
                  <CardDescription className="text-center">
                    Empowering patients to take control of their healthcare journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {patientFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <Heart className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="providers">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Provider Tools</CardTitle>
                  <CardDescription className="text-center">
                    Professional tools designed to enhance clinical workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {providerFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                        <Users className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Security & Privacy</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Data is Safe with Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We implement industry-leading security measures to protect your sensitive health information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already transforming their healthcare experience with HealthVault.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
