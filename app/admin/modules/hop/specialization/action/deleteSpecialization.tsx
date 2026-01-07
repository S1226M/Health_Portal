"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteSpecialization(id: number) {
    try {
        await prisma.hop_specialization.delete({
            where: { 
                SpecializationID: id 
            }
        });
        revalidatePath('/admin/components/hop/specialization');
    } catch (error) {
        console.error("Delete Error:", error);
        throw new Error("Could not delete specialization");
    }
}