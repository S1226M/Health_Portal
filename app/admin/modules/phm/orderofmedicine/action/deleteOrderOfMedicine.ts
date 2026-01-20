"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteOrderOfMedicine = async (id: number) => {
    try {
        await prisma.phm_orderofmedicine.update({
            where: {
                OrderOfMedicineID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/phm/orderofmedicine");
    } catch (error) {
        console.error("Error deleting order of medicine:", error);
    }
};

export default deleteOrderOfMedicine;
