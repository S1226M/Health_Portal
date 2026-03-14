"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { getDoctorSlots } from "@/app/user/modules/hop/appointment/action/getDoctorSlots";
import SaveAppointment from "@/app/user/modules/hop/appointment/action/bookAppointment";
import { Calendar, User, MapPin, Activity } from "lucide-react";

function BookAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId") || "";

  const [loading, setLoading] = useState(false);
  const [isSelf, setIsSelf] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Fetch slots
  useEffect(() => {
    if (doctorId && selectedDate) {
      setLoading(true);
      getDoctorSlots(Number(doctorId), selectedDate)
        .then((res) => {
          if (res.success) {
            setAvailableSlots(res.slots || []);
          } else {
            setSnackbar({
              open: true,
              message: res.message || "Failed to fetch slots",
              severity: "error",
            });
          }
        })
        .catch(() => {
          setSnackbar({
            open: true,
            message: "Error fetching slots",
            severity: "error",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [selectedDate, doctorId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSlot) {
      setSnackbar({
        open: true,
        message: "Please select a time slot",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    formData.append("DoctorID", doctorId);
    formData.append("SlotID", selectedSlot.slotId.toString());
    formData.append("AppointmentDate", selectedSlot.fullDateTime);
    formData.append("IsSelf", isSelf ? "true" : "false");

    try {
      const result = await SaveAppointment(formData);

      if (result.success) {
        setSnackbar({
          open: true,
          message: result.message || "Appointment booked!",
          severity: "success",
        });
        window.dispatchEvent(new CustomEvent("bookingSuccess"));
        setTimeout(() => router.push("/user"), 1500);
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Failed to book appointment",
          severity: "error",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Unexpected error occurred",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-white rounded-[4px] shadow-sm border border-industrial-200 overflow-hidden">

          <div className="bg-industrial-900 px-8 py-6 border-b border-industrial-800">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary-500" />
              Book Appointment
            </h1>
            <p className="text-industrial-400 text-[14px] mt-2 font-medium">Complete the form below to secure your consultation.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Date & Time Section */}
            <div>
              <h2 className="text-[13px] font-bold text-industrial-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-industrial-100 pb-2">
                <Activity className="w-4 h-4" /> Schedule Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Appointment No.</label>
                  <input
                    type="text"
                    name="AppointmentNo"
                    defaultValue={`APT-${Math.floor(1000 + Math.random() * 9000)}`}
                    readOnly
                    className="w-full bg-industrial-50 border border-industrial-200 rounded-[4px] px-4 py-2.5 text-[15px] font-mono text-industrial-500 cursor-not-allowed outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Select Date *</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={dayjs().format("YYYY-MM-DD")}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedSlot(null);
                    }}
                    required
                    className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2.5 text-[15px] text-industrial-900 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Available Time Slots *</label>
                <select
                  disabled={!selectedDate}
                  value={selectedSlot?.slotId ?? ""}
                  onChange={(e) =>
                    setSelectedSlot(
                      availableSlots.find(
                        (s) => s.slotId === Number(e.target.value)
                      )
                    )
                  }
                  required
                  className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2.5 text-[15px] text-industrial-900 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none disabled:bg-industrial-50 disabled:text-industrial-400 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    {loading ? "Loading slots..." : "Select a timeslot..."}
                  </option>
                  {!loading && availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <option
                        key={slot.slotId}
                        value={slot.slotId}
                        disabled={slot.isBooked}
                      >
                        {slot.displayTime} {slot.isBooked ? "(Booked)" : ""}
                      </option>
                    ))
                  ) : (
                    !loading && selectedDate && <option value="" disabled>No slots available on this date</option>
                  )}

                </select>
              </div>
            </div>

            {/* Patient Details Section */}
            <div>
              <h2 className="text-[13px] font-bold text-industrial-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-industrial-100 pb-2">
                <User className="w-4 h-4" /> Patient Information
              </h2>

              <label className="flex items-center gap-3 cursor-pointer group mb-6 p-3 bg-industrial-50 border border-industrial-200 rounded-[4px] hover:border-primary-400 transition-colors">
                <input
                  type="checkbox"
                  checked={isSelf}
                  onChange={(e) => setIsSelf(e.target.checked)}
                  className="w-5 h-5 rounded border-industrial-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                />
                <span className="text-[14px] font-bold text-industrial-900 group-hover:text-primary-600 transition-colors">I am booking for myself</span>
              </label>

              {!isSelf && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-industrial-50 p-6 rounded-[4px] border border-industrial-200 mb-6">
                  <div>
                    <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Patient Name *</label>
                    <input type="text" name="PatientName" required className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Age *</label>
                    <input type="number" name="PatientAge" required min="0" className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Address *</label>
                    <input type="text" name="Address" required className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">City *</label>
                    <input type="text" name="City" required className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">State *</label>
                    <input type="text" name="State" required className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Country *</label>
                    <input type="text" name="Country" required className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Reason for Visit *</label>
                <textarea
                  name="Reason"
                  rows={3}
                  required
                  placeholder="Briefly describe your symptoms or reason for the appointment..."
                  className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-3 text-[15px] text-industrial-900 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all outline-none resize-y"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-industrial-200">
              <button
                type="submit"
                disabled={loading || !selectedSlot}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-[15px] py-3.5 rounded-[4px] transition-all shadow-sm active:scale-[0.99] disabled:bg-industrial-300 disabled:cursor-not-allowed disabled:active:scale-100 flex justify-center items-center h-[52px]"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm & Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ borderRadius: 1.5, fontWeight: 500 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-industrial-50"><CircularProgress /></div>}>
      <BookAppointmentContent />
    </Suspense>
  );
}