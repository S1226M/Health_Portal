"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SaveCountry(formData: FormData) {
    const countryName = formData.get('CountryName') as string; 
    const countryCode = formData.get('CountryCode') as string;

    const currentUserId = 4;
    const data= {
            CountryName: countryName,
            CountryCode: countryCode,
            Created: new Date(),
            CreatedByUserID: currentUserId
        }
    const addedData = await prisma.loc_country.create({data});

    const addedID = addedData.CountryID;
    const newData = {
        CountryID: addedID,
        IUD:'I',
        Created : new Date(),
        CreatedByUserID: currentUserId
    }
    await prisma.loc_log_country.create({data:newData});

    revalidatePath('/admin/components/loc/country');
    redirect('/admin/components/loc/country');
}