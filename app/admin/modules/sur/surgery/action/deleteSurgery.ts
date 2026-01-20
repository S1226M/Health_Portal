"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteSurgery = async (id: number) => {
    try {
        await prisma.sur_surgery.update({
            where: {
                SurgeryID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/sur/surgery");
    } catch (error) {
        console.error("Error deleting surgery:", error);
    }
};

export default deleteSurgery;
