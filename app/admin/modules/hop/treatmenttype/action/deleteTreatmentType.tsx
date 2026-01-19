"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteTreatmentType(id: number) {

    await prisma.hop_treatmenttype.update({
        where: { TreatmentTypeID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        TreatmentTypeID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_treatmenttype.create({ data: deleteData });

    revalidatePath('/admin/components/hop/treatmenttype');
}
