"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteMedicine = async (id: number) => {
    try {
        await prisma.phm_medicine.update({
            where: {
                MedicineID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/phm/medicine");
    } catch (error) {
        console.error("Error deleting medicine:", error);
    }
};

export default deleteMedicine;
