"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteOPDDiagnosisType(id: number) {

    await prisma.hop_opddiagnosistype.update({
        where: { OPDDiagnosisTypeID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        OPDDiagnosisTypeID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_opddiagnosistype.create({ data: deleteData });

    revalidatePath('/admin/components/hop/opddiagnosistype');
}
