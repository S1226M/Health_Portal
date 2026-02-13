"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveLabTestOrder(formData: FormData) {
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
  const LabTestTypeID = parseInt(formData.get("LabTestTypeID") as string);
  const PatientID = parseInt(formData.get("PatientID") as string);

  // Convert checkbox "on" to boolean true, otherwise false
  // If IsDeleted is in the form (unlikely for create) but good to be safe if copied
  const IsDeleted = formData.get("IsDeleted") === "on";

  await prisma.lab_labtestorder.create({
    data: {
      LabTestTypeID,
      PatientID,
      CreatedByUserID: currentUserId, // Default user
      IsDeleted: false,
    },
  });

  revalidatePath("/admin/components/lab/labtestorder");
  redirect("/admin/components/lab/labtestorder");
}
