"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editCountry(formData: FormData) {
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
  const rawId = formData.get("CountryID");
  const countryId = parseInt(rawId as string);

  if (isNaN(countryId)) {
    throw new Error("Invalid Country ID");
  }

  const countryName = formData.get("CountryName") as string;
  const countryCode = formData.get("CountryCode") as string;

  // Validate unique CountryName if changing
  const currentCountry = await prisma.loc_country.findUnique({
    where: { CountryID: countryId },
  });
  if (currentCountry && currentCountry.CountryName !== countryName) {
    const existingCountry = await prisma.loc_country.findUnique({
      where: { CountryName: countryName },
    });
    if (existingCountry) {
      throw new Error("A country with this name already exists");
    }
  }

  await prisma.loc_country.update({
    where: {
      CountryID: countryId,
    },
    data: {
      CountryName: countryName,
      CountryCode: countryCode,
      ModifiedByUserID: currentUserId,
      Modified: new Date(),
    },
  });

  const editData = {
    CountryID: countryId,
    IUD: "U",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.loc_log_country.create({ data: editData });

  revalidatePath("/admin/components/loc/country");
  redirect("/admin/components/loc/country");
}
