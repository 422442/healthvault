"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Shield, Users, Award, Globe, CheckCircle, Star, Calendar, Linkedin, Twitter } from "lucide-react"

export default function AboutUs() {
  const stats = [
    { number: "50K+", label: "Patients Served" },
    { number: "1K+", label: "Healthcare Providers" },
    { number: "99.9%", label: "Uptime Reliability" },
    { number: "24/7", label: "Support Available" }
  ]

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "Every feature we build puts patients first, ensuring healthcare is accessible and personalized for everyone."
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "We implement the highest security standards to protect your sensitive health information with bank-level encryption."
    },
    {
      icon: Users,
      title: "Collaborative Health",
      description: "Connecting patients and providers for better health outcomes through seamless communication and data sharing."
    },
    {
      icon: Globe,
      title: "Accessible Healthcare",
      description: "Making quality healthcare available to everyone, regardless of location, financial status, or technical expertise."
    }
  ]

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "/placeholder-user.jpg",
      bio: "15+ years in digital health innovation and clinical practice",
      credentials: "MD, MPH",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "/placeholder-user.jpg", 
      bio: "Former Google engineer with expertise in healthcare technology",
      credentials: "MS Computer Science",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Raj Patel",
      role: "Head of Clinical Operations",
      image: "/placeholder-user.jpg",
      bio: "Practicing physician with digital health and telemedicine expertise",
      credentials: "MD, Digital Health Certificate",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Lisa Rodriguez",
      role: "VP of Product",
      image: "/placeholder-user.jpg",
      bio: "Product leader focused on user experience in healthcare applications",
      credentials: "MBA, UX Design Certificate",
      linkedin: "#",
      twitter: "#"
    }
  ]

  const milestones = [
    {
      year: "2020",
      title: "HealthVault Founded",
      description: "Started with a vision to make healthcare more accessible and secure"
    },
    {
      year: "2021", 
      title: "First 1,000 Users",
      description: "Reached our first milestone with positive user feedback and clinical validation"
    },
    {
      year: "2022",
      title: "HIPAA Certification",
      description: "Achieved full HIPAA compliance and security certifications"
    },
    {
      year: "2023",
      title: "Provider Network Expansion",
      description: "Partnered with over 500 healthcare providers across the country"
    },
    {
      year: "2024",
      title: "AI-Powered Features",
      description: "Launched intelligent health insights and appointment scheduling"
    },
    {
      year: "2025",
      title: "50K+ Active Users",
      description: "Serving over 50,000 patients with 99.9% platform reliability"
    }
  ]

  const awards = [
    "Best Healthcare Platform 2024 - TechHealth Awards",
    "Innovation in Digital Health - MedTech Summit 2024", 
    "Patient Choice Award - Healthcare Innovation Forum 2023",
    "Security Excellence - CyberHealth Awards 2023"
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">About HealthVault</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Revolutionizing Healthcare Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;re on a mission to make healthcare more accessible, secure, and patient-centered 
              through innovative technology and thoughtful design.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <Badge variant="outline" className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Empowering Better Health Outcomes
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                HealthVault was founded with the belief that healthcare should be simple, 
                secure, and accessible. We combine cutting-edge technology with deep 
                healthcare expertise to create solutions that truly make a difference in people&apos;s lives.
              </p>
              <div className="space-y-3 mb-6">
                {["Secure health data management", "Seamless provider communication", "Intelligent health insights"].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button size="lg">Join Our Mission</Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-24 h-24 text-primary" />
              </div>
            </div>
          </div>

          {/* Awards & Recognition */}
          <Card className="mb-20">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-8 h-8 text-yellow-500" />
                <CardTitle className="text-2xl">Awards & Recognition</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">{award}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the Experts Behind HealthVault
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our diverse team combines medical expertise, technical innovation, and design excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-lg font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                  <Badge variant="secondary" className="text-xs">
                    {member.credentials}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Milestones & Achievements
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        {milestone.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers who trust HealthVault 
            for secure, efficient healthcare management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
