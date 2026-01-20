"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveSurgery(formData: FormData) {
    const SurgeryName = formData.get("SurgeryName") as string;
    const SurgeryCode = formData.get("SurgeryCode") as string;
    const SurgeryCost = parseFloat(formData.get("SurgeryCost") as string);

    await prisma.sur_surgery.create({
        data: {
            SurgeryName,
            SurgeryCode,
            SurgeryCost,
            CreatedByUserID: 1,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/sur/surgery");
    redirect("/admin/components/sur/surgery");
}
