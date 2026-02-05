"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerUser(formData: FormData) {
  const UserName = formData.get("UserName") as string;
  const FullName = formData.get("FullName") as string;
  const Password = formData.get("Password") as string;
  const Email = formData.get("Email") as string;
  const MobileNo = formData.get("MobileNumber") as string;

  const currentUserId = 6;

  const user = await prisma.sec_user.create({
    data: {
      UserName,
      FullName,
      Password,
      RoleID: currentUserId,
      Email,
      MobileNo,
      Created: new Date(),
      CreatedByUserID: currentUserId,
    },
  });

  await prisma.sec_log_user.create({
    data: {
      UserID: user.UserID,
      IUD: "I",
      Created: new Date(),
      CreatedByUserID: currentUserId,
    },
  });

  if(currentUserId === 6){
    revalidatePath("/user");
    redirect("/user");
  }
}
