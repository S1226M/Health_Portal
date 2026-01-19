"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveTreatmentType(formData: FormData) {
    const treatmentTypeName = formData.get("TreatmentTypeName") as string;
    const treatmentTypeShortName = formData.get("TreatmentTypeShortName") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const data = {
        TreatmentTypeName: treatmentTypeName,
        TreatmentTypeShortName: treatmentTypeShortName,
        Description: description,
        UserID: parseInt(userID),
        Created: new Date(),
        CreatedByUserID: currentUserId,
        Modified: new Date(),
    };

    const addedData = await prisma.hop_treatmenttype.create({ data });

    const addedID = addedData.TreatmentTypeID;
    const newData = {
        TreatmentTypeID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_treatmenttype.create({ data: newData });

    revalidatePath("/admin/components/hop/treatmenttype");
    redirect("/admin/components/hop/treatmenttype");
}
