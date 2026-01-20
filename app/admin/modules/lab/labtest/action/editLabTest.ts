"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editLabTest(formData: FormData) {
    const LabTestID = parseInt(formData.get("LabTestID") as string);
    const TestName = formData.get("TestName") as string;
    const TestCode = formData.get("TestCode") as string;
    const Price = parseFloat(formData.get("Price") as string);

    await prisma.lab_labtest.update({
        where: { LabTestID },
        data: {
            TestName,
            TestCode,
            Price,
            ModifiedByUserID: 1,
        }
    });

    revalidatePath("/admin/components/lab/labtest");
    redirect("/admin/components/lab/labtest");
}
