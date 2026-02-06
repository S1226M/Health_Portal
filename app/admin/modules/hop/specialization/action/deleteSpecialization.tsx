"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function deleteSpecialization(id: number) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    // try {
    //     await prisma.hop_specialization.delete({
    //         where: { 
    //             SpecializationID: id 
    //         }
    //     });
    //     revalidatePath('/admin/components/hop/specialization');
    // } catch (error) {
    //     console.error("Delete Error:", error);
    //     throw new Error("Could not delete specialization");
    // }

    await prisma.hop_specialization.update({
        where: { SpecializationID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        SpecializationID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: currentUserId
    }

    await prisma.hop_log_specialization.create({ data: deleteData });

    revalidatePath('/admin/components/hop/specialization');
}