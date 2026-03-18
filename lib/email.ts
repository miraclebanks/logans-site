import nodemailer from "nodemailer"

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export interface OrderConfirmationData {
  customerEmail: string
  customerName: string
  planName: string
  amount: number
  orderId: string
}

export async function sendOrderConfirmation(data: OrderConfirmationData) {
  const { customerEmail, customerName, planName, amount, orderId } = data
  const transporter = createTransporter()
  const businessEmail = process.env.BUSINESS_EMAIL || "logan@easymind-wellness.com"
  const fromAddress = process.env.EMAIL_FROM || `"EasyMind Wellness" <${process.env.SMTP_USER}>`

  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - EasyMind Wellness</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f7f9;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7f9;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#3b5069,#171f36);padding:40px 40px 32px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">EasyMind Wellness</h1>
                  <p style="margin:8px 0 0;color:#bacbd8;font-size:15px;">Your wellness journey begins now</p>
                </td>
              </tr>

              <!-- Confirmation Badge -->
              <tr>
                <td style="padding:32px 40px 0;text-align:center;">
                  <div style="display:inline-block;background-color:#e8f5e9;border-radius:50px;padding:10px 24px;">
                    <span style="color:#2e7d32;font-weight:600;font-size:15px;">✓ Payment Confirmed</span>
                  </div>
                  <h2 style="margin:20px 0 8px;color:#171f36;font-size:22px;font-weight:700;">Thank you, ${customerName}!</h2>
                  <p style="margin:0;color:#6c7685;font-size:15px;line-height:1.6;">Your subscription has been activated. You now have full access to the <strong>${planName}</strong> plan.</p>
                </td>
              </tr>

              <!-- Order Details -->
              <tr>
                <td style="padding:28px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
                    <tr>
                      <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                        <p style="margin:0;color:#6c7685;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Order Details</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color:#3b5069;font-size:14px;">Order ID</td>
                            <td align="right" style="color:#171f36;font-size:14px;font-family:monospace;">${orderId}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color:#3b5069;font-size:14px;">Plan</td>
                            <td align="right" style="color:#171f36;font-size:14px;font-weight:600;">${planName}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color:#3b5069;font-size:14px;">Billing</td>
                            <td align="right" style="color:#171f36;font-size:14px;">Monthly</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color:#3b5069;font-size:15px;font-weight:700;">Amount Charged</td>
                            <td align="right" style="color:#171f36;font-size:18px;font-weight:700;">$${amount.toFixed(2)}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- What's Next -->
              <tr>
                <td style="padding:0 40px 28px;">
                  <h3 style="margin:0 0 16px;color:#171f36;font-size:17px;font-weight:700;">What's included in your plan:</h3>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="color:#3b5069;font-size:18px;">✓</span>
                        <span style="color:#3b5069;font-size:14px;margin-left:10px;">Instant access to all ${planName} features</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="color:#3b5069;font-size:18px;">✓</span>
                        <span style="color:#3b5069;font-size:14px;margin-left:10px;">30-day money-back guarantee</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="color:#3b5069;font-size:18px;">✓</span>
                        <span style="color:#3b5069;font-size:14px;margin-left:10px;">Cancel anytime — no long-term commitment</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="color:#3b5069;font-size:18px;">✓</span>
                        <span style="color:#3b5069;font-size:14px;margin-left:10px;">Subscription renews automatically each month</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Support -->
              <tr>
                <td style="padding:0 40px 28px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f0f4f8,#e8edf3);border-radius:8px;padding:20px;">
                    <tr>
                      <td>
                        <p style="margin:0 0 8px;color:#171f36;font-size:15px;font-weight:700;">Need help?</p>
                        <p style="margin:0 0 6px;color:#6c7685;font-size:14px;">📞 <a href="tel:5622835727" style="color:#3b5069;text-decoration:none;font-weight:600;">(562) 283-5727</a> — Available 24/7</p>
                        <p style="margin:0;color:#6c7685;font-size:14px;">✉️ <a href="mailto:${businessEmail}" style="color:#3b5069;text-decoration:none;font-weight:600;">${businessEmail}</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                  <p style="margin:0 0 8px;color:#6c7685;font-size:13px;">© 2024 EasyMind Wellness. All rights reserved.</p>
                  <p style="margin:0;color:#9ca3af;font-size:12px;">This is an automated confirmation email. Please do not reply directly to this email.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  const businessHtml = `
    <h2>New Subscription Purchase</h2>
    <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
    <p><strong>Plan:</strong> ${planName}</p>
    <p><strong>Amount:</strong> $${amount.toFixed(2)}/month</p>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
  `

  await Promise.all([
    transporter.sendMail({
      from: fromAddress,
      to: customerEmail,
      subject: `Order Confirmation — ${planName} | EasyMind Wellness`,
      html: customerHtml,
    }),
    transporter.sendMail({
      from: fromAddress,
      to: businessEmail,
      subject: `New Subscription: ${planName} — ${customerName}`,
      html: businessHtml,
    }),
  ])
}
