"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editState(formData: FormData) {
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
  const rowId = formData.get("StateID");
  const stateId = parseInt(rowId as string);

  if (isNaN(stateId)) throw new Error("Invalid State ID");

  await prisma.loc_state.update({
    where: { StateID: stateId },
    data: {
      StateName: formData.get("StateName") as string,
      CountryID: parseInt(formData.get("CountryID") as string),
      ModifiedByUserID: currentUserId,
      Modified: new Date(),
    },
  });

  // Logging the change
  await prisma.loc_log_state.create({
    data: {
      StateID: stateId,
      IUD: "U",
      Created: new Date(),
      CreatedByUserID: currentUserId,
    },
  });

  revalidatePath("/admin/components/loc/state");
  redirect("/admin/components/loc/state");
}
