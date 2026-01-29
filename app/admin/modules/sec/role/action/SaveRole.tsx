"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveRole(formData: FormData) {
    const RoleName = formData.get("RoleName") as string;
    const Description = formData.get("Description") as string;

    const currentUserId = 4; // Hardcoded as seen in example

    const data = {
        RoleName,
        Description,
        Created: new Date(),
        Modified: new Date(),
        CreatedByUserID: currentUserId,
        IsDeleted: false,
    };

    const addedData = await prisma.sec_role.create({ data });

    const addedID = addedData.RoleID;

    // Logging
    const logData = {
        RoleID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.sec_log_role.create({ data: logData });

    revalidatePath("/admin/components/sec/role");
    redirect("/admin/components/sec/role");
}
