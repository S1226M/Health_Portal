"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteRole(id: number) {
    const currentUserId = 4;

    await prisma.sec_role.update({
        where: { RoleID: id },
        data: {
            IsDeleted: true,
            Modified: new Date(),
            ModifiedByUserID: currentUserId
        }
    });

    const logData = {
        RoleID: id,
        IUD: "D",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.sec_log_role.create({ data: logData });

    revalidatePath("/admin/components/sec/role");
}
