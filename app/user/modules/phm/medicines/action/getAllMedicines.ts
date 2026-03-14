"use server";

import { prisma } from "@/lib/prisma";

export async function getAllMedicines() {
    const data = await prisma.phm_medicine.findMany({
        where: {
            IsDeleted: false,
        },
        include: {
            phm_medicinecategory: true,
        },
        orderBy: {
            MedicineName: 'asc',
        },
    });

    // Serialize Decimal fields properly
    return JSON.parse(JSON.stringify(data));
}
