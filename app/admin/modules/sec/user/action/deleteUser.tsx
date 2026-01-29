"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteUser(id: number) {
    const currentUserId = 4;

    await prisma.sec_user.update({
        where: { UserID: id },
        data: {
            IsDeleted: true,
            Modified: new Date(),
            ModifiedByUserID: currentUserId
        }
    });

    const logData = {
        UserID: id,
        IUD: "D",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.sec_log_user.create({ data: logData });

    revalidatePath("/admin/components/sec/user");
}
