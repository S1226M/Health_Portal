"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveOrderOfMedicine(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const MedicineID = parseInt(formData.get("MedicineID") as string);
    const MedicineOrderPaymentTypeID = parseInt(formData.get("MedicineOrderPaymentTypeID") as string);
    const Quantity = parseInt(formData.get("Quantity") as string);

    await prisma.phm_orderofmedicine.create({
        data: {
            MedicineID,
            MedicineOrderPaymentTypeID,
            Quantity,
            OrderDateTime: new Date(),
            CreatedByUserID: currentUserId,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/phm/orderofmedicine");
    redirect("/admin/components/phm/orderofmedicine");
}
