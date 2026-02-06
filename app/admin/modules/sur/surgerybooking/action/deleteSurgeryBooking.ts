"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const deleteSurgeryBooking = async (id: number) => {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) {
        throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
    const currentUserId = (decoded.userId ?? decoded.UserID) as number;
    if (!currentUserId) {
        throw new Error("Unauthorized");
    }
    
    await prisma.sur_surgerybooking.update({
        where: {
            SurgeryBookingID: id,
        },
        data: {
            IsDeleted: true,
        },
    });
    revalidatePath("/admin/components/sur/surgerybooking");
};

export default deleteSurgeryBooking;
