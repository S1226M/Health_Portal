import nodemailer from "nodemailer";

export interface SendMailOptions {
  to: string;
  subject: string;
  message?: string;
  otp?: string;
  doctorName?: string;
  name?: string;
}

export async function sendMail({
  to,
  subject,
  message = "",
  otp,
  doctorName,
  name,
}: SendMailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let emailHtml = "";
  let emailSubject = subject || "Notification from Health Portal";

  if (subject && subject.includes("OTP")) {
    const otpCode = otp || message.replace(/\D/g, "");
    emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${emailSubject}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:#2196F3; color:#ffffff; padding:20px; text-align:center;">
              <h2 style="margin:0;">${emailSubject}</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:20px; color:#333; text-align:center;">
              <p style="font-size:16px;">Hello,</p>
              <p>You requested a password reset. Use the following OTP to complete the process:</p>
              <div style="margin: 30px auto; padding: 15px; background: #f1f1f1; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #333; width: fit-content;">
                ${otpCode}
              </div>
              <p style="margin-top:20px;">If you did not request this, please ignore this email.</p>
              <p style="margin-top:30px;">Regards,<br><strong>Health Portal Team</strong></p>
            </td>
          </tr>
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
</html>`;
  } else {
    emailHtml = `
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
          <tr>
            <td style="background:#4CAF50; color:#ffffff; padding:20px; text-align:center;">
              <h2 style="margin:0;">Appointment Confirmed</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:20px; color:#333;">
              <p style="font-size:16px;">Hello <strong>${name || 'Patient'}</strong>,</p>
              <p>Your appointment has been successfully booked. Here are the details:</p>
              <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse; margin-top:10px;">
                <tr>
                  <td style="background:#f1f1f1; font-weight:bold;">Doctor</td>
                  <td>${doctorName || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="background:#f1f1f1; font-weight:bold;">Subject</td>
                  <td>${subject || 'Appointment'}</td>
                </tr>
                <tr>
                  <td style="background:#f1f1f1; font-weight:bold;">Message</td>
                  <td>${message || 'N/A'}</td>
                </tr>
              </table>
              <p style="margin-top:20px;">If you have any questions, feel free to contact us.</p>
              <p style="margin-top:30px;">Regards,<br><strong>Health Portal Team</strong></p>
            </td>
          </tr>
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
</html>`;
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: emailSubject,
    html: emailHtml,
  });

  return info;
}
