"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editSpecialization(formData: FormData) {
    const rawId = formData.get('SpecializationID');
    const specId = parseInt(rawId as string);

    if (isNaN(specId)) {
        throw new Error("Invalid Specialization ID");
    }

    const saveObj = {
        SpecializationName: formData.get('SpecializationName') as string,
        Description: formData.get('Description') as string
    };

    await prisma.hop_specialization.update({
        where:{
            SpecializationID : specId
        },
        data: saveObj   
    });

    const editData = {
        SpecializationID: specId,
        IUD: 'U',
        Created: new Date(),
        CreatedByUserID: 4
    }

    await prisma.hop_log_specialization.create({ data: editData });

    const modifiedByUserID = {
        ModifiedByUserID: 4
    }

    await prisma.hop_specialization.update({
        where:{
            SpecializationID : specId
        },
        data: modifiedByUserID   
    });
    
    revalidatePath('/admin/components/hop/specialization');
    redirect('/admin/components/hop/specialization');
}