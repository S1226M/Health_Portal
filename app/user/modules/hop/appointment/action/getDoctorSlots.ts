"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export async function getDoctorSlots(doctorId: number, dateStr: string) {
  try {
    if (!doctorId || !dateStr) {
      return { success: false, message: "Missing doctor or date" };
    }

    const selectedDate = dayjs(dateStr);
    const jsDayOfWeek = selectedDate.day(); // 0-6
    const isoDayOfWeek = jsDayOfWeek === 0 ? 7 : jsDayOfWeek; // 1-7

    // 1. Fetch mappings
    // Added 'slotId' explicitly to the select to ensure we get the ID correctly
    const schedule = await prisma.hop_doctor_slot_mapping.findMany({
      where: {
        DoctorID: doctorId,
        IsActive: true,
        OR: [
          { DayOfWeek: jsDayOfWeek },
          { DayOfWeek: isoDayOfWeek },
          { DayOfWeek: null },
        ],
      },
      include: {
        hop_timeslot_master: true
      },
    });

    // 2. Fetch bookings for this specific date
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

    // 3. Map and format
    const slots = schedule
      .filter((item) => item.hop_timeslot_master !== null)
      .map((item) => {
        const sm = item.hop_timeslot_master!;

        // Use the SlotID from the master table (sm) 
        // to match the one used in the hop_appointment table
        const slotId = sm.SlotID;

        // CRITICAL FIX: Handle the StartTime formatting
        // If StartTime is a Date object (1970-01-01T09:00:00), we extract just the time
        const timePart = dayjs(sm.StartTime).format("HH:mm:ss");
        const displayTime = dayjs(`2000-01-01 ${timePart}`).format("hh:mm A") +
          " - " +
          dayjs(`2000-01-01 ${dayjs(sm.EndTime).format("HH:mm:ss")}`).format("hh:mm A");

        return {
          slotId: slotId,
          displayTime: displayTime,
          isBooked: bookedSlotIds.has(slotId),
          fullDateTime: `${selectedDate.format("YYYY-MM-DD")}T${timePart}`,
        };
      });

    // 4. Deduplicate & Sort
    const uniqueSlots = Array.from(
      new Map(slots.map(s => [s.slotId, s])).values()
    );

    uniqueSlots.sort((a, b) => a.fullDateTime.localeCompare(b.fullDateTime));

    console.log(`[getDoctorSlots] Found ${uniqueSlots.length} slots for Doctor ${doctorId}`);

    return { success: true, slots: uniqueSlots };
  } catch (error: any) {
    console.error("[getDoctorSlots] Error:", error);
    return { success: false, message: `Server error: ${error.message}` };
  }
}