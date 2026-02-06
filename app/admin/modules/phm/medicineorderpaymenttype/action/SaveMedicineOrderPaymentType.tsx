"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveMedicineOrderPaymentType(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const MedicineOrderPaymentTypeName = formData.get("MedicineOrderPaymentTypeName") as string;

    await prisma.phm_medicineorderpaymenttype.create({
        data: {
            MedicineOrderPaymentTypeName,
            CreatedByUserID: currentUserId,
            IsDeleted: false,
        }
    });
    revalidatePath("/admin/components/phm/medicineorderpaymenttype");
    redirect("/admin/components/phm/medicineorderpaymenttype");
}
