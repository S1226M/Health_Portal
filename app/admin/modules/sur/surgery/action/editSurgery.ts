"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editSurgery(formData: FormData) {
    const SurgeryID = parseInt(formData.get("SurgeryID") as string);
    const SurgeryName = formData.get("SurgeryName") as string;
    const SurgeryCode = formData.get("SurgeryCode") as string;
    const SurgeryCost = parseFloat(formData.get("SurgeryCost") as string);

    await prisma.sur_surgery.update({
        where: { SurgeryID },
        data: {
            SurgeryName,
            SurgeryCode,
            SurgeryCost,
            ModifiedByUserID: 1,
        }
    });

    revalidatePath("/admin/components/sur/surgery");
    redirect("/admin/components/sur/surgery");
}
