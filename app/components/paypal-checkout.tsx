"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

interface PayPalCheckoutProps {
  amount: number
  planName: string
  onSuccess: (details: { orderId: string; customerName: string; customerEmail: string }) => void
  onError: (error: any) => void
}

declare global {
  interface Window {
    paypal?: any
  }
}

export default function PayPalCheckout({ amount, planName, onSuccess, onError }: PayPalCheckoutProps) {
  const paypalRef = useRef<HTMLDivElement>(null)
  const buttonsRendered = useRef(false)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [formReady, setFormReady] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)

  const customerNameRef = useRef(customerName)
  const customerEmailRef = useRef(customerEmail)
  customerNameRef.current = customerName
  customerEmailRef.current = customerEmail

  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)
  onSuccessRef.current = onSuccess
  onErrorRef.current = onError

  // Validate form fields
  useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
    setFormReady(customerName.trim().length >= 2 && emailValid)
  }, [customerName, customerEmail])

  // Load PayPal SDK once
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test"

    if (document.querySelector(`script[data-paypal-sdk]`)) {
      if (window.paypal) setSdkReady(true)
      return
    }

    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
    script.dataset.paypalSdk = "true"
    script.async = true

    script.onload = () => setSdkReady(true)
    script.onerror = () => onErrorRef.current(new Error("Failed to load PayPal SDK"))

    document.head.appendChild(script)
  }, [onError])

  // Render PayPal buttons once SDK is ready and form is valid
  useEffect(() => {
    if (!sdkReady || !formReady || !paypalRef.current || buttonsRendered.current) return

    buttonsRendered.current = true

    window.paypal
      .Buttons({
        createOrder: async () => {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, planName }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.error || "Failed to create order")
          return data.id
        },
        onApprove: async (data: { orderID: string }) => {
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderID: data.orderID,
              customerEmail: customerEmailRef.current,
              customerName: customerNameRef.current,
              planName,
              amount,
            }),
          })
          const details = await res.json()
          if (!res.ok) throw new Error(details.error || "Failed to capture order")
          onSuccessRef.current({
            orderId: details.orderId,
            customerName: customerNameRef.current,
            customerEmail: customerEmailRef.current,
          })
        },
        onError: (err: any) => onErrorRef.current(err),
        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay",
        },
      })
      .render(paypalRef.current)
  }, [sdkReady, formReady, amount, planName])

  // Reset buttons if form becomes invalid again
  useEffect(() => {
    if (!formReady && buttonsRendered.current && paypalRef.current) {
      paypalRef.current.innerHTML = ""
      buttonsRendered.current = false
    }
  }, [formReady])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card className="bg-white dark:bg-[#171f36] border-gray-200 dark:border-[#3b5069] card-transition">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white theme-transition">
              Order Summary
              <Badge variant="secondary" className="theme-transition">
                One-time
              </Badge>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 theme-transition">
              Review your purchase details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-[#3b5069] theme-transition">
              <span className="font-medium text-gray-900 dark:text-white theme-transition">{planName}</span>
              <span className="font-bold text-gray-900 dark:text-white theme-transition">${amount}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 theme-transition">
                <Check className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                One-time payment, no recurring charges
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 theme-transition">
                <Check className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                30-day satisfaction guarantee
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 theme-transition">
                <Check className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                Sessions scheduled after purchase
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 theme-transition">
                <Check className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                Confirmation email sent immediately
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-[#3b5069] theme-transition">
              <div className="flex justify-between items-center font-bold text-lg">
                <span className="text-gray-900 dark:text-white theme-transition">Total Today</span>
                <span className="text-gray-900 dark:text-white theme-transition">${amount}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 theme-transition">
                One-time payment. No subscriptions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PayPal Checkout */}
        <Card className="bg-white dark:bg-[#171f36] border-gray-200 dark:border-[#3b5069] card-transition">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white theme-transition">Payment Method</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 theme-transition">
              Secure payment powered by PayPal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Customer Info Fields */}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="customerName" className="text-gray-700 dark:text-gray-300 theme-transition">
                    Full Name
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="Jane Smith"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-1 bg-white dark:bg-[#3b5069] border-gray-300 dark:border-[#6c7685] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 theme-transition"
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail" className="text-gray-700 dark:text-gray-300 theme-transition">
                    Email Address{" "}
                    <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">(for confirmation)</span>
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder="jane@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="mt-1 bg-white dark:bg-[#3b5069] border-gray-300 dark:border-[#6c7685] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 theme-transition"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-[#3b5069] rounded-lg border border-blue-200 dark:border-[#6c7685] theme-transition">
                <p className="text-sm text-blue-700 dark:text-gray-300 theme-transition">
                  <span className="font-medium">HIPAA-compliant & encrypted.</span> Your health information is fully
                  protected. Need help?{" "}
                  <a href="tel:562-283-5727" className="font-medium underline hover:opacity-80">
                    (562) 283-5727
                  </a>
                </p>
              </div>

              {/* PayPal Button or prompt */}
              <div className="min-h-[80px]">
                {!formReady ? (
                  <div className="flex items-center justify-center h-20 rounded-lg border-2 border-dashed border-gray-200 dark:border-[#3b5069] theme-transition">
                    <p className="text-sm text-gray-400 dark:text-gray-500 text-center theme-transition">
                      Enter your name and email above to continue
                    </p>
                  </div>
                ) : (
                  <div ref={paypalRef}>
                    {!sdkReady && (
                      <div className="flex items-center justify-center h-20">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 dark:border-[#bacbd8]" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-center text-xs text-gray-400 dark:text-gray-500 theme-transition">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
