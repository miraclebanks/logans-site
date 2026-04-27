"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, Menu, Award, Phone, Mail, X, Check, Shield, Zap, Crown } from "lucide-react"
import ThemeToggle from "./components/theme-toggle"
import PayPalCheckout from "./components/paypal-checkout"

const productTiers = [
  {
    id: "basic",
    name: "Basic Match",
    price: 29,
    priceLabel: "one-time",
    description: "Find the right provider to start your journey",
    icon: Shield,
    features: [
      "Personalized needs assessment",
      "3 curated provider matches",
      "Provider profiles & bios",
      "Specialty & approach filtering",
      "Insurance compatibility filtering",
      "Email support",
    ],
    popular: false,
    color: "from-[#6c7685] to-[#3b5069]",
  },
  {
    id: "pro",
    name: "Guided Match",
    price: 79,
    priceLabel: "one-time",
    description: "A more thorough search with specialist support",
    icon: Zap,
    features: [
      "In-depth preference assessment",
      "Up to 10 provider matches",
      "Insurance compatibility filtering",
      "30-min phone consultation",
      "Scheduling assistance",
      "30-day match support",
    ],
    popular: true,
    color: "from-[#6c7c92] to-[#171f36]",
  },
  {
    id: "enterprise",
    name: "Concierge Care",
    price: 199,
    priceLabel: "one-time",
    description: "White-glove matching with end-to-end support",
    icon: Crown,
    features: [
      "Dedicated matching specialist",
      "Unlimited provider matches",
      "Insurance verification assistance",
      "Couples & family provider matching",
      "Appointment booking handled for you",
      "Priority phone & email support",
      "90-day ongoing match support",
      "Follow-up check-ins included",
    ],
    popular: false,
    color: "from-[#3b5069] to-[#171f36]",
  },
]

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export default function EasyMindPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [selectedTier, setSelectedTier] = useState(productTiers[1])
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string; customerName: string; customerEmail: string; planName: string; amount: number } | null>(null)

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error()
      setFormStatus("success")
      setFormState({ name: "", email: "", phone: "", message: "" })
    } catch {
      setFormStatus("error")
    }
  }

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Helpful Information", id: "helpful-information" },
    { label: "Plans", id: "pricing" },
    { label: "Get Started", id: "get-started" },
  ]

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#171f36] py-12 px-4 theme-transition">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white dark:bg-[#1e2d42] rounded-2xl shadow-xl p-10 card-transition">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 theme-transition">Welcome to EasyMind!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 theme-transition">
              Your <strong>{orderSuccess.planName}</strong> subscription is now active.
            </p>
            <div className="bg-gray-50 dark:bg-[#171f36] rounded-xl p-5 text-left space-y-3 mb-6 theme-transition">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Plan</span>
                <span className="font-semibold text-gray-900 dark:text-white">{orderSuccess.planName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Amount</span>
                <span className="font-semibold text-gray-900 dark:text-white">${orderSuccess.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Order ID</span>
                <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{orderSuccess.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Confirmation sent to</span>
                <span className="text-gray-700 dark:text-gray-300">{orderSuccess.customerEmail}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 theme-transition">
              A confirmation email has been sent to <strong>{orderSuccess.customerEmail}</strong>.
            </p>
            <Button
              onClick={() => { setOrderSuccess(null); setShowCheckout(false) }}
              className="bg-gradient-to-r from-[#3b5069] to-[#171f36] text-white hover:opacity-90"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#171f36] py-12 px-4 theme-transition">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button variant="outline" onClick={() => setShowCheckout(false)} className="mb-4 theme-transition">
              ← Back to Plans
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 theme-transition">Complete Your Purchase</h1>
            <p className="text-gray-600 dark:text-gray-300 theme-transition">
              You're purchasing: {selectedTier.name} — ${selectedTier.price}/month
            </p>
          </div>
          <PayPalCheckout
            amount={selectedTier.price}
            planName={selectedTier.name}
            onSuccess={(details) => {
              setOrderSuccess({ ...details, planName: selectedTier.name, amount: selectedTier.price })
              setShowCheckout(false)
            }}
            onError={(error) => console.error("Payment error:", error)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#171f36] theme-transition">

      {/* Top Banner */}
      <div className="text-center py-3 px-4 bg-gradient-to-r from-[#3b5069] to-[#171f36]">
        <p className="text-sm font-medium text-white">
          📞{" "}
          <a href="tel:5622835727" className="underline font-semibold hover:opacity-80">
            Call Now
          </a>{" "}
          for a free 15-minute consultation
        </p>
      </div>

      {/* Header */}
      <header className="border-b bg-white dark:bg-[#171f36] dark:border-[#3b5069] sticky top-0 z-50 theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center space-x-1 font-medium text-gray-900 dark:text-white hover:text-[#3b5069] dark:hover:text-[#bacbd8] theme-transition"
                >
                  <span>{link.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen
                ? <X className="w-6 h-6 text-gray-900 dark:text-white" />
                : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
              }
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="/easy-mind-logo.png" alt="EasyMind Wellness" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold text-gray-900 dark:text-white theme-transition">EasyMind</span>
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:562-283-5727"
                className="hidden md:block text-[#3b5069] dark:text-[#bacbd8] font-medium text-sm hover:opacity-80 theme-transition"
              >
                📞 Call Now
              </a>
              <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t dark:border-[#3b5069] bg-white dark:bg-[#171f36] px-4 py-4 space-y-3 theme-transition">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { scrollTo(link.id); setMobileMenuOpen(false) }}
                className="block w-full text-left font-medium text-gray-900 dark:text-white hover:text-[#3b5069] dark:hover:text-[#bacbd8] py-2 theme-transition"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className={`grid lg:grid-cols-2 min-h-[560px] gradient-transition ${darkMode ? "hero-gradient-dark" : "hero-gradient-light"}`}>
        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-lg text-center lg:text-left">

            {/* Grant Award Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-yellow-300 flex-shrink-0" />
              <span className="text-white text-sm font-medium">
                City of Long Beach — Outstanding Micro Business &amp; Startup Grant Recipient
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Transform your mental wellness journey
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Personalized therapy and wellness support designed for your unique needs. Let&apos;s take the first step together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollTo("get-started")}
                className="bg-[#cbd8e2] dark:bg-[#bacbd8] text-[#171f36] hover:bg-[#bacbd8] font-semibold px-8 rounded-full text-lg hover:scale-105 transform transition-transform duration-200"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("about")}
                className="border-2 border-white text-white bg-white/10 hover:bg-white/20 rounded-full text-lg"
              >
                Learn More
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              Free 15-minute consultation •{" "}
              <a href="tel:5622835727" className="underline hover:opacity-80">Call Now</a>
            </p>
          </div>
        </div>

        <div className={`hidden lg:flex items-center justify-center p-8 gradient-transition ${darkMode ? "hero-image-gradient-dark" : "hero-image-gradient-light"}`}>
          <img
            src="/easy-mind-logo.png"
            alt="EasyMind Wellness"
            className="w-full max-w-md h-auto rounded-2xl shadow-2xl hover:scale-105 transform transition-transform duration-300"
          />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-[#171f36] theme-transition">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 theme-transition">About</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#3b5069] to-[#6c7c92] mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 theme-transition">About Us</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed theme-transition">
                  Logan is a licensed mental health professional dedicated to providing compassionate, evidence-based care.
                  With a deep commitment to accessible wellness, Logan founded EasyMind to make quality mental health
                  support available to everyone in the Long Beach community and beyond.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 theme-transition">About EasyMind</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed theme-transition">
                  EasyMind Wellness is a mental health practice built on the belief that everyone deserves access to
                  compassionate, personalized care. We offer a range of therapy and wellness services tailored to your
                  unique journey — whether you&apos;re navigating anxiety, building resilience, or simply seeking a
                  supportive space to grow.
                </p>
              </div>
            </div>

            {/* Award card */}
            <Card className="bg-gradient-to-br from-[#f0f4f8] to-[#e2eaf3] dark:from-[#1e2d42] dark:to-[#171f36] border-[#bacbd8] dark:border-[#3b5069] card-transition">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3b5069] to-[#171f36] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 theme-transition">
                  Grant Award Winner
                </h4>
                <p className="text-[#3b5069] dark:text-[#bacbd8] font-semibold mb-3 theme-transition">
                  City of Long Beach
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed theme-transition">
                  Recognized as an <strong>Outstanding Micro Business &amp; Startup</strong> by the City of Long Beach —
                  a testament to our commitment to the community and the quality of care we provide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── HELPFUL INFORMATION ── */}
      <section
        id="helpful-information"
        className={`py-20 px-4 gradient-transition ${darkMode ? "pricing-gradient-dark" : "pricing-gradient-light"}`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 theme-transition">Helpful Information</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#3b5069] to-[#6c7c92] mx-auto rounded-full" />
            <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg theme-transition">
              Everything you need to know before getting started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Provider Types */}
            <Card className="bg-white dark:bg-[#171f36] border-gray-200 dark:border-[#3b5069] card-transition hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#6c7685] to-[#3b5069] rounded-full flex items-center justify-center mb-3">
                  <span className="text-white text-xl">👤</span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white theme-transition">Provider Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-600 dark:text-gray-300 theme-transition">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">Therapist / Counselor</p>
                  <p className="text-sm">Licensed professionals who provide talk therapy for mental health concerns.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">Psychologist</p>
                  <p className="text-sm">Doctoral-level specialists in psychological assessment and therapy.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">Wellness Coach</p>
                  <p className="text-sm">Focused on goal-setting, lifestyle balance, and personal growth.</p>
                </div>
              </CardContent>
            </Card>

            {/* Modalities */}
            <Card className="bg-white dark:bg-[#171f36] border-gray-200 dark:border-[#3b5069] card-transition hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#6c7c92] to-[#3b5069] rounded-full flex items-center justify-center mb-3">
                  <span className="text-white text-xl">🧠</span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white theme-transition">Treatment Modalities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-600 dark:text-gray-300 theme-transition">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">CBT</p>
                  <p className="text-sm">Cognitive Behavioral Therapy — reshaping negative thought patterns.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">Mindfulness-Based</p>
                  <p className="text-sm">Meditation and awareness practices to reduce stress and anxiety.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">Solution-Focused</p>
                  <p className="text-sm">Goal-oriented therapy that builds on your existing strengths.</p>
                </div>
              </CardContent>
            </Card>

            {/* Insurance */}
            <Card className="bg-white dark:bg-[#171f36] border-gray-200 dark:border-[#3b5069] card-transition hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#3b5069] to-[#171f36] rounded-full flex items-center justify-center mb-3">
                  <span className="text-white text-xl">🛡️</span>
                </div>
                <CardTitle className="text-gray-900 dark:text-white theme-transition">Insurance Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-600 dark:text-gray-300 theme-transition">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">In-Network</p>
                  <p className="text-sm">We work with select insurance plans to minimize your out-of-pocket costs.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">Out-of-Network</p>
                  <p className="text-sm">We can provide a superbill for you to submit to your insurance for reimbursement.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm theme-transition">Sliding Scale</p>
                  <p className="text-sm">Fee adjustments available based on financial need. Ask us about options.</p>
                </div>
              </CardContent>
            </Card>

          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 dark:text-gray-300 theme-transition">
              Have questions?{" "}
              <a href="tel:5622835727" className="text-[#3b5069] dark:text-[#bacbd8] font-semibold hover:underline">
                Call Now
              </a>
              {" "}or{" "}
              <button onClick={() => scrollTo("get-started")} className="text-[#3b5069] dark:text-[#bacbd8] font-semibold hover:underline">
                send us a message
              </button>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 px-4 bg-white dark:bg-[#171f36] theme-transition">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 theme-transition">Choose Your Wellness Plan</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#3b5069] to-[#6c7c92] mx-auto rounded-full mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300 theme-transition">Find the perfect plan for your mental health journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {productTiers.map((tier) => {
              const IconComponent = tier.icon
              return (
                <Card
                  key={tier.id}
                  className={`relative card-transition hover:shadow-2xl ${
                    tier.popular ? "ring-2 ring-[#3b5069] dark:ring-[#bacbd8] scale-105" : "hover:scale-105"
                  } ${selectedTier.id === tier.id ? "ring-2 ring-[#6c7c92] dark:ring-[#cbd8e2]" : ""} bg-white dark:bg-[#1e2d42] border-gray-200 dark:border-[#3b5069] hover:-translate-y-1`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#6c7c92] to-[#3b5069] text-white">
                      Most Popular
                    </Badge>
                  )}
                  <div className="p-6 text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 theme-transition">{tier.name}</h3>
                    <CardDescription className="text-gray-600 dark:text-gray-300 mb-4 theme-transition">{tier.description}</CardDescription>
                    <div>
                      <span className="text-4xl font-bold text-gray-900 dark:text-white theme-transition">${tier.price}</span>
                      <span className="text-gray-600 dark:text-gray-300 theme-transition"> {tier.priceLabel}</span>
                    </div>
                  </div>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm theme-transition">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <Button
                        onClick={() => { setSelectedTier(tier); setShowCheckout(false) }}
                        variant={selectedTier.id === tier.id ? "default" : "outline"}
                        className="w-full theme-transition"
                      >
                        {selectedTier.id === tier.id ? "Selected" : "Select Plan"}
                      </Button>
                      {selectedTier.id === tier.id && (
                        <Button
                          onClick={() => setShowCheckout(true)}
                          className={`w-full bg-gradient-to-r ${tier.color} text-white hover:opacity-90 theme-transition`}
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

      {/* ── GET STARTED ── */}
      <section id="get-started" className="py-20 px-4 bg-white dark:bg-[#171f36] theme-transition">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 theme-transition">Get Started</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#3b5069] to-[#6c7c92] mx-auto rounded-full" />
            <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg theme-transition">
              Ready to begin your wellness journey? Reach out and Logan will be in touch.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 theme-transition">Contact Directly</h3>
                <div className="space-y-4">
                  <a
                    href="tel:5622835727"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#1e2d42] border border-gray-200 dark:border-[#3b5069] hover:border-[#3b5069] dark:hover:border-[#bacbd8] transition-colors theme-transition group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-[#3b5069] to-[#171f36] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white theme-transition">Call Now</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 theme-transition">Free 15-min consultation available</p>
                    </div>
                  </a>
                  <a
                    href="mailto:logan@easymind-wellness.com"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#1e2d42] border border-gray-200 dark:border-[#3b5069] hover:border-[#3b5069] dark:hover:border-[#bacbd8] transition-colors theme-transition"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-[#3b5069] to-[#171f36] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white theme-transition">logan@easymind-wellness.com</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 theme-transition">We respond within 24 hours</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-[#f0f4f8] to-[#e2eaf3] dark:from-[#1e2d42] dark:to-[#171f36] border border-[#bacbd8] dark:border-[#3b5069] theme-transition">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed theme-transition">
                  <strong className="text-gray-900 dark:text-white">Not sure where to start?</strong> That&apos;s completely okay.
                  A free 15-minute phone consultation is a no-pressure way to ask questions and find out if EasyMind
                  is the right fit for you.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white dark:bg-[#1e2d42] border-gray-200 dark:border-[#3b5069] card-transition shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white theme-transition">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {formStatus === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">✓</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 theme-transition">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm theme-transition">
                      Logan will be in touch within 24 hours. Check your inbox for a confirmation.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setFormStatus("idle")}
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 theme-transition">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        placeholder="Jane Smith"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="mt-1 dark:bg-[#171f36] dark:border-[#3b5069] dark:text-white theme-transition"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 theme-transition">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="mt-1 dark:bg-[#171f36] dark:border-[#3b5069] dark:text-white theme-transition"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 theme-transition">
                        Phone{" "}
                        <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">(optional)</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(562) 000-0000"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="mt-1 dark:bg-[#171f36] dark:border-[#3b5069] dark:text-white theme-transition"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 theme-transition">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        placeholder="Tell us a little about what you're looking for..."
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="mt-1 dark:bg-[#171f36] dark:border-[#3b5069] dark:text-white theme-transition resize-none"
                      />
                    </div>
                    {formStatus === "error" && (
                      <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>
                    )}
                    <Button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full bg-gradient-to-r from-[#3b5069] to-[#171f36] text-white hover:opacity-90 theme-transition"
                    >
                      {formStatus === "sending" ? "Sending..." : "Send Message"}
                    </Button>
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center theme-transition">
                      By submitting, you agree to our Privacy Policy. We never share your information.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#171f36] dark:bg-black text-white py-12 px-4 theme-transition">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/easy-mind-logo.png" alt="EasyMind" className="w-8 h-8 rounded-full" />
                <span className="text-xl font-bold">EasyMind</span>
              </div>
              <p className="text-gray-400 mb-3 text-sm">Transform your mental wellness journey.</p>
              <div className="inline-flex items-center gap-1 bg-white/10 rounded-full px-3 py-1 mb-4">
                <Award className="w-3 h-3 text-yellow-300 flex-shrink-0" />
                <span className="text-xs text-gray-300">City of Long Beach Grant Recipient</span>
              </div>
              <div className="space-y-2">
                <a href="tel:562-283-5727" className="flex items-center gap-2 text-[#bacbd8] hover:text-[#cbd8e2] font-medium text-sm">
                  📞 Call Now
                </a>
                <a href="mailto:logan@easymind-wellness.com" className="flex items-center gap-2 text-[#bacbd8] hover:text-[#cbd8e2] font-medium text-sm">
                  ✉️ logan@easymind-wellness.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollTo("about")} className="hover:text-white">About Us</button></li>
                <li><button onClick={() => scrollTo("about")} className="hover:text-white">About EasyMind</button></li>
                <li><button onClick={() => scrollTo("about")} className="hover:text-white">Our Mission</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Helpful Information</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollTo("helpful-information")} className="hover:text-white">Provider Types</button></li>
                <li><button onClick={() => scrollTo("helpful-information")} className="hover:text-white">Treatment Modalities</button></li>
                <li><button onClick={() => scrollTo("helpful-information")} className="hover:text-white">Insurance Info</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollTo("get-started")} className="hover:text-white">Contact Us</button></li>
                <li><a href="tel:5622835727" className="hover:text-white">Free Consultation</a></li>
                <li><a href="mailto:logan@easymind-wellness.com" className="hover:text-white">Email Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#3b5069] pt-8 text-center text-gray-400 text-sm space-y-2">
            <p>© 2024 EasyMind Wellness. All rights reserved.</p>
            <p>
              <a
                href="https://www.linkedin.com/in/miraclebanks"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Powered by Miracles♥
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
