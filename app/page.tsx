"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Zap, Crown, ChevronDown, Search, User, ShoppingCart, Menu, Moon, Sun } from "lucide-react"
import PayPalCheckout from "./components/paypal-checkout"

const productTiers = [
  {
    id: "basic",
    name: "Mindful Start",
    price: 29,
    description: "Begin your wellness journey with essential tools",
    icon: Shield,
    features: [
      "Daily meditation sessions",
      "Basic mood tracking",
      "Email support",
      "Sleep stories library",
      "Breathing exercises",
    ],
    popular: false,
    color: "from-[#6c7685] to-[#3b5069]",
  },
  {
    id: "pro",
    name: "Wellness Pro",
    price: 79,
    description: "Comprehensive mental health and wellness support",
    icon: Zap,
    features: [
      "Unlimited meditation library",
      "Advanced mood analytics",
      "1-on-1 coaching sessions",
      "Personalized wellness plans",
      "Premium content library",
      "Community access",
      "Progress tracking tools",
    ],
    popular: true,
    color: "from-[#6c7c92] to-[#171f36]",
  },
  {
    id: "enterprise",
    name: "Complete Care",
    price: 199,
    description: "Full-spectrum wellness with professional support",
    icon: Crown,
    features: [
      "Everything in Wellness Pro",
      "Weekly therapy sessions",
      "24/7 crisis support",
      "Family wellness plans",
      "Corporate wellness tools",
      "Custom meditation content",
      "Dedicated wellness coach",
      "Priority booking",
    ],
    popular: false,
    color: "from-[#3b5069] to-[#171f36]",
  },
]

export default function EcommercePage() {
  const [selectedTier, setSelectedTier] = useState(productTiers[1])
  const [showCheckout, setShowCheckout] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleSelectTier = (tier: (typeof productTiers)[0]) => {
    setSelectedTier(tier)
    setShowCheckout(false)
  }

  const handleProceedToCheckout = () => {
    setShowCheckout(true)
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#171f36] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button variant="outline" onClick={() => setShowCheckout(false)} className="mb-4">
              ← Back to Plans
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Purchase</h1>
            <p className="text-gray-600 dark:text-gray-300">
              You're purchasing: {selectedTier.name} - ${selectedTier.price}/month
            </p>
          </div>
          <PayPalCheckout
            amount={selectedTier.price}
            planName={selectedTier.name}
            onSuccess={() => {
              alert("Payment successful! Welcome to " + selectedTier.name)
              setShowCheckout(false)
            }}
            onError={(error) => {
              console.error("Payment error:", error)
              alert("Payment failed. Please try again.")
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#171f36] transition-colors duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#cbd8e2] to-[#bacbd8] dark:from-[#3b5069] dark:to-[#6c7685] text-center py-3 px-4">
        <p className="text-sm font-medium text-gray-800 dark:text-white">
          🎉 Start your wellness journey today. 30-day free trial available!{" "}
          <span className="underline cursor-pointer">Learn More!</span>
        </p>
      </div>

      {/* Header */}
      <header className="border-b bg-white dark:bg-[#171f36] dark:border-[#3b5069] sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 dark:hover:text-[#bacbd8]">
                <span className="font-medium text-gray-900 dark:text-white">About</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 dark:hover:text-[#bacbd8]">
                <span className="font-medium text-gray-900 dark:text-white">Helpful Information</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 dark:hover:text-[#bacbd8]">
                <span className="font-medium text-gray-900 dark:text-white">Insurance Info</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 dark:hover:text-[#bacbd8]">
                <span className="font-medium text-gray-900 dark:text-white">Get Started</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </nav>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            </div>

            {/* Center Logo */}
            <div className="flex items-center space-x-2">
              <img src="/easy-mind-logo.png" alt="EasyMind Wellness Logo" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">EasyMind</span>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:562-283-5727"
                className="hidden md:block text-[#3b5069] dark:text-[#bacbd8] hover:text-[#171f36] dark:hover:text-[#cbd8e2] font-medium text-sm"
              >
                📞 (562) 283-5727
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#3b5069]"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </Button>
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white" />
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white" />
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white" />
                <span className="absolute -top-2 -right-2 bg-[#3b5069] dark:bg-[#bacbd8] text-white dark:text-[#171f36] text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Side - Content */}
        <div className="bg-gradient-to-br from-[#6c7c92] to-[#3b5069] dark:from-[#171f36] dark:to-[#3b5069] flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Transform your mental wellness journey!
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              With personalized meditation, therapy sessions, and wellness tools designed for your unique needs. Start
              your journey with our comprehensive wellness platform.
            </p>
            <Button
              size="lg"
              className="bg-[#cbd8e2] dark:bg-[#bacbd8] text-[#171f36] hover:bg-[#bacbd8] dark:hover:bg-[#cbd8e2] font-semibold px-8 py-4 rounded-full text-lg"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              START YOUR JOURNEY
            </Button>
            <p className="text-sm text-white/80 mt-4 italic">30-day money-back guarantee. Cancel anytime.</p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="bg-gradient-to-br from-[#cbd8e2] to-[#bacbd8] dark:from-[#3b5069] dark:to-[#6c7685] flex items-center justify-center p-8">
          <div className="max-w-md">
            <img
              src="/easy-mind-logo.png"
              alt="EasyMind Wellness Logo"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-[#cbd8e2] dark:bg-[#3b5069] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Wellness Plan</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find the perfect plan for your mental health journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {productTiers &&
              productTiers.map((tier) => {
                const IconComponent = tier.icon
                return (
                  <Card
                    key={tier.id}
                    className={`relative transition-all duration-300 hover:shadow-2xl ${
                      tier.popular ? "ring-2 ring-[#3b5069] dark:ring-[#bacbd8] scale-105" : "hover:scale-105"
                    } ${selectedTier.id === tier.id ? "ring-2 ring-[#6c7c92] dark:ring-[#cbd8e2]" : ""} bg-white dark:bg-[#171f36] border-gray-200 dark:border-[#3b5069]`}
                  >
                    {tier.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#6c7c92] to-[#3b5069] dark:from-[#bacbd8] dark:to-[#cbd8e2] text-white dark:text-[#171f36]">
                        Most Popular
                      </Badge>
                    )}

                    <CardHeader className="text-center pb-8">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
                        {tier.description}
                      </CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">${tier.price}</span>
                        <span className="text-gray-600 dark:text-gray-300">/month</span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <ul className="space-y-3 mb-8">
                        {tier.features &&
                          tier.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                      </ul>

                      <div className="space-y-3">
                        <Button
                          onClick={() => handleSelectTier(tier)}
                          variant={selectedTier.id === tier.id ? "default" : "outline"}
                          className="w-full"
                        >
                          {selectedTier.id === tier.id ? "Selected" : "Select Plan"}
                        </Button>

                        {selectedTier.id === tier.id && (
                          <Button
                            onClick={handleProceedToCheckout}
                            className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white`}
                          >
                            Get Started Now
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-[#171f36] transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose EasyMind Wellness?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need for complete mental wellness</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#6c7685] to-[#3b5069] flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Evidence-Based</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Scientifically proven techniques and therapies for lasting results
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#6c7c92] to-[#171f36] flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Private & Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">
                HIPAA-compliant platform with complete privacy protection
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#3b5069] to-[#171f36] flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Expert Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Licensed therapists and wellness coaches available 24/7
              </p>
              <p className="text-[#3b5069] dark:text-[#bacbd8] font-medium mt-2">Call us: (562) 283-5727</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#171f36] dark:bg-black text-white py-12 px-4 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/easy-mind-logo.png" alt="EasyMind Wellness Logo" className="w-8 h-8 rounded-full" />
                <span className="text-xl font-bold">EasyMind</span>
              </div>
              <p className="text-gray-400 dark:text-gray-300 mb-4">
                Transform your mental wellness journey with our comprehensive platform.
              </p>
              <div className="mb-4">
                <a href="tel:562-283-5727" className="text-[#bacbd8] hover:text-[#cbd8e2] font-medium">
                  📞 (562) 283-5727
                </a>
                <p className="text-gray-400 dark:text-gray-300 text-sm">Available 24/7</p>
              </div>
              <div className="mb-4">
                <a
                  href="mailto:logan@easymind-wellness.com"
                  className="text-[#bacbd8] hover:text-[#cbd8e2] font-medium"
                >
                  ✉️ logan@easymind-wellness.com
                </a>
                <p className="text-gray-400 dark:text-gray-300 text-sm">Get started today</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Logan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About EasyMind
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Our Mission
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Helpful Information</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Provider Types
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Treatment Modalities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-300">
                <li>
                  <a href="mailto:logan@easymind-wellness.com" className="hover:text-white">
                    Email Logan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Insurance Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Schedule Consultation
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#3b5069] dark:border-gray-700 pt-8 text-center text-gray-400 dark:text-gray-300">
            <p>© 2024 EasyMind Wellness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
