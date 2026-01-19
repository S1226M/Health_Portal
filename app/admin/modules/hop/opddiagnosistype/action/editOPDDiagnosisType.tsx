"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editOPDDiagnosisType(formData: FormData) {
    const opdDiagnosisTypeID = formData.get("OPDDiagnosisTypeID") as string;
    const opdID = formData.get("OPDID") as string;
    const diagnosisTypeID = formData.get("DiagnosisTypeID") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const id = parseInt(opdDiagnosisTypeID);

    await prisma.hop_opddiagnosistype.update({
        where: { OPDDiagnosisTypeID: id },
        data: {
            OPDID: parseInt(opdID),
            DiagnosisTypeID: parseInt(diagnosisTypeID),
            Description: description,
            UserID: parseInt(userID),
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        OPDDiagnosisTypeID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_opddiagnosistype.create({ data: editData });

    revalidatePath("/admin/components/hop/opddiagnosistype");
    redirect("/admin/components/hop/opddiagnosistype");
}
