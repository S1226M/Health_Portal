"use server"


import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function SaveCountry(formData: FormData) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const countryName = formData.get('CountryName') as string; 
    const countryCode = formData.get('CountryCode') as string;
    
    // Validate unique CountryName
    const existingCountry = await prisma.loc_country.findUnique({
      where: { CountryName: countryName }
    });
    if (existingCountry) {
      throw new Error("A country with this name already exists");
    }

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