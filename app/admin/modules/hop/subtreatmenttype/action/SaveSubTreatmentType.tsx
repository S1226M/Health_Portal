"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveSubTreatmentType(formData: FormData) {
    const subTreatmentTypeName = formData.get("SubTreatmentTypeName") as string;
    const treatmentTypeID = formData.get("TreatmentTypeID") as string;
    const rate = formData.get("Rate") as string;
    const isActive = formData.get("IsActive") === 'on';
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const data = {
        SubTreatmentTypeName: subTreatmentTypeName,
        TreatmentTypeID: parseInt(treatmentTypeID),
        Rate: parseFloat(rate),
        IsActive: isActive,
        Description: description,
        UserID: parseInt(userID),
        Created: new Date(),
        CreatedByUserID: currentUserId,
        Modified: new Date(),
    };

    const addedData = await prisma.hop_subtreatmenttype.create({ data });

    const addedID = addedData.SubTreatmentTypeID;
    const newData = {
        SubTreatmentTypeID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_subtreatmenttype.create({ data: newData });

    revalidatePath("/admin/components/hop/subtreatmenttype");
    redirect("/admin/components/hop/subtreatmenttype");
}
