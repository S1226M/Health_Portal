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
  const email = formData.get("Email") as string;
  const password = formData.get("Password") as string;

  let finalUserID = parseInt(userID);

  if (isNaN(finalUserID)) {
    // If no UserID is provided, check if a sec_user with this email already exists
    const existingUser = await prisma.sec_user.findFirst({
      where: { Email: email },
    });

    const doctorRole = await prisma.sec_role.findFirst({
      where: { RoleName: "Doctor" },
      select: { RoleID: true },
    });

    if (existingUser) {
      // User exists, just use their ID and make sure they are a doctor
      finalUserID = existingUser.UserID;
      
      // Optionally update their role to Doctor if they aren't already
      if (doctorRole && existingUser.RoleID !== doctorRole.RoleID) {
        await prisma.sec_user.update({
          where: { UserID: existingUser.UserID },
          data: { RoleID: doctorRole.RoleID },
        });
      }
    } else {
      // Create new user
      const newUser = await prisma.sec_user.create({
        data: {
          UserName: email.split("@")[0],
          Password: password,
          Email: email,
          FullName: doctorName,
          RoleID: doctorRole?.RoleID || 6,
          IsActive: true,
          Created: new Date(),
          CreatedByUserID: currentUserId,
          Modified: new Date(),
        },
      });
      finalUserID = newUser.UserID;
    }
  }

  const data = {
    DoctorName: doctorName,
    HospitalID: parseInt(hospitalID),
    SpecializationID: specializationID ? parseInt(specializationID) : null,
    Description: description,
    UserID: finalUserID,
    Email: email,
    Password: password,
    Created: new Date(),
    CreatedByUserID: currentUserId,
    Modified: new Date(),
  };

  const addedData = await prisma.hop_doctor.create({ data });

  const addedID = addedData.DoctorID;

  // AUTO-SEED: Generate default slots for the new doctor
  try {
    const { seedDoctorSlots } = await import("@/app/user/modules/hop/appointment/action/seedDoctorSlots");
    await seedDoctorSlots(addedID);
  } catch (error) {
    console.error("Failed to seed slots for new doctor:", error);
  }

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
