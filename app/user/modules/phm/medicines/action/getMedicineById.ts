"use server";

import { prisma } from "@/lib/prisma";

export async function getMedicineById(medicineId: number) {
    const data = await prisma.phm_medicine.findUnique({
        where: {
            MedicineID: medicineId,
        },
        include: {
            phm_medicinecategory: true,
        },
    });

    if (!data) return null;

    return JSON.parse(JSON.stringify(data));
}
