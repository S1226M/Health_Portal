"use server";
import { prisma } from '@/lib/prisma';
import { hop_log_specialization } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export async function SaveSpecialization(formData: FormData) {
    const specializationName = formData.get('SpecializationName') as string; 
    const description = formData.get('Description') as string;
    
    console.log(specializationName, description);
    const currentUserId = 4;
    const data= {
            SpecializationName: specializationName,
            Description: description,
            Created: new Date(),
            CreatedByUserID: currentUserId
        }
        console.log('Prepared Data:');
    console.log(data);

    const addedData = await prisma.hop_specialization.create({data});
    
    const addedID = addedData.SpecializationID;
    const newData = {
        SpecializationID: addedID,
        IUD:'I',
        Created : new Date(),
        CreatedByUserID: currentUserId
    }

    await prisma.hop_log_specialization.create({data:newData});

    revalidatePath('/admin/components/hop/specialization');
    redirect('/admin/components/hop/specialization');
}