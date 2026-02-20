"use server";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export async function getDoctorSlots(doctorId: number, dateStr: string) {
  try {
    const selectedDate = dayjs(dateStr);
    const dayOfWeek = selectedDate.day(); // Sunday = 0, Monday = 1...

    // 1. Get doctor's schedule for this weekday
    console.log(`Fetching schedule for DoctorID: ${doctorId}, Day: ${dayOfWeek}`);

    const schedule = await prisma.hop_doctor_slot_mapping.findMany({
      where: { DoctorID: doctorId, DayOfWeek: dayOfWeek, IsActive: true },
      include: { hop_timeslot_master: true },
    });

    console.log(`Found ${schedule.length} schedule entries.`);

    // 2. Get existing appointments for this specific calendar date
    const bookings = await prisma.hop_appointment.findMany({
      where: {
        DoctorID: doctorId,
        AppointmentDate: {
          gte: selectedDate.startOf("day").toDate(),
          lte: selectedDate.endOf("day").toDate(),
        },
        IsDeleted: false,
        Status: { not: "Cancelled" },
      },
      select: { SlotID: true },
    });

    const bookedSlotIds = bookings.map((b) => b.SlotID);

    // Helper function to format time values (handles Time type from database)
    const formatTime = (date: Date | string) => {
      if (!date) return "";
      // Handle Time values by prepending a date
      const timeStr = dayjs(date).format("HH:mm:ss");
      return dayjs(`1970-01-01 ${timeStr}`).format("hh:mm A");
    };

    // 3. Prepare slot data for the dropdown
    const slots = schedule
      .filter((item) => item.hop_timeslot_master !== null) // Filter out null slots
      .map((item) => {
        const slot = item.hop_timeslot_master!; // Non-null assertion after filter
        // Validate that StartTime and EndTime exist
        if (!slot.StartTime || !slot.EndTime) {
          return null;
        }

        // Format time for display and create ISO string for the appointment date
        const startTimeStr = dayjs(slot.StartTime).format("HH:mm:ss");
        const fullDateTime = `${selectedDate.format("YYYY-MM-DD")}T${startTimeStr}`;

        // Format times using the helper function
        const startTimeFormatted = formatTime(slot.StartTime);
        const endTimeFormatted = formatTime(slot.EndTime);

        return {
          slotId: item.SlotID,
          displayTime: `${startTimeFormatted} - ${endTimeFormatted}`,
          isBooked: bookedSlotIds.includes(item.SlotID),
          fullDateTime: fullDateTime,
        };
      })
      .filter((slot) => slot !== null) as Array<{
        slotId: number;
        displayTime: string;
        isBooked: boolean;
        fullDateTime: string;
      }>;

    return { success: true, slots };
  } catch (error) {
    return { success: false, message: "Error fetching slots" };
  }
}
