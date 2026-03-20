"use server";
import { prisma } from "@/lib/prisma";

export default async function sendOTP({ email }: { email: string }) {
    const user = await prisma.sec_user.findFirst({
        where: { Email: email },
        select: {
            UserID: true
        }
    });

    if (!user) {
        return { success: false, message: "This user does not exist." };
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    await prisma.sec_user.update({
        where: { UserID: user.UserID },
        data: { otp: otp }
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    console.log("API call.");
    const response = await fetch(`${baseUrl}/api/send-mail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            subject: "Password Reset OTP",
            message: `Your OTP for password reset is: ${otp}`,
        }),
    });

    return { success: true, message: "OTP sent successfully!" };
}