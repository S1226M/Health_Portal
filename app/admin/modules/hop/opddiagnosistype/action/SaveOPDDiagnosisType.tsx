"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveOPDDiagnosisType(formData: FormData) {
    const opdID = formData.get("OPDID") as string;
    const diagnosisTypeID = formData.get("DiagnosisTypeID") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const data = {
        OPDID: parseInt(opdID),
        DiagnosisTypeID: parseInt(diagnosisTypeID),
        Description: description,
        UserID: parseInt(userID),
        Created: new Date(),
        CreatedByUserID: currentUserId,
        Modified: new Date(),
    };

    const addedData = await prisma.hop_opddiagnosistype.create({ data });

    const addedID = addedData.OPDDiagnosisTypeID;
    const newData = {
        OPDDiagnosisTypeID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.hop_log_opddiagnosistype.create({ data: newData });

    revalidatePath("/admin/components/hop/opddiagnosistype");
    redirect("/admin/components/hop/opddiagnosistype");
}
