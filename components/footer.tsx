import Link from "next/link"
import { Heart, Shield, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-t from-muted/80 to-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  HealthVault
                </span>
                <Badge variant="secondary" className="ml-2 text-xs">v2.0</Badge>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Secure, accessible, and user-friendly healthcare management platform. 
              Your health data, protected by advanced encryption and controlled by you.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/patient/find-doctor" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link href="/patient/appointments" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@healthvault.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Health St, Medical City</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {currentYear} HealthVault. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Built with ❤️ for better healthcare</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                🔒 SSL Secured
              </Badge>
              <Badge variant="outline" className="text-xs">
                ⚡ 99.9% Uptime
              </Badge>
              <Badge variant="outline" className="text-xs">
                🏥 HIPAA Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
