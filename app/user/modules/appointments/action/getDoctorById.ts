"use server";

import { prisma } from "@/lib/prisma";

export async function getDoctorById(doctorId: number) {
    const data = await prisma.hop_doctor.findUnique({
        where: {
            DoctorID: doctorId,
        },
        include: {
            hop_hospital: {
                include: {
                    loc_city: {
                        include: {
                            loc_state: {
                                include: {
                                    loc_country: true
                                }
                            }
                        }
                    }
                }
            },
            hop_specialization: true,
            hop_doctorreview: {
                include: {
                    hop_patient: true
                }
            }
        },
    });
    return data;
}
