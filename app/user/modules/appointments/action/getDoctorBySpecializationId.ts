"use server";

import { prisma } from "@/lib/prisma";

export async function getDoctorBySpecializationId(specId: number) {
    const data = await prisma.hop_doctor.findMany({
        where: {
            IsDeleted: false,
            SpecializationID: specId,
        },
        include: {
            hop_hospital: true,
            hop_specialization: true,
        },
    });
    return data;
}
