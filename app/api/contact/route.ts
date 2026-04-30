import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const fromAddress = process.env.EMAIL_FROM || `"EasyMind Wellness" <${process.env.SMTP_USER}>`
    const businessEmail = process.env.BUSINESS_EMAIL || "logan@easymind-wellness.com"

    await transporter.sendMail({
      from: fromAddress,
      to: businessEmail,
      replyTo: email,
      subject: `New Get Started Inquiry — ${name}`,
      html: `
        <h2>New inquiry from easymind-wellness.com</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    })

    await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: "We received your message — EasyMind Wellness",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out to EasyMind Wellness! Logan will be in touch shortly.</p>
        <p>We look forward to helping you on your journey to better mental health.</p>
        <br/>
        <p>— The EasyMind Wellness Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}
