"use server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/sendMail";

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

    console.log("Sending OTP via sendMail");
    try {
        await sendMail({
            to: email,
            subject: "Password Reset OTP",
            message: `Your OTP for password reset is: ${otp}`,
            otp: otp.toString(),
        });
        return { success: true, message: "OTP sent successfully!" };
    } catch (error: any) {
        console.error("Error sending OTP email:", error);
        return { success: false, message: "Failed to send OTP email." };
    }
}