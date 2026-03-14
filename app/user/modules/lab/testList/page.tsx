import React from "react";
import LabTestListClient from "./LabTestListClient";
import { getAllLabTests } from "./action/getAllLabTests";

export const metadata = {
    title: "Lab Tests - Health Portal",
};

export default async function LabTestListPage() {
    const tests = await getAllLabTests();

    return <LabTestListClient initialTests={tests || []} />;
}
