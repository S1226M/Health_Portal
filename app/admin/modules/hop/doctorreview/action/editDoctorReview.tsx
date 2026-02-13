"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editDoctorReview(formData: FormData) {
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
  const doctorReviewID = formData.get("DoctorReviewID") as string;
  const doctorID = formData.get("DoctorID") as string;
  const patientID = formData.get("PatientID") as string;
  const rating = formData.get("Rating") as string;
  const reviewText = formData.get("ReviewText") as string;
  const id = parseInt(doctorReviewID);

  await prisma.hop_doctorreview.update({
    where: { DoctorReviewID: id },
    data: {
      DoctorID: parseInt(doctorID),
      PatientID: parseInt(patientID),
      Rating: parseInt(rating),
      ReviewText: reviewText,
      Modified: new Date(),
      ModifiedByUserID: currentUserId,
    },
  });

  const editData = {
    DoctorReviewID: id,
    IUD: "U",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.hop_log_doctorreview.create({ data: editData });

  revalidatePath("/admin/components/hop/doctorreview");
  redirect("/admin/components/hop/doctorreview");
}
