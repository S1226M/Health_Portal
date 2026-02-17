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

    // 3. Prepare slot data for the dropdown
    const slots = schedule.map((item) => {
      const slot = item.hop_timeslot_master;
      // Format time for display and create ISO string for the appointment date
      const startTime = dayjs(slot.StartTime).format("HH:mm:ss");
      const fullDateTime = `${selectedDate.format("YYYY-MM-DD")}T${startTime}`;

      return {
        slotId: item.SlotID,
        displayTime: `${dayjs(slot.StartTime).format("hh:mm A")} - ${dayjs(slot.EndTime).format("hh:mm A")}`,
        isBooked: bookedSlotIds.includes(item.SlotID),
        fullDateTime: fullDateTime, // This is what we save to the DB
      };
    });

    return { success: true, slots };
  } catch (error) {
    return { success: false, message: "Error fetching slots" };
  }
}
