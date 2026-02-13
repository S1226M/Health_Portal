"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveDoctor(formData: FormData) {
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
  const doctorName = formData.get("DoctorName") as string;
  const hospitalID = formData.get("HospitalID") as string;
  const specializationID = formData.get("SpecializationID") as string;
  const description = formData.get("Description") as string;
  const userID = formData.get("UserID") as string;

  const data = {
    DoctorName: doctorName,
    HospitalID: parseInt(hospitalID),
    SpecializationID: specializationID ? parseInt(specializationID) : null,
    Description: description,
    UserID: parseInt(userID),
    Created: new Date(),
    CreatedByUserID: currentUserId,
    Modified: new Date(),
  };

  const addedData = await prisma.hop_doctor.create({ data });

  const addedID = addedData.DoctorID;
  const newData = {
    DoctorID: addedID,
    IUD: "I",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };
  await prisma.hop_log_doctor.create({ data: newData });

  revalidatePath("/admin/components/hop/doctor");
  redirect("/admin/components/hop/doctor");
}
