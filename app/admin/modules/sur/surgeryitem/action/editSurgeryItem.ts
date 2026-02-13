"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editSurgeryItem(formData: FormData) {
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
  const SurgeryItemID = parseInt(formData.get("SurgeryItemID") as string);
  const ItemName = formData.get("ItemName") as string;
  const LabTestID = parseInt(formData.get("LabTestID") as string);
  const SurgeryID = parseInt(formData.get("SurgeryID") as string);

  await prisma.sur_surgeryitem.update({
    where: { SurgeryItemID },
    data: {
      // ItemName, // Field does not exist in schema
      // SurgeryID: SurgeryID || null, // Field does not exist in schema
      Description: ItemName, // Assuming ItemName maps to Description
      LabTestID: LabTestID || null,
      ModifiedByUserID: currentUserId,
    },
  });

  revalidatePath("/admin/components/sur/surgeryitem");
  redirect("/admin/components/sur/surgeryitem");
}
