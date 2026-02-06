"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editMedicineCategory(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const MedicineCategoryID = parseInt(formData.get("MedicineCategoryID") as string);
    const CategoryName = formData.get("CategoryName") as string;

    await prisma.phm_medicinecategory.update({
        where: { MedicineCategoryID },
        data: {
            CategoryName,
            ModifiedByUserID: currentUserId,
        }
    });

    revalidatePath("/admin/components/phm/medicinecategory");
    redirect("/admin/components/phm/medicinecategory");
}
