"use server";
import { prisma } from "@/lib/prisma";

export default async function resetPassword({ email, otp, newPassword }: any) {
    if (!email || !otp || !newPassword) {
        return { success: false, message: "Please provide all required fields." };
    }

    const user = await prisma.sec_user.findFirst({
        where: { Email: email, otp: parseInt(otp) }
    });

    if (!user) {
        return { success: false, message: "Invalid OTP or Email." };
    }

    try {
        await prisma.sec_user.update({
            where: { UserID: user.UserID },
            data: { 
                Password: newPassword,
                otp: null
            }
        });
        return { success: true, message: "Password reset successfully. You can now login." };
    } catch (error) {
        console.error("Error resetting password:", error);
        return { success: false, message: "An error occurred while resetting the password." };
    }
}
