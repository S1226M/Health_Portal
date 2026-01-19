"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteDoctorReview(id: number) {

    await prisma.hop_doctorreview.update({
        where: { DoctorReviewID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        DoctorReviewID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_doctorreview.create({ data: deleteData });

    revalidatePath('/admin/components/hop/doctorreview');
}
