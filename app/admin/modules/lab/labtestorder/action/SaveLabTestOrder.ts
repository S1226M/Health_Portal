"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveLabTestOrder(formData: FormData) {
    const LabTestTypeID = parseInt(formData.get("LabTestTypeID") as string);
    const PatientID = parseInt(formData.get("PatientID") as string);

    // Convert checkbox "on" to boolean true, otherwise false
    // If IsDeleted is in the form (unlikely for create) but good to be safe if copied
    const IsDeleted = formData.get("IsDeleted") === "on";

    await prisma.lab_labtestorder.create({
        data: {
            LabTestTypeID,
            PatientID,
            CreatedByUserID: 1, // Default user
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/lab/labtestorder");
    redirect("/admin/components/lab/labtestorder");
}
