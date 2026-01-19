"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editTreatmentType(formData: FormData) {
    const treatmentTypeID = formData.get("TreatmentTypeID") as string;
    const treatmentTypeName = formData.get("TreatmentTypeName") as string;
    const treatmentTypeShortName = formData.get("TreatmentTypeShortName") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const id = parseInt(treatmentTypeID);

    await prisma.hop_treatmenttype.update({
        where: { TreatmentTypeID: id },
        data: {
            TreatmentTypeName: treatmentTypeName,
            TreatmentTypeShortName: treatmentTypeShortName,
            Description: description,
            UserID: parseInt(userID),
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        TreatmentTypeID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_treatmenttype.create({ data: editData });

    revalidatePath("/admin/components/hop/treatmenttype");
    redirect("/admin/components/hop/treatmenttype");
}
