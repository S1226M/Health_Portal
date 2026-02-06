"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function SaveLabTest(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const TestName = formData.get("TestName") as string;
    const TestCode = formData.get("TestCode") as string;
    const Price = parseFloat(formData.get("Price") as string);

    await prisma.lab_labtest.create({
        data: {
            TestName,
            TestCode,
            Price,
            CreatedByUserID: currentUserId,
            IsDeleted: false,
        }
    });

    revalidatePath("/admin/components/lab/labtest");
    redirect("/admin/components/lab/labtest");
}
