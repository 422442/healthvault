"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Heart, User, LogOut, Settings, Menu, X, ChevronDown, Calendar, FileText } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const { user, logout } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Debug user state
  useEffect(() => {
    console.log('Navbar - Current user state:', user)
  }, [user])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  const navigationItems = [
    { href: "/#features", label: "Features" },
    { href: "/#about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b shadow-lg' 
          : 'bg-background/60 backdrop-blur-sm border-b border-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Heart className="h-5 w-5 text-white group-hover:animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  HealthVault
                </span>
                <Badge variant="secondary" className="ml-2 text-xs">v2.0</Badge>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="relative text-muted-foreground hover:text-foreground transition-all duration-300 group"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Direct Dashboard Link for troubleshooting */}
                  <Link 
                    href={user.role === "patient" ? "/patient/dashboard" : "/doctor/dashboard"}
                    className="hidden md:flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1 rounded-lg hover:bg-primary/20"
                  >
                    Dashboard →
                  </Link>
                  
                  {/* Dashboard Link */}

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="flex items-center space-x-2 hover:bg-muted/50 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        type="button"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="hidden lg:block text-left">
                          <div className="text-sm font-medium">
                            Welcome, {(user.profile as any)?.fullName?.split(" ")[0] || "User"} 👋
                          </div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {user.role}
                          </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 shadow-xl border-2" sideOffset={5}>
                      <div className="px-3 py-2 border-b">
                        <p className="text-sm font-medium">{(user.profile as any)?.fullName || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <Badge variant="outline" className="mt-1 text-xs capitalize">
                          {user.role} Account
                        </Badge>
                      </div>
                      
                      <DropdownMenuItem asChild>
                        <Link href={user.role === "patient" ? "/patient/dashboard" : "/doctor/dashboard"} className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      
                      {user.role === "patient" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/patient/appointments" className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              My Appointments
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/patient/records" className="flex items-center">
                              <FileText className="mr-2 h-4 w-4" />
                              Medical Records
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Profile Settings
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        onClick={logout}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Login
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-muted/50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fade-in">
              <div className="space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {!user && (
                  <div className="px-4 pt-2">
                    <Button 
                      onClick={() => {
                        setShowLoginModal(true)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  )
}
