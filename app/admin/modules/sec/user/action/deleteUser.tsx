"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function DeleteUser(id: number) {
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
  await prisma.sec_user.update({
    where: { UserID: id },
    data: {
      IsDeleted: true,
      Modified: new Date(),
      ModifiedByUserID: currentUserId,
    },
  });

  const logData = {
    UserID: id,
    IUD: "D",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.sec_log_user.create({ data: logData });

  revalidatePath("/admin/components/sec/user");
}
