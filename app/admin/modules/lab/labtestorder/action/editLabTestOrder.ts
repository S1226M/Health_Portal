"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editLabTestOrder(formData: FormData) {
    const LabTestOrderID = parseInt(formData.get("LabTestOrderID") as string);
    const LabTestTypeID = parseInt(formData.get("LabTestTypeID") as string);
    const PatientID = parseInt(formData.get("PatientID") as string);

    await prisma.lab_labtestorder.update({
        where: { LabTestOrderID },
        data: {
            LabTestTypeID,
            PatientID,
            ModifiedByUserID: 1, // Default user
        }
    });

    revalidatePath("/admin/components/lab/labtestorder");
    redirect("/admin/components/lab/labtestorder");
}
