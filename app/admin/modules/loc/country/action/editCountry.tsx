"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editCountry(formData: FormData) {
    const rawId = formData.get('CountryID');
    const countryId = parseInt(rawId as string);

    if (isNaN(countryId)) {
        throw new Error("Invalid Country ID");
    }

    const currentUserId = 4;

    await prisma.loc_country.update({
        where: {
            CountryID: countryId
        },
        data: {
            CountryName: formData.get('CountryName') as string,
            CountryCode: formData.get('CountryCode') as string,
            ModifiedByUserID: currentUserId,
            Modified: new Date(),
        }   
    });

    const editData = {
        CountryID: countryId,
        IUD: 'U',
        Created: new Date(),
        CreatedByUserID: currentUserId
    };

    await prisma.loc_log_country.create({ data: editData });

    revalidatePath('/admin/components/loc/country');
    redirect('/admin/components/loc/country');
}