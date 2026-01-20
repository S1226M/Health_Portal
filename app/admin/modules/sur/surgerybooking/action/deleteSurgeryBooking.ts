"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteSurgeryBooking = async (id: number) => {
    try {
        await prisma.sur_surgerybooking.update({
            where: {
                SurgeryBookingID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/sur/surgerybooking");
    } catch (error) {
        console.error("Error deleting surgery booking:", error);
    }
};

export default deleteSurgeryBooking;
