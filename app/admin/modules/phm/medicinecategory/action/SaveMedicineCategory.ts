"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveMedicineCategory(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId?: number;
    UserID?: number;
    role?: string;
  };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
  const CategoryName = formData.get("CategoryName") as string;

  await prisma.phm_medicinecategory.create({
    data: {
      CategoryName,
      CreatedByUserID: currentUserId,
      IsDeleted: false,
    },
  });

  revalidatePath("/admin/components/phm/medicinecategory");
  redirect("/admin/components/phm/medicinecategory");
}
