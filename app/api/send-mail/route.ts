import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req: Request) {
  console.log("--- HIT /api/send-mail ---");
  const body = await req.json();
  console.log("Parsed body:", body);
  const { email, subject, message, doctorName, name } = body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Appointment Confirmation",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Appointment Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background:#4CAF50; color:#ffffff; padding:20px; text-align:center;">
              <h2 style="margin:0;">Appointment Confirmed</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:20px; color:#333;">
              <p style="font-size:16px;">Hello <strong>${name}</strong>,</p>
              
              <p>Your appointment has been successfully booked. Here are the details:</p>

              <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; margin-top:10px;">
                <tr>
                  <td style="background:#f1f1f1; font-weight:bold;">Doctor</td>
                  <td>${doctorName}</td>
                </tr>
                <tr>
                  <td style="background:#f1f1f1; font-weight:bold;">Subject</td>
                  <td>${subject}</td>
                </tr>
                <tr>
                  <td style="background:#f1f1f1; font-weight:bold;">Message</td>
                  <td>${message}</td>
                </tr>
              </table>

              <p style="margin-top:20px;">If you have any questions, feel free to contact us.</p>

              <p style="margin-top:30px;">Regards,<br><strong>Health Portal Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#777;">
              © 2026 Health Portal. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
    });
    console.log("Email sent successfully");
    return NextResponse.json({ sucess: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ sucess: false, message: String(error) }, { status: 500 });
  }
}