"use server";

import { createToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const Email = formData.get("Email") as string;
  const UserEnterdPass = formData.get("Password") as string;

  if (!Email || !UserEnterdPass) {
    return { success: false, message: "Please enter email and password." };
  }

  const data = await prisma.sec_user.findFirst({
    where: {
      Email,
      IsDeleted: false,
      IsActive: true,
    },
    select: {
      RoleID: true,
      UserID: true,
      Password: true,
    },
  });

  if (!data) {
    return { success: false, message: "No account found with this email." };
  }

  if (UserEnterdPass !== data.Password) {
    return { success: false, message: "Invalid password. Please try again." };
  }

  const role = await prisma.sec_role.findFirst({
    where: {
      RoleID: data.RoleID,
    },
    select: {
      RoleName: true,
    },
  });

  const token = createToken({
    UserID: data.UserID,
    role: role?.RoleName,
  });

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  if (role?.RoleName === "Admin") {
    redirect("/admin");
  } else if (role?.RoleName === "Doctor") {
    redirect("/doctor");
  } else {
    // Patient or any other role goes to user homepage
    redirect("/user");
  }
}
