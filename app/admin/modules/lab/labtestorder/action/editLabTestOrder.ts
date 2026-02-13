"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editLabTestOrder(formData: FormData) {
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
  const LabTestOrderID = parseInt(formData.get("LabTestOrderID") as string);
  const LabTestTypeID = parseInt(formData.get("LabTestTypeID") as string);
  const PatientID = parseInt(formData.get("PatientID") as string);

  await prisma.lab_labtestorder.update({
    where: { LabTestOrderID },
    data: {
      LabTestTypeID,
      PatientID,
      ModifiedByUserID: currentUserId, // Default user
    },
  });

  revalidatePath("/admin/components/lab/labtestorder");
  redirect("/admin/components/lab/labtestorder");
}
