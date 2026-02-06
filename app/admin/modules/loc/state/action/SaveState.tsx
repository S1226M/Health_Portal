"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveState(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const stateName = formData.get("StateName") as string;
    const countryID = formData.get("CountryID") as string;    const data = {
        StateName: stateName,
        CountryID: parseInt(countryID),
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    const addedData = await prisma.loc_state.create({ data });

    const addedID = addedData.StateID;
    const newData = {
        StateID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.loc_log_state.create({ data: newData });

    revalidatePath("/admin/components/loc/state");
    redirect("/admin/components/loc/state");
}