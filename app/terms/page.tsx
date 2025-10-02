"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileText, Users, Shield, CreditCard, AlertTriangle, Scale, Download, ExternalLink } from "lucide-react"

export default function TermsOfService() {
  const keyTerms = [
    {
      icon: Users,
      title: "User Responsibilities",
      description: "Your obligations when using HealthVault services"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "How we protect your information and what we expect from you"
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      description: "Billing, refunds, and payment processing policies"
    },
    {
      icon: Scale,
      title: "Legal Compliance",
      description: "Regulatory requirements and dispute resolution"
    }
  ]

  const termsContent = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using HealthVault, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily download one copy of the materials on HealthVault's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title."
    },
    {
      title: "3. User Account",
      content: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for maintaining the confidentiality of your account."
    },
    {
      title: "4. Medical Disclaimer",
      content: "HealthVault is a healthcare management platform and does not provide medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with questions you may have regarding medical conditions."
    },
    {
      title: "5. Privacy Policy",
      content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy."
    },
    {
      title: "6. Payment Terms",
      content: "Some aspects of the Service may be provided for a fee. You agree to pay all applicable fees as described on the Service. All payments are non-refundable unless otherwise stated. We reserve the right to change our pricing at any time."
    },
    {
      title: "7. Prohibited Uses",
      content: "You may not use our Service for any unlawful purpose, to violate any laws, to harass or harm others, to spam, or to transmit malicious code. We reserve the right to terminate accounts that violate these terms."
    },
    {
      title: "8. Intellectual Property",
      content: "The Service and its original content, features, and functionality are and will remain the exclusive property of HealthVault and its licensors. The Service is protected by copyright, trademark, and other laws."
    },
    {
      title: "9. Termination",
      content: "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever including breach of the Terms."
    },
    {
      title: "10. Limitation of Liability",
      content: "In no event shall HealthVault, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service."
    },
    {
      title: "11. Governing Law",
      content: "These Terms shall be interpreted and governed by the laws of the jurisdiction in which HealthVault operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision will not be considered a waiver."
    },
    {
      title: "12. Changes to Terms",
      content: "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Last updated: October 2, 2025
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These Terms of Service govern your use of HealthVault and the services we provide. 
              Please read them carefully as they contain important information about your rights and obligations.
            </p>
          </div>

          {/* Key Terms Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {keyTerms.map((term, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <term.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{term.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{term.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Notice */}
          <Card className="mb-12 border-amber-200 bg-amber-50/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <CardTitle className="text-amber-800">Important Notice</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700">
                <strong>Medical Disclaimer:</strong> HealthVault is a healthcare management platform that facilitates 
                communication between patients and healthcare providers. We do not provide medical advice, diagnosis, 
                or treatment. Always consult with qualified healthcare professionals for medical decisions.
              </p>
            </CardContent>
          </Card>

          {/* Terms Content */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                Terms and Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {termsContent.map((term, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {term.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {term.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact and Legal */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Questions About These Terms?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact our legal team.
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Legal Department:</strong><br />
                    legal@healthvault.com
                  </div>
                  <div>
                    <strong>Mailing Address:</strong><br />
                    HealthVault Legal Department<br />
                    123 Health Street<br />
                    Medical City, MC 12345
                  </div>
                </div>
                <Button className="w-full mt-4">Contact Legal Team</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Privacy Policy</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Cookie Policy</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>HIPAA Notice</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agreement Section */}
          <Card className="mt-8 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Agreement</h3>
                <p className="text-muted-foreground mb-6">
                  By using HealthVault, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button>I Accept These Terms</Button>
                  <Button variant="outline">Print Terms</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
