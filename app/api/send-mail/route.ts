import { NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";


export async function POST(req: Request) {
  console.log("--- HIT /api/send-mail ---");
  const body = await req.json();
  console.log("Parsed body:", body);
  const { email, subject, message, doctorName, name } = body;

  try {
    await sendMail({
      to: email,
      subject,
      message,
      otp: body.otp,
      doctorName,
      name
    });
    console.log("Email sent successfully!");
    return NextResponse.json({ sucess: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ sucess: false, message: String(error) }, { status: 500 });
  }
}