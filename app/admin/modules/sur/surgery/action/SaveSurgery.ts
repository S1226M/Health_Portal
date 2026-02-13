"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveSurgery(formData: FormData) {
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
  const SurgeryName = formData.get("SurgeryName") as string;
  const SurgeryCode = formData.get("SurgeryCode") as string;
  const BasePrice = parseFloat((formData.get("BasePrice") as string) || "0");

  await prisma.sur_surgery.create({
    data: {
      SurgeryName,
      SurgeryCode,
      BasePrice,
      CreatedByUserID: currentUserId,
      IsDeleted: false,
    },
  });

  revalidatePath("/admin/components/sur/surgery");
  redirect("/admin/components/sur/surgery");
}
