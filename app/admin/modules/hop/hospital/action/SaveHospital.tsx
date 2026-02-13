"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveHospital(formData: FormData) {
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
  // 1. Extract values safely
  const hospitalName = formData.get("HospitalName") as string;
  const defaultPaymentModeID = formData.get("DefaultPaymentModeID") as string;
  const registrationCharge = formData.get("RegistrationCharge") as string;
  const openingDate = formData.get("OpeningDate") as string;
  const address = formData.get("Address") as string;
  const cityID = formData.get("CityID") as string;
  const userID = formData.get("UserID") as string;

  // 2. Format data for Prisma (Prevents NaN and Invalid Date errors)
  const data = {
    HospitalName: hospitalName,
    DefaultPaymentModeID: defaultPaymentModeID
      ? parseInt(defaultPaymentModeID)
      : null,
    RegistrationCharge: registrationCharge
      ? parseFloat(registrationCharge)
      : null,
    OpeningDate: openingDate ? new Date(openingDate) : new Date(),
    Address: address,
    CityID: cityID ? parseInt(cityID) : null,
    UserID: userID ? parseInt(userID) : currentUserId,
    Created: new Date(),
    CreatedByUserID: currentUserId,
    Modified: new Date(),
  };

  try {
    // 3. Execute as a Transaction (Main record + Log)
    await prisma.$transaction(async (tx) => {
      const addedHospital = await tx.hop_hospital.create({ data });

      await tx.hop_log_hospital.create({
        data: {
          HospitalID: addedHospital.HospitalID,
          IUD: "I",
          Created: new Date(),
          CreatedByUserID: currentUserId,
        },
      });
    });
  } catch (error) {
    console.error("Failed to save hospital:", error);
    throw new Error("Database operation failed");
  }

  // 4. Revalidate cache and return to list
  revalidatePath("/admin/components/hop/hospital");
  redirect("/admin/components/hop/hospital");
}
