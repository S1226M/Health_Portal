"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import fs from "fs";
import path from "path";

dayjs.extend(utc);

const LOG_FILE = "d:/Health_Portal/slot_diagnostics.log";

function log(message: string) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`);
}

export async function getDoctorSlots(doctorId: number, dateStr: string) {
  try {
    log(`--- NEW REQUEST: DocID=${doctorId}, Date=${dateStr} ---`);

    if (!doctorId || !dateStr) {
      log("Error: Missing doctorId or dateStr");
      return { success: false, message: "Missing doctor or date" };
    }

    const selectedDate = dayjs(dateStr);
    if (!selectedDate.isValid()) {
      log(`Error: Invalid date ${dateStr}`);
      return { success: false, message: "Invalid date selected" };
    }

    const dayOfWeek = selectedDate.day();
    const normalizedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    log(`DayJS Day Index: ${dayOfWeek}, ISO Day Index: ${normalizedDayOfWeek}`);

    // 1. Fetch mappings
    let schedule = await prisma.hop_doctor_slot_mapping.findMany({
      where: {
        DoctorID: doctorId,
        IsActive: true,
        OR: [
          { DayOfWeek: dayOfWeek },
          { DayOfWeek: normalizedDayOfWeek },
          { DayOfWeek: null },
        ],
      },
      include: { hop_timeslot_master: true },
    });

    log(`Primary query found ${schedule.length} slots.`);

    // DIAGNOSTIC FALLBACK: If no slots found, check why
    if (schedule.length === 0) {
      const anyMappings = await prisma.hop_doctor_slot_mapping.findMany({
        where: { DoctorID: doctorId },
        take: 10
      });
      log(`Total mappings found for DocID ${doctorId} across ALL days: ${anyMappings.length}`);
      if (anyMappings.length > 0) {
        log(`Mappings found for days: ${anyMappings.map(m => m.DayOfWeek).join(", ")}`);
      } else {
        log(`CRITICAL: No mappings AT ALL for DocID ${doctorId}. This suggests the ID is wrong or the table is empty for this ID.`);

        // Check if this doctor even exists
        const doc = await prisma.hop_doctor.findUnique({ where: { DoctorID: doctorId } });
        if (!doc) {
          log(`CRITICAL: Doctor with ID ${doctorId} DOES NOT EXIST in hop_doctor table.`);
        } else {
          log(`Doctor ${doc.DoctorName} exists (ID ${doctorId}), but has no slots.`);
        }
      }

      const totalMappingsCount = await prisma.hop_doctor_slot_mapping.count({
        where: { DoctorID: doctorId }
      });

      if (totalMappingsCount === 0) {
        log(`Triggering auto-seed for DocID ${doctorId}...`);
        try {
          const { seedDoctorSlots } = await import("./seedDoctorSlots");
          const seedRes = await seedDoctorSlots(doctorId);
          log(`Seed result: ${JSON.stringify(seedRes)}`);
          if (seedRes.success) {
            return getDoctorSlots(doctorId, dateStr);
          }
        } catch (seedErr: any) {
          log(`Auto-seeding error: ${seedErr.message}`);
        }
      }
    }

    // 2. Fetch already booked appointments
    const bookings = await prisma.hop_appointment.findMany({
      where: {
        DoctorID: doctorId,
        AppointmentDate: {
          gte: selectedDate.startOf("day").toDate(),
          lte: selectedDate.endOf("day").toDate(),
        },
        IsDeleted: false,
        Status: { notIn: ["Cancelled", "Completed"] },
      },
      select: { SlotID: true },
    });

    log(`Found ${bookings.length} existing bookings for this date.`);
    const bookedSlotIds = new Set(bookings.map((b) => b.SlotID));

    const formatWallClockTime = (date: Date | string | null) => {
      if (!date) return "";
      return dayjs.utc(date).format("hh:mm A");
    };

    const getISOStartTime = (date: Date | string | null) => {
      if (!date) return "00:00:00";
      return dayjs.utc(date).format("HH:mm:ss");
    };

    // 3. Format and return available slots
    const slots = schedule
      .filter((item) => item.hop_timeslot_master !== null)
      .map((item) => {
        const sm = item.hop_timeslot_master!;
        const displayTime = `${formatWallClockTime(sm.StartTime)} - ${formatWallClockTime(sm.EndTime)}`;
        const startTimeStr = getISOStartTime(sm.StartTime);
        const fullDateTime = `${selectedDate.format("YYYY-MM-DD")}T${startTimeStr}`;

        return {
          slotId: item.SlotID,
          displayTime: displayTime,
          isBooked: bookedSlotIds.has(item.SlotID),
          fullDateTime: fullDateTime,
        };
      });

    slots.sort((a, b) => a.fullDateTime.localeCompare(b.fullDateTime));
    log(`Returning ${slots.length} formatted slots.`);

    return { success: true, slots };
  } catch (error: any) {
    log(`TOP LEVEL ERROR: ${error.message}`);
    console.error("getDoctorSlots Error:", error);
    return { success: false, message: "Failed to load time slots." };
  }
}
