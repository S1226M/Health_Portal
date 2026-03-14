import React from "react";
import { getMedicineById } from "@/app/user/modules/phm/medicines/action/getMedicineById";
import { getPaymentTypes } from "@/app/user/modules/phm/medicines/action/getPaymentTypes";
import { notFound } from "next/navigation";
import MedicineDetailClient from "./MedicineDetailClient";

export default async function MedicineDetailPage({ params }: { params: Promise<{ medicineId: string }> }) {
    const resolvedParams = await params;
    const medicineId = Number(resolvedParams.medicineId);

    if (isNaN(medicineId)) {
        notFound();
    }

    const [medicine, paymentTypes] = await Promise.all([
        getMedicineById(medicineId),
        getPaymentTypes(),
    ]);

    if (!medicine) {
        notFound();
    }

    return <MedicineDetailClient medicine={medicine} paymentTypes={paymentTypes} />;
}
