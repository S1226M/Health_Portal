"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteLabTestType = async (id: number) => {
    try {
        await prisma.lab_labtesttype.update({
            where: {
                LabTestTypeID: id,
            },
            data: {
                IsDeleted: true,
            },
        });
        revalidatePath("/admin/components/lab/labtesttype");
    } catch (error) {
        console.error("Error deleting lab test type:", error);
    }
};

export default deleteLabTestType;
