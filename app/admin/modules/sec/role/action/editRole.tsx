"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EditRole(formData: FormData) {
    const roleID = parseInt(formData.get("RoleID") as string);
    const roleName = formData.get("RoleName") as string;
    const description = formData.get("Description") as string;

    const currentUserId = 4;

    const data = {
        RoleName: roleName,
        Description: description,
        Modified: new Date(),
        ModifiedByUserID: currentUserId,
    };

    await prisma.sec_role.update({
        where: { RoleID: roleID },
        data: data
    });

    const logData = {
        RoleID: roleID,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.sec_log_role.create({ data: logData });

    revalidatePath("/admin/components/sec/role");
    redirect("/admin/components/sec/role");
}
