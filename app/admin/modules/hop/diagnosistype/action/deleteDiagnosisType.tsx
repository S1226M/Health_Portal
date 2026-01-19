"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteDiagnosisType(id: number) {

    await prisma.hop_diagnosistype.update({
        where: { DiagnosisTypeID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        DiagnosisTypeID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_diagnosistype.create({ data: deleteData });

    revalidatePath('/admin/components/hop/diagnosistype');
}
