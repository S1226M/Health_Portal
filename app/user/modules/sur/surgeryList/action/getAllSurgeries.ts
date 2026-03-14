"use server";

import { prisma } from "@/lib/prisma";

export async function getAllSurgeries() {
    const data = await prisma.sur_surgery.findMany({
        where: {
            IsDeleted: false,
            IsActive: true,
        },
        include: {
            hop_hospital: true,
        },
        orderBy: {
            SurgeryName: "asc",
        },
    });
    return JSON.parse(JSON.stringify(data));
}
