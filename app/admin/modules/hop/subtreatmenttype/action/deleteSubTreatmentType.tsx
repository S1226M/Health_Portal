"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteSubTreatmentType(id: number) {

    await prisma.hop_subtreatmenttype.update({
        where: { SubTreatmentTypeID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        SubTreatmentTypeID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_subtreatmenttype.create({ data: deleteData });

    revalidatePath('/admin/components/hop/subtreatmenttype');
}
