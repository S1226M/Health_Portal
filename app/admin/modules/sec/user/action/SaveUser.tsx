"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveUser(formData: FormData) {
    const UserName = formData.get("UserName") as string;
    const FullName = formData.get("FullName") as string;
    const Password = formData.get("Password") as string;
    const RoleID = parseInt(formData.get("RoleID") as string);
    const Email = formData.get("Email") as string;
    const MobileNo = formData.get("MobileNo") as string;
    // Checkbox handling might vary, but simplified here. often "on" or null.
    // However, schema default is true. If form doesn't send it, might be false?
    // Let's assume FormContainer handles bools correctly or we might need to cast.
    // For now, simple text fields mostly. IsActive logic might need care if exposed.

    // For simple CRUD, usually IsActive is not in 'add' form or defaults to true.

    const currentUserId = 4;

    const data = {
        UserName,
        FullName,
        Password, // Storing plain text as per simple CRUD assumption
        RoleID,
        Email,
        MobileNo,
        IsActive: true,
        Created: new Date(),
        Modified: new Date(),
        CreatedByUserID: currentUserId,
        IsDeleted: false,
    };

    const addedData = await prisma.sec_user.create({ data });
    const addedID = addedData.UserID;

    const logData = {
        UserID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.sec_log_user.create({ data: logData });

    revalidatePath("/admin/components/sec/user");
    redirect("/admin/components/sec/user");
}
