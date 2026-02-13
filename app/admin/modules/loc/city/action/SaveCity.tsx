"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveCity(formData: FormData) {
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
  const cityName = formData.get("CityName") as string;
  const stateID = formData.get("StateID") as string;
  const pincode = formData.get("PinCode") as string;
  const data = {
    CityName: cityName,
    StateID: parseInt(stateID),
    PinCode: pincode,
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };
  const addedData = await prisma.loc_city.create({ data });

  const addedID = addedData.CityID;
  const newData = {
    CityID: addedID,
    IUD: "I",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };
  await prisma.loc_log_city.create({ data: newData });

  revalidatePath("/admin/components/loc/city");
  redirect("/admin/components/loc/city");
}
