"use server";

import { prisma } from "@/lib/prisma";

export async function getAllDoctor() {
  const data = await prisma.hop_doctor.findMany({
    where: {
      IsDeleted: false,
    },
    include: {
      hop_hospital: true,
      hop_specialization: true,
    },
  });
  return data;
}
