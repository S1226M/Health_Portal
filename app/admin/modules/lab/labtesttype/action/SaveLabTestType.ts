"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveLabTestType(formData: FormData) {
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
  const LabTestTypeName = formData.get("LabTestTypeName") as string;

  await prisma.lab_labtesttype.create({
    data: {
      LabTestTypeName,
      CreatedByUserID: currentUserId,
      IsDeleted: false,
    },
  });

  revalidatePath("/admin/components/lab/labtesttype");
  redirect("/admin/components/lab/labtesttype");
}
