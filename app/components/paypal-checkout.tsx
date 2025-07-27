"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface PayPalCheckoutProps {
  amount: number
  planName: string
  onSuccess: (details: any) => void
  onError: (error: any) => void
}

declare global {
  interface Window {
    paypal?: any
  }
}

export default function PayPalCheckout({ amount, planName, onSuccess, onError }: PayPalCheckoutProps) {
  const paypalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement("script")
    script.src = "https://www.paypal.com/sdk/js?client-id=test&currency=USD"
    script.async = true

    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal
          .Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toString(),
                    },
                    description: `${planName} - Monthly Wellness Subscription`,
                  },
                ],
              })
            },
            onApprove: async (data: any, actions: any) => {
              try {
                const details = await actions.order.capture()
                onSuccess(details)
              } catch (error) {
                onError(error)
              }
            },
            onError: (error: any) => {
              onError(error)
            },
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
            },
          })
          .render(paypalRef.current)
      }
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [amount, planName, onSuccess, onError])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Order Summary
              <Badge variant="secondary">Monthly</Badge>
            </CardTitle>
            <CardDescription>Review your purchase details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">{planName}</span>
              <span className="font-bold">${amount}/month</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                30-day wellness guarantee
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Cancel anytime, no commitment
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Instant access to wellness tools
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total Today</span>
                <span>${amount}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Billed monthly. Cancel anytime.</p>
            </div>
          </CardContent>
        </Card>

        {/* PayPal Checkout */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Secure payment powered by PayPal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-blue-900">Secure Payment</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your wellness journey starts with secure payment. All personal health information is HIPAA-compliant
                  and encrypted.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  Need help? Call us at{" "}
                  <a href="tel:562-283-5727" className="font-medium underline">
                    (562) 283-5727
                  </a>
                </p>
              </div>

              {/* PayPal Button Container */}
              <div ref={paypalRef} className="min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading PayPal...</p>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
