"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Check, Star, Crown, Shield, Heart, Users, 
  Zap, Clock, Phone, Mail, Video, FileText 
} from "lucide-react"

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const patientPlans = [
    {
      name: "Basic",
      description: "Perfect for individuals managing their personal health records",
      price: { monthly: 0, annual: 0 },
      badge: "Free Forever",
      badgeVariant: "secondary" as const,
      icon: Heart,
      features: [
        "Personal health dashboard",
        "Basic appointment scheduling", 
        "Document storage (5GB)",
        "Secure messaging with providers",
        "Mobile app access",
        "Email support"
      ],
      limitations: [
        "Limited to 3 providers",
        "Basic notifications",
        "Standard support"
      ]
    },
    {
      name: "Premium",
      description: "Advanced features for comprehensive health management",
      price: { monthly: 9.99, annual: 99.99 },
      badge: "Most Popular",
      badgeVariant: "default" as const,
      icon: Star,
      features: [
        "Everything in Basic",
        "Unlimited provider connections",
        "Advanced health analytics",
        "Family health management (up to 6 members)",
        "Document storage (50GB)",
        "Priority scheduling",
        "Telemedicine integration",
        "Custom health reminders",
        "Export health data",
        "Priority support"
      ]
    },
    {
      name: "Family",
      description: "Comprehensive health management for the entire family",
      price: { monthly: 19.99, annual: 199.99 },
      badge: "Best Value",
      badgeVariant: "outline" as const,
      icon: Users,
      features: [
        "Everything in Premium",
        "Unlimited family members",
        "Shared family calendar",
        "Document storage (200GB)",
        "Family health insights",
        "Emergency contact system",
        "Pediatric care tools",
        "Multi-user permissions",
        "Dedicated family coordinator",
        "24/7 phone support"
      ]
    }
  ]

  const providerPlans = [
    {
      name: "Solo Practice",
      description: "For individual healthcare providers and small clinics",
      price: { monthly: 49.99, annual: 499.99 },
      badge: "Getting Started",
      badgeVariant: "secondary" as const,
      icon: Users,
      features: [
        "Up to 100 active patients",
        "Basic patient management",
        "Appointment scheduling",
        "Secure messaging",
        "Electronic health records",
        "Basic reporting",
        "Mobile access",
        "Email support"
      ]
    },
    {
      name: "Professional",
      description: "For growing practices with advanced needs",
      price: { monthly: 99.99, annual: 999.99 },
      badge: "Recommended",
      badgeVariant: "default" as const,
      icon: Crown,
      features: [
        "Up to 500 active patients",
        "Advanced patient management",
        "Automated appointment reminders",
        "Telemedicine platform",
        "Custom forms and workflows",
        "Advanced analytics",
        "Integration with practice management",
        "API access",
        "Priority support"
      ]
    },
    {
      name: "Enterprise",
      description: "For large healthcare organizations and hospital systems",
      price: { monthly: "Custom", annual: "Custom" },
      badge: "Enterprise",
      badgeVariant: "outline" as const,
      icon: Shield,
      features: [
        "Unlimited patients",
        "Multi-location support",
        "Advanced security controls",
        "Custom integrations",
        "Dedicated account manager",
        "Training and onboarding",
        "SLA guarantees",
        "24/7 phone support",
        "Custom reporting",
        "White-label options"
      ]
    }
  ]

  const addOns = [
    {
      name: "AI Health Assistant",
      description: "Intelligent health insights and recommendations",
      price: "$4.99/month",
      icon: Zap
    },
    {
      name: "Advanced Analytics",
      description: "Detailed health trends and predictive insights",
      price: "$7.99/month", 
      icon: FileText
    },
    {
      name: "Telemedicine Pro",
      description: "Enhanced video consultation features",
      price: "$9.99/month",
      icon: Video
    },
    {
      name: "Premium Support",
      description: "24/7 phone and chat support with priority handling",
      price: "$14.99/month",
      icon: Phone
    }
  ]

  const features = [
    "HIPAA Compliant Security",
    "99.9% Uptime SLA", 
    "Mobile Apps (iOS & Android)",
    "Data Export Tools",
    "Multi-language Support",
    "Regular Security Audits"
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Pricing Plans</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your Healthcare Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Flexible pricing options for individuals, families, and healthcare providers. 
              Start free and upgrade as your needs grow.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge variant="secondary" className="ml-2">Save 20%</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="patients" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12 max-w-md mx-auto">
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
              <div className="grid lg:grid-cols-3 gap-8">
                {patientPlans.map((plan, index) => (
                  <Card key={index} className={`relative hover:shadow-lg transition-all duration-300 ${plan.name === 'Premium' ? 'border-primary scale-105' : ''}`}>
                    {plan.badge && (
                      <Badge variant={plan.badgeVariant} className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        {plan.badge}
                      </Badge>
                    )}
                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="text-base">{plan.description}</CardDescription>
                      <div className="pt-4">
                        <div className="text-4xl font-bold">
                          {typeof plan.price.monthly === 'number' ? (
                            <>
                              ${isAnnual ? (plan.price.annual / 12).toFixed(2) : plan.price.monthly}
                              <span className="text-lg font-normal text-muted-foreground">/month</span>
                            </>
                          ) : (
                            <span className="text-2xl">Free</span>
                          )}
                        </div>
                        {isAnnual && typeof plan.price.annual === 'number' && (plan.price.annual as number) > 0 && (
                          <div className="text-sm text-muted-foreground">
                            Billed annually (${plan.price.annual}/year)
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                        {plan.limitations && plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start gap-3 opacity-60">
                            <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                            </div>
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={plan.name === 'Premium' ? 'default' : 'outline'}>
                        {plan.name === 'Basic' ? 'Get Started Free' : 'Start Free Trial'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="providers">
              <div className="grid lg:grid-cols-3 gap-8">
                {providerPlans.map((plan, index) => (
                  <Card key={index} className={`relative hover:shadow-lg transition-all duration-300 ${plan.name === 'Professional' ? 'border-primary scale-105' : ''}`}>
                    {plan.badge && (
                      <Badge variant={plan.badgeVariant} className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        {plan.badge}
                      </Badge>
                    )}
                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="text-base">{plan.description}</CardDescription>
                      <div className="pt-4">
                        <div className="text-4xl font-bold">
                          {typeof plan.price.monthly === 'number' ? (
                            <>
                              ${isAnnual ? ((plan.price.annual as number) / 12).toFixed(2) : plan.price.monthly}
                              <span className="text-lg font-normal text-muted-foreground">/month</span>
                            </>
                          ) : (
                            <span className="text-2xl">{plan.price.monthly}</span>
                          )}
                        </div>
                        {isAnnual && typeof plan.price.annual === 'number' && (
                          <div className="text-sm text-muted-foreground">
                            Billed annually (${plan.price.annual}/year)
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={plan.name === 'Professional' ? 'default' : 'outline'}>
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Add-ons & Extensions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Enhance Your Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Optional add-ons to customize your HealthVault experience with advanced features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <addon.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <CardDescription className="text-sm">{addon.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-4">{addon.price}</div>
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Included */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Included in All Plans</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every HealthVault plan includes these essential features at no extra cost.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Check className="w-5 h-5 text-green-500" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan at any time?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial available?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes, all paid plans come with a 14-day free trial. No credit card required to start.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust HealthVault for their healthcare management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
