"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editHospital(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const hospitalID = formData.get("HospitalID") as string;
    const hospitalName = formData.get("HospitalName") as string;
    const defaultPaymentModeID = formData.get("DefaultPaymentModeID") as string;
    const registrationCharge = formData.get("RegistrationCharge") as string;
    const openingDate = formData.get("OpeningDate") as string;
    const address = formData.get("Address") as string;
    const cityID = formData.get("CityID") as string;
    const userID = formData.get("UserID") as string;    const id = parseInt(hospitalID);

    await prisma.hop_hospital.update({
        where: { HospitalID: id },
        data: {
            HospitalName: hospitalName,
            DefaultPaymentModeID: defaultPaymentModeID ? parseInt(defaultPaymentModeID) : null,
            RegistrationCharge: registrationCharge ? parseFloat(registrationCharge) : null,
            OpeningDate: new Date(openingDate),
            Address: address,
            CityID: cityID ? parseInt(cityID) : null,
            UserID: parseInt(userID),
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        HospitalID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_hospital.create({ data: editData });

    revalidatePath("/admin/components/hop/hospital");
    redirect("/admin/components/hop/hospital");
}
