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
                    },
                    hop_hospitaltreatment: {
                        include: {
                            hop_treatmenttype: true
                        }
                    },
                    pay_paymentmode: true
                }
            },
            hop_specialization: true,
            hop_doctorreview: {
                include: {
                    hop_patient: true
                },
                orderBy: {
                    Created: 'desc'
                }
            },
            hop_doctor_slot_mapping: {
                include: {
                    hop_timeslot_master: true
                }
            },
            hop_appointment: {
                where: {
                    Status: 'Confirmed',
                    AppointmentDate: {
                        gte: new Date()
                    }
                },
                orderBy: {
                    AppointmentDate: 'asc'
                },
                take: 5
            }
        },
    });

    if (!data) return null;

    // Deep-clone to plain JSON to handle Prisma Decimal types
    return JSON.parse(JSON.stringify(data));
}
