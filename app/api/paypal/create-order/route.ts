import { NextRequest, NextResponse } from "next/server"
import { createPayPalOrder } from "@/lib/paypal"

export async function POST(req: NextRequest) {
  try {
    const { amount, planName } = await req.json()

    if (!amount || !planName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const order = await createPayPalOrder(amount, `${planName} — Monthly Wellness Subscription`)

    return NextResponse.json({ id: order.id })
  } catch (error: any) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 })
  }
}
