"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function SaveSpecialization(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const specializationName = formData.get('SpecializationName') as string; 
    const description = formData.get('Description') as string;
    
    const data= {
            SpecializationName: specializationName,
            Description: description,
            Created: new Date(),
            CreatedByUserID: currentUserId
        }
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