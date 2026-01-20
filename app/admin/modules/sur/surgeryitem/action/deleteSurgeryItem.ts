"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteSurgeryItem = async (id: number) => {
    try {
        await prisma.sur_surgeryitem.update({
            where: {
                SurgeryItemID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/sur/surgeryitem");
    } catch (error) {
        console.error("Error deleting surgery item:", error);
    }
};

export default deleteSurgeryItem;
