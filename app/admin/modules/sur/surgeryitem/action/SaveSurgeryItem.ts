"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveSurgeryItem(formData: FormData) {
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
  const ItemName = formData.get("ItemName") as string;
  const LabTestID = parseInt(formData.get("LabTestID") as string);
  const SurgeryID = parseInt(formData.get("SurgeryID") as string);

  await prisma.sur_surgeryitem.create({
    data: {
      // ItemName, // Field does not exist in schema
      // SurgeryID: SurgeryID || null, // Field does not exist in schema
      Description: ItemName, // Assuming ItemName maps to Description
      SurgeryBookingID: 1, // Defaulting to 1 as placeholder 
      Amount: 0, // Defaulting to 0 as placeholder
      LabTestID: LabTestID || null,
      CreatedByUserID: currentUserId,
      IsDeleted: false,
    },
  });

  revalidatePath("/admin/components/sur/surgeryitem");
  redirect("/admin/components/sur/surgeryitem");
}
