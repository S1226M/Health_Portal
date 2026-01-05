"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function SaveSpecialization(formData: FormData) {
    const specializationName = formData.get('name') as string;
    const description = formData.get('description') as string;
    
    console.log(specializationName, description);
    const currentUserId = 4;

    const data= {
            SpecializationName: specializationName,
            Description: description,
            Created: new Date(),
            // Modified: new Date(),
            // IsDeleted: false,
            CreatedByUserID: currentUserId,
        }

    await prisma.hop_specialization.create({
        data
    });

    revalidatePath('/admin/components/hop/specialization');
    redirect('/admin/components/hop/specialization');
}