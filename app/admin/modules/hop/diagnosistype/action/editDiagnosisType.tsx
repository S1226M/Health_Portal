"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editDiagnosisType(formData: FormData) {
    const diagnosisTypeID = formData.get("DiagnosisTypeID") as string;
    const diagnosisTypeName = formData.get("DiagnosisTypeName") as string;
    const diagnosisTypeShortName = formData.get("DiagnosisTypeShortName") as string;
    const isActive = formData.get("IsActive") === 'on';
    const hospitalID = formData.get("HospitalID") as string;
    const description = formData.get("Description") as string;
    const userID = formData.get("UserID") as string;

    const currentUserId = 4;
    const id = parseInt(diagnosisTypeID);

    await prisma.hop_diagnosistype.update({
        where: { DiagnosisTypeID: id },
        data: {
            DiagnosisTypeName: diagnosisTypeName,
            DiagnosisTypeShortName: diagnosisTypeShortName,
            IsActive: isActive,
            HospitalID: parseInt(hospitalID),
            Description: description,
            UserID: parseInt(userID),
            Modified: new Date(),
            ModifiedByUserID: currentUserId,
        },
    });

    const editData = {
        DiagnosisTypeID: id,
        IUD: "U",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };

    await prisma.hop_log_diagnosistype.create({ data: editData });

    revalidatePath("/admin/components/hop/diagnosistype");
    redirect("/admin/components/hop/diagnosistype");
}
