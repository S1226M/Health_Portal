import React from "react";
import { getAllMedicines } from "@/app/user/modules/phm/medicines/action/getAllMedicines";
import { getAllMedicineCategories } from "@/app/user/modules/phm/medicines/action/getAllMedicineCategories";
import MedicineListClient from "./MedicineListClient";

export default async function MedicinesPage() {
    const [medicines, categories] = await Promise.all([
        getAllMedicines(),
        getAllMedicineCategories(),
    ]);

    return <MedicineListClient initialMedicines={medicines} categories={categories} />;
}
