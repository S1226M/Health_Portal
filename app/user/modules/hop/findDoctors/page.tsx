import React from "react";
import { getAllDoctor } from "@/app/user/modules/hop/appointment/action/getAllDoctor";
import { getDoctorBySpecializationId } from "@/app/user/modules/hop/appointment/action/getDoctorBySpecializationId";
import DoctorListClient from "./DoctorListClient";

export default async function FindDoctorPage({ searchParams }: { searchParams: Promise<{ specId?: string, search?: string }> }) {
    const resolvedParams = await searchParams;
    const specId = resolvedParams.specId ? parseInt(resolvedParams.specId) : null;
    const initialSearch = resolvedParams.search || "";

    // Always fetch ALL doctors so live search works across the entire database unrestricted
    const allDoctors = await getAllDoctor();

    // Prisma returns special Decimal types which Next.js blocks from passing Server -> Client
    // Deep-cloning it to plain JSON primitives handles this globally
    const plainDoctors = JSON.parse(JSON.stringify(allDoctors));

    return <DoctorListClient initialDoctors={plainDoctors} specId={specId} initialSearch={initialSearch} />;
}