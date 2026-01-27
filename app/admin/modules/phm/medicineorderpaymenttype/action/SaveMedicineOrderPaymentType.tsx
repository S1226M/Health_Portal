"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveMedicineOrderPaymentType(formData: FormData) {
    const MedicineOrderPaymentTypeName = formData.get("MedicineOrderPaymentTypeName") as string;

    await prisma.phm_medicineorderpaymenttype.create({
        data: {
            MedicineOrderPaymentTypeName,
            CreatedByUserID: 4,
            IsDeleted: false,
        }
    });
    revalidatePath("/admin/components/phm/medicineorderpaymenttype");
    redirect("/admin/components/phm/medicineorderpaymenttype");
}
