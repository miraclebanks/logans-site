import { NextRequest, NextResponse } from "next/server"
import { capturePayPalOrder } from "@/lib/paypal"
import { sendOrderConfirmation } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const { orderID, customerEmail, customerName, planName, amount } = await req.json()

    if (!orderID || !customerEmail || !planName || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const captureData = await capturePayPalOrder(orderID)

    if (captureData.status !== "COMPLETED") {
      return NextResponse.json({ error: "Payment was not completed" }, { status: 400 })
    }

    // Send confirmation emails (fire-and-forget — don't block the response)
    sendOrderConfirmation({
      customerEmail,
      customerName: customerName || customerEmail,
      planName,
      amount,
      orderId: captureData.id,
    }).catch((err) => console.error("Email send error:", err))

    return NextResponse.json({
      success: true,
      orderId: captureData.id,
      status: captureData.status,
    })
  } catch (error: any) {
    console.error("Capture order error:", error)
    return NextResponse.json({ error: error.message || "Failed to capture order" }, { status: 500 })
  }
}
