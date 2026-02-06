"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function EditRole(formData: FormData) {
    const roleID = parseInt(formData.get("RoleID") as string);
    const roleName = formData.get("RoleName") as string;
    const description = formData.get("Description") as string;

    const token = (await cookies()).get("auth_token")?.value;
      if (!token) {
        throw new Error("Unauthorized");
      }
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const data = {
        RoleName: roleName,
        Description: description,
        Modified: new Date(),
        ModifiedByUserID: currentUserId,
    };
    
    // Validate unique RoleName if changing
    const currentRole = await prisma.sec_role.findUnique({
      where: { RoleID: roleID }
    });
    if (currentRole && currentRole.RoleName !== roleName) {
      const existingRole = await prisma.sec_role.findUnique({
        where: { RoleName: roleName }
      });
      if (existingRole) {
        throw new Error("A role with this name already exists");
      }
    }

    await prisma.sec_role.update({
        where: { RoleID: roleID },
        data: data
    });

    const logData = {
        RoleID: roleID,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.sec_log_role.create({ data: logData });

    revalidatePath("/admin/components/sec/role");
    redirect("/admin/components/sec/role");
}
