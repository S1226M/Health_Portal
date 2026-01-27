"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveLabTestType(formData: FormData) {
    const LabTestTypeName = formData.get("LabTestTypeName") as string;

    await prisma.lab_labtesttype.create({
        data: {
            LabTestTypeName,
            CreatedByUserID: 4,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/lab/labtesttype");
    redirect("/admin/components/lab/labtesttype");
}
