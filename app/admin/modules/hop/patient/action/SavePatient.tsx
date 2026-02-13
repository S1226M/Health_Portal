"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SavePatient(formData: FormData) {
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
  const patientName = formData.get("PatientName") as string;
  const patientNo = formData.get("PatientNo") as string;
  const registrationDateTime = formData.get("RegistrationDateTime") as string;
  const age = formData.get("Age") as string;
  const bloodGroup = formData.get("BloodGroup") as string;
  const gender = formData.get("Gender") as string;
  const cityID = formData.get("CityID") as string;
  const mobileNo = formData.get("MobileNo") as string;
  const address = formData.get("Address") as string;
  const userID = formData.get("UserID") as string;

  const data = {
    PatientName: patientName,
    PatientNo: patientNo,
    RegistrationDateTime: new Date(registrationDateTime),
    Age: age ? parseInt(age) : null,
    BloodGroup: bloodGroup,
    Gender: gender,
    CityID: cityID ? parseInt(cityID) : null,
    MobileNo: mobileNo,
    Address: address,
    UserID: parseInt(userID),
    Created: new Date(),
    CreatedByUserID: currentUserId,
    Modified: new Date(),
  };

  const addedData = await prisma.hop_patient.create({ data });

  const addedID = addedData.PatientID;
  const newData = {
    PatientID: addedID,
    IUD: "I",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };
  await prisma.hop_log_patient.create({ data: newData });

  revalidatePath("/admin/components/hop/patient");
  redirect("/admin/components/hop/patient");
}
