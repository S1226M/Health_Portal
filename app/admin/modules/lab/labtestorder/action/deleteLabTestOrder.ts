"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const deleteLabTestOrder = async (id: number) => {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) {
        throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
    const currentUserId = (decoded.userId ?? decoded.UserID) as number;
    if (!currentUserId) {
        throw new Error("Unauthorized");
    }
    
    await prisma.lab_labtestorder.update({
        where: {
            LabTestOrderID: id,
        },
        data: {
            IsDeleted: true,
        },
    });
    revalidatePath("/admin/components/lab/labtestorder");
};

export default deleteLabTestOrder;
