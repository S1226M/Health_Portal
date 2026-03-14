import React from "react";
import SurgeryListClient from "./SurgeryListClient";
import { getAllSurgeries } from "./action/getAllSurgeries";

export const metadata = {
    title: "Surgeries - Health Portal",
};

export default async function SurgeryListPage() {
    const surgeries = await getAllSurgeries();

    return <SurgeryListClient initialSurgeries={surgeries || []} />;
}
