"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteLabTestOrder = async (id: number) => {
    try {
        await prisma.lab_labtestorder.update({
            where: {
                LabTestOrderID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/lab/labtestorder");
    } catch (error) {
        console.error("Error deleting lab test order:", error);
    }
};

export default deleteLabTestOrder;
