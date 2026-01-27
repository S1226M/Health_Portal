"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editLabTestType(formData: FormData) {
    const LabTestTypeID = parseInt(formData.get("LabTestTypeID") as string);
    const LabTestTypeName = formData.get("LabTestTypeName") as string;

    await prisma.lab_labtesttype.update({
        where: { LabTestTypeID },
        data: {
            LabTestTypeName,
            ModifiedByUserID: 4,
        }
    });

    revalidatePath("/admin/components/lab/labtesttype");
    redirect("/admin/components/lab/labtesttype");
}
