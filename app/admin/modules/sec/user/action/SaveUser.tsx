"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveUser(formData: FormData) {
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
  const UserName = formData.get("UserName") as string;
  const FullName = formData.get("FullName") as string;
  const Password = formData.get("Password") as string;
  const RoleID = parseInt(formData.get("RoleID") as string);
  const Email = formData.get("Email") as string;
  const MobileNo = formData.get("MobileNo") as string;
  const ProfileURL = formData.get("ProfileURL") as string;

  // Validate unique UserName
  const existingUser = await prisma.sec_user.findUnique({
    where: { UserName },
  });
  if (existingUser) {
    throw new Error("A user with this username already exists");
  }

  const data = {
    UserName,
    FullName,
    Password,
    RoleID,
    Email,
    MobileNo,
    ProfileURL,
    IsActive: true,
    Created: new Date(),
    Modified: new Date(),
    CreatedByUserID: currentUserId,
    IsDeleted: false,
  };

  const addedData = await prisma.sec_user.create({ data });
  const addedID = addedData.UserID;

  const logData = {
    UserID: addedID,
    IUD: "I",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.sec_log_user.create({ data: logData });

  revalidatePath("/admin/components/sec/user");
  redirect("/admin/components/sec/user");
}
