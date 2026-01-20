"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteLabTest = async (id: number) => {
    try {
        await prisma.lab_labtest.update({
            where: {
                LabTestID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/lab/labtest");
    } catch (error) {
        console.error("Error deleting lab test:", error);
    }
};

export default deleteLabTest;
