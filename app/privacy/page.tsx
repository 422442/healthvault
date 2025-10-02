"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye, Database, UserCheck, FileText, Download, Clock } from "lucide-react"

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, phone number)",
        "Health information you upload or share through our platform",
        "Usage data to improve our services and user experience", 
        "Device information for security and technical support purposes"
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Provide healthcare services and facilitate doctor-patient communication",
        "Maintain and improve our platform functionality",
        "Send important notifications about your appointments and health records",
        "Comply with legal obligations and healthcare regulations"
      ]
    },
    {
      icon: Shield,
      title: "Data Security & Protection",
      content: [
        "End-to-end encryption for all health data transmission",
        "HIPAA-compliant data storage and handling procedures",
        "Regular security audits and penetration testing",
        "Multi-factor authentication and access controls"
      ]
    },
    {
      icon: Eye,
      title: "Information Sharing",
      content: [
        "We never sell your personal or health information to third parties",
        "Data is only shared with authorized healthcare providers you choose",
        "Emergency situations may require sharing with medical professionals",
        "Legal compliance may require disclosure to authorized authorities"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Privacy Rights",
      content: [
        "Access your personal information and health records at any time",
        "Request corrections to inaccurate or incomplete data",
        "Delete your account and associated data (subject to legal requirements)",
        "Export your health records in standard formats"
      ]
    },
    {
      icon: Clock,
      title: "Data Retention",
      content: [
        "Health records are retained for 7 years as required by law",
        "Account data is deleted within 30 days of account closure",
        "Usage logs are anonymized after 90 days",
        "You can request early deletion of non-essential data"
      ]
    }
  ]

  const keyPrinciples = [
    "Transparency in how we handle your data",
    "Minimal data collection - only what's necessary",
    "Your control over your health information",
    "Industry-leading security measures",
    "Regular privacy impact assessments"
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Privacy Policy</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Privacy Matters</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Last updated: October 2, 2025
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              At HealthVault, we understand that your health information is deeply personal. 
              This Privacy Policy explains how we collect, use, protect, and share your information 
              when you use our healthcare management platform.
            </p>
          </div>

          {/* Key Principles */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Our Privacy Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {keyPrinciples.map((principle, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-muted-foreground">{principle}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="grid gap-8 mb-12">
            {sections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* HIPAA Compliance */}
          <Card className="mb-12 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>HIPAA Compliance</CardTitle>
                  <p className="text-sm text-muted-foreground">Health Insurance Portability and Accountability Act</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                HealthVault is fully compliant with HIPAA regulations. We have implemented comprehensive 
                administrative, physical, and technical safeguards to protect your protected health 
                information (PHI). Our Business Associate Agreements ensure that all third-party 
                service providers also maintain HIPAA compliance.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ✓ Administrative Safeguards
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ✓ Physical Safeguards
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ✓ Technical Safeguards
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Updates */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  Policy Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of 
                  any changes by posting the new Privacy Policy on this page and updating the 
                  "Last updated" date.
                </p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Version
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Our Privacy Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Privacy Officer:</strong><br />
                    privacy@healthvault.com
                  </div>
                  <div>
                    <strong>Mailing Address:</strong><br />
                    HealthVault Privacy Office<br />
                    123 Health Street<br />
                    Medical City, MC 12345
                  </div>
                  <div>
                    <strong>Phone:</strong><br />
                    +1 (555) 123-4567
                  </div>
                </div>
                <Button className="w-full mt-4">Contact Privacy Team</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
