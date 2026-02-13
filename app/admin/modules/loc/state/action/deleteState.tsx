"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function deleteState(id: number) {
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
  await prisma.loc_state.update({
    where: { StateID: id },
    data: { IsDeleted: true },
  });

  const deleteData = {
    StateID: id,
    IUD: "D",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.loc_log_state.create({ data: deleteData });

  revalidatePath("/admin/components/loc/state");
}
