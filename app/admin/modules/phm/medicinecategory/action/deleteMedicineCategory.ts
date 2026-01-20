"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteMedicineCategory = async (id: number) => {
    try {
        await prisma.phm_medicinecategory.update({
            where: {
                MedicineCategoryID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/phm/medicinecategory");
    } catch (error) {
        console.error("Error deleting medicine category:", error);
    }
};

export default deleteMedicineCategory;
