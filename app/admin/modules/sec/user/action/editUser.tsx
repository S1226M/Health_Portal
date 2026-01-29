"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EditUser(formData: FormData) {
    const userID = parseInt(formData.get("UserID") as string);
    const UserName = formData.get("UserName") as string;
    const FullName = formData.get("FullName") as string;
    const Password = formData.get("Password") as string;
    const RoleID = parseInt(formData.get("RoleID") as string);
    const Email = formData.get("Email") as string;
    const MobileNo = formData.get("MobileNo") as string;

    // IsActive? Often not in edit form for simple CRUD unless requested.
    // Assuming we keep existing IsActive or update if provided.
    // If not in form, it might be lost if we just overwrite.
    // But update method only updates modified fields if we form the object correctly.
    // Here we are constructing the whole object.

    // Let's assume IsActive is not changeable here or we fetch it?
    // Safer to just update the fields we have.

    const currentUserId = 4;

    const data = {
        UserName,
        FullName,
        Password,
        RoleID,
        Email,
        MobileNo,
        Modified: new Date(),
        ModifiedByUserID: currentUserId,
    };

    await prisma.sec_user.update({
        where: { UserID: userID },
        data: data
    });

    const logData = {
        UserID: userID,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.sec_log_user.create({ data: logData });

    revalidatePath("/admin/components/sec/user");
    redirect("/admin/components/sec/user");
}
