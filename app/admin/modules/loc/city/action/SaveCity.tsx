"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SaveCity(formData: FormData){
    const cityName = formData.get("CityName") as string;
    const stateID = formData.get("StateID") as string;
    const pincode = formData.get("PinCode") as string;

    const currentUserId = 4;
    const data = {
        CityName: cityName,
        StateID: parseInt(stateID),
        PinCode: pincode,
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    const addedData = await prisma.loc_city.create({ data });

    const addedID = addedData.CityID;
    const newData = {
        CityID: addedID,
        IUD: "I",
        Created: new Date(),
        CreatedByUserID: currentUserId,
    };
    await prisma.loc_log_city.create({ data: newData });

    revalidatePath("/admin/components/loc/city");
    redirect("/admin/components/loc/city");

}