"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editMedicine(formData: FormData) {
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
    const MedicineName = formData.get("MedicineName") as string;
    const MedicineCategoryID = parseInt(formData.get("MedicineCategoryID") as string);
    const Price = parseFloat(formData.get("Price") as string);
    const Manufacturer = formData.get("Manufacturer") as string;

    await prisma.phm_medicine.update({
        where: { MedicineID },
        data: {
            MedicineName,
            MedicineCategoryID,
            Price,
            Manufacturer,
            ModifiedByUserID: currentUserId,
        }
    });

    revalidatePath("/admin/components/phm/medicine");
    redirect("/admin/components/phm/medicine");
}
