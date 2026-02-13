"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function SaveRole(formData: FormData) {
  const RoleName = formData.get("RoleName") as string;
  const Description = formData.get("Description") as string;

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

  // Validate unique RoleName
  const existingRole = await prisma.sec_role.findUnique({
    where: { RoleName },
  });
  if (existingRole) {
    throw new Error("A role with this name already exists");
  }

  const addedData = await prisma.sec_role.create({
    data: {
      RoleName,
      Description,
      Created: new Date(),
      Modified: new Date(),
      CreatedByUserID: currentUserId,
      IsDeleted: false,
    },
  });

  await prisma.sec_log_role.create({
    data: {
      RoleID: addedData.RoleID,
      IUD: "I",
      Created: new Date(),
      CreatedByUserID: currentUserId,
    },
  });

  revalidatePath("/admin/components/sec/role");
  redirect("/admin/components/sec/role");
}
