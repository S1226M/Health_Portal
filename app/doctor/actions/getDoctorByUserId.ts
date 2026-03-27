"use server";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function getDoctorByUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    const payload = verifyToken(token) as any;
    if (!payload || payload?.role !== "Doctor") return null;

    // If the token has DoctorID directly (doctor-login flow), use it
    if (payload.DoctorID) {
        const doctor = await prisma.hop_doctor.findFirst({
            where: {
                DoctorID: payload.DoctorID,
                IsDeleted: false,
            },
            include: {
                hop_specialization: true,
                hop_hospital: true,
            },
        });

        if (!doctor) return null;

        return {
            DoctorID: doctor.DoctorID,
            DoctorName: doctor.DoctorName,
            HospitalName: doctor.hop_hospital?.HospitalName || "N/A",
            SpecializationName: doctor.hop_specialization?.SpecializationName || "General",
            UserID: doctor.UserID,
        };
    }

    // Fallback: look up doctor by UserID (old flow / sec_user-based login)
    if (payload.UserID) {
        const doctor = await prisma.hop_doctor.findFirst({
            where: {
                UserID: payload.UserID,
                IsDeleted: false,
            },
            include: {
                hop_specialization: true,
                hop_hospital: true,
            },
        });

        if (!doctor) return null;

        return {
            DoctorID: doctor.DoctorID,
            DoctorName: doctor.DoctorName,
            HospitalName: doctor.hop_hospital?.HospitalName || "N/A",
            SpecializationName: doctor.hop_specialization?.SpecializationName || "General",
            UserID: doctor.UserID,
        };
    }

    return null;
}
