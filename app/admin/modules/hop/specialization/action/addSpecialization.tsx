"use server";

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addSpecialization(formData: FormData) {
    const specializationName = formData.get('Specialization Name') as string;
    const description = formData.get('Description') as string;
    const created = formData.get('Created') as string;

    const user = await prisma.sec_user.findFirst();

    if (!user) {
        throw new Error("No user found in the database. You must have a user to create a specialization.");
    }

    await prisma.hop_specialization.create({
        data: {
            SpecializationName: specializationName,
            Description: description,
            Created: created ? new Date(created) : new Date(),
            Modified: new Date(),
            CreatedByUserID: user.UserID,
            // ModifiedByUserID: user.UserID,
            IsDeleted: false,
        }
    });

    revalidatePath('/admin/hop/specialization');
    redirect('/admin/hop/specialization');
}