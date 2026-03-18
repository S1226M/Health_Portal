"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function getDoctorSlots(doctorId: number, dateStr: string) {
  try {
    if (!doctorId || !dateStr) {
      return { success: false, message: "Missing doctor or date" };
    }

    const selectedDate = dayjs(dateStr);
    if (!selectedDate.isValid()) {
      return { success: false, message: "Invalid date selected" };
    }

    // dayjs().day() is 0 (Sun) to 6 (Sat)
    const dayOfWeek = selectedDate.day();

    // Support mapping where Sunday is 7 (ISO) or 0 (JS)
    const normalizedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    // 1. Fetch mappings for this doctor and day
    let schedule = await prisma.hop_doctor_slot_mapping.findMany({
      where: {
        DoctorID: doctorId,
        IsActive: true,
        OR: [
          { DayOfWeek: dayOfWeek },
          { DayOfWeek: normalizedDayOfWeek },
          { DayOfWeek: null }, // Available every day
        ],
      },
      include: { hop_timeslot_master: true },
    });

    // AUTO-SEED Logic: If the doctor has ABSOLUTELY NO mappings at all, seed default ones.
    if (schedule.length === 0) {
      const totalMappings = await prisma.hop_doctor_slot_mapping.count({
        where: { DoctorID: doctorId }
      });

      if (totalMappings === 0) {
        try {
          const { seedDoctorSlots } = await import("./seedDoctorSlots");
          const seedRes = await seedDoctorSlots(doctorId);
          if (seedRes.success) {
            return getDoctorSlots(doctorId, dateStr);
          }
        } catch (seedErr) {
          console.error("Auto-seeding failed:", seedErr);
        }
      }
    }

    // 2. Fetch already booked appointments for this date
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

    return { success: true, slots };
  } catch (error: any) {
    console.error("getDoctorSlots Error:", error);
    return { success: false, message: "Failed to load time slots." };
  }
}
