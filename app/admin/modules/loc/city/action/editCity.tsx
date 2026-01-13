"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function editCity(formData: FormData){
    const rowId = formData.get('CityID');
    const cityId = parseInt(rowId as string);

    if(isNaN(cityId)) throw new Error("Invalid City ID");

    const currentUserId = 4;

    await prisma.loc_city.update({
        where: {
            CityID: cityId
        },
        data: {
            CityName: formData.get('CityName') as string,
            StateID: parseInt(formData.get('StateID') as string),
            PinCode: formData.get('PinCode') as string,
            ModifiedByUserID: currentUserId,
            Modified: new Date()
        }
    });

    const editData = {
        CityID: cityId,
        IUD: 'U',
        Created: new Date(),
        CreatedByUserID: currentUserId
    };

    await prisma.loc_log_city.create({ data: editData });

    revalidatePath('/admin/components/loc/city');
    redirect('/admin/components/loc/city');
}