"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function deleteAppointment(id: number) {

    await prisma.hop_appointment.update({
        where: { AppointmentID: id },
        data: { IsDeleted: true }
    });

    const deleteData = {
        AppointmentID: id,
        IUD: 'D',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_appointment.create({ data: deleteData });

    revalidatePath('/admin/components/hop/appointment');
}
