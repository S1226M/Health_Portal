"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editSpecialization(formData: FormData) {
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
  const rawId = formData.get("SpecializationID");
  const specId = parseInt(rawId as string);

  if (isNaN(specId)) {
    throw new Error("Invalid Specialization ID");
  }

  const saveObj = {
    SpecializationName: formData.get("SpecializationName") as string,
    Description: formData.get("Description") as string,
  };

  await prisma.hop_specialization.update({
    where: {
      SpecializationID: specId,
    },
    data: {
      ...saveObj,
      ModifiedByUserID: currentUserId,
      Modified: new Date(),
    },
  });

  const editData = {
    SpecializationID: specId,
    IUD: "U",
    Created: new Date(),
    CreatedByUserID: currentUserId,
  };

  await prisma.hop_log_specialization.create({ data: editData });

  revalidatePath("/admin/components/hop/specialization");
  redirect("/admin/components/hop/specialization");
}
