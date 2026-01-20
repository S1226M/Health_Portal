"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveLabTest(formData: FormData) {
    const TestName = formData.get("TestName") as string;
    const TestCode = formData.get("TestCode") as string;
    const Price = parseFloat(formData.get("Price") as string);

    await prisma.lab_labtest.create({
        data: {
            TestName,
            TestCode,
            Price,
            CreatedByUserID: 1,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/lab/labtest");
    redirect("/admin/components/lab/labtest");
}
