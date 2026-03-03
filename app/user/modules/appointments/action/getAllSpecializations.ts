"use server";

import { prisma } from "@/lib/prisma";

export async function getAllSpecializations() {
    const data = await prisma.hop_specialization.findMany({
        where: {
            IsDeleted: false,
            SpecializationName: { not: "" },
        },
        distinct: ['SpecializationName'],
    });
    return data;
}
