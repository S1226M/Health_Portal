"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function editCity(formData: FormData){
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId?: number; UserID?: number; role?: string; };
  const currentUserId = (decoded.userId ?? decoded.UserID) as number;
  if (!currentUserId) {
    throw new Error("Unauthorized");
  }
    const rowId = formData.get('CityID');
    const cityId = parseInt(rowId as string);

    if(isNaN(cityId)) throw new Error("Invalid City ID");    await prisma.loc_city.update({
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