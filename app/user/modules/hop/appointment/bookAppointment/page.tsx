"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { getDoctorSlots } from "@/app/user/modules/hop/appointment/action/getDoctorSlots";
import SaveAppointment from "@/app/user/modules/hop/appointment/action/bookAppointment";
import { Calendar, User, Activity, AlertCircle, CheckCircle2, X } from "lucide-react";

function BookAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId") || "";

  const [loading, setLoading] = useState(false);
  const [isSelf, setIsSelf] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  // Custom Toast State
  const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({
    open: false,
    message: "",
    type: "success"
  });

  // Toast Auto-Hide
  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => setToast(prev => ({ ...prev, open: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.open]);

  // Fetch slots
  useEffect(() => {
    if (doctorId && selectedDate) {
      setLoading(true);
      getDoctorSlots(Number(doctorId), selectedDate)
        .then((res) => {
          if (res.success) {
            // LOG THE RESPONSE, NOT THE STATE
            console.log("📡 Server Response Slots:", res.slots);
            setAvailableSlots(res.slots || []);
          } else {
            setToast({ open: true, message: res.message || "Failed to fetch slots", type: "error" });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [selectedDate, doctorId]);
  console.log("availableSlots :  ", availableSlots);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSlot) {
      setToast({
        open: true,
        message: "Please select a time slot",
        type: "error",
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
        setToast({
          open: true,
          message: result.message || "Appointment booked!",
          type: "success",
        });
        window.dispatchEvent(new CustomEvent("bookingSuccess"));
        setTimeout(() => router.push("/user"), 1500);
      } else {
        setToast({
          open: true,
          message: result.message || "Failed to book appointment",
          type: "error",
        });
      }
    } catch {
      setToast({
        open: true,
        message: "Unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-4xl mx-auto animate-slideUpFade">
        <div className="bg-white rounded-[1rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">

          <div className="bg-slate-900 px-8 py-8 border-b border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float" />
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 relative z-10">
              <Calendar className="w-8 h-8 text-primary-400" />
              Book Appointment
            </h1>
            <p className="text-slate-400 text-[15px] mt-2 font-medium relative z-10">Complete the form below to secure your consultation.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Date & Time Section */}
            <div>
              <h2 className="text-[13px] font-bold text-primary-600 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Activity className="w-4 h-4" /> Schedule Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Appointment No.</label>
                  <input
                    type="text"
                    name="AppointmentNo"
                    defaultValue={`APT-${Math.floor(1000 + Math.random() * 9000)}`}
                    readOnly
                    className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-3 text-[15px] font-mono text-slate-500 cursor-not-allowed outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-2">Select Date *</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={dayjs().format("YYYY-MM-DD")}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedSlot(null);
                    }}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-3 text-[15px] text-slate-900 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all outline-none hover:border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Available Time Slots *</label>
                <div className="relative">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-3 text-[15px] text-slate-900 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all outline-none hover:border-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed appearance-none"
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
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none disabled:opacity-50 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Details Section */}
            <div>
              <h2 className="text-[13px] font-bold text-primary-600 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-4 h-4" /> Patient Information
              </h2>

              <label className="flex items-center gap-3 cursor-pointer group mb-6 p-4 bg-slate-50 border border-slate-200 rounded-[12px] hover:border-primary-300 transition-colors">
                <input
                  type="checkbox"
                  checked={isSelf}
                  onChange={(e) => setIsSelf(e.target.checked)}
                  className="w-5 h-5 rounded-[4px] border-slate-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer transition-colors"
                />
                <span className="text-[15px] font-bold text-slate-800 group-hover:text-primary-600 transition-colors">I am booking for myself</span>
              </label>

              {!isSelf && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/50 p-6 rounded-[12px] border border-slate-200 mb-6 animate-scaleIn">
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Patient Name *</label>
                    <input type="text" name="PatientName" required className="w-full bg-white border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-400 hover:border-slate-300 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Age *</label>
                    <input type="number" name="PatientAge" required min="0" className="w-full bg-white border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-400 hover:border-slate-300 outline-none transition-all" placeholder="30" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Address *</label>
                    <input type="text" name="Address" required className="w-full bg-white border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-400 hover:border-slate-300 outline-none transition-all" placeholder="123 Health St" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">City *</label>
                    <input type="text" name="City" required className="w-full bg-white border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-400 hover:border-slate-300 outline-none transition-all" placeholder="New York" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">State *</label>
                    <input type="text" name="State" required className="w-full bg-white border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-400 hover:border-slate-300 outline-none transition-all" placeholder="NY" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Country *</label>
                    <input type="text" name="Country" required className="w-full bg-white border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-400 hover:border-slate-300 outline-none transition-all" placeholder="USA" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Reason for Visit *</label>
                <textarea
                  name="Reason"
                  rows={4}
                  required
                  placeholder="Briefly describe your symptoms or reason for the appointment..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-3 text-[15px] text-slate-900 focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all outline-none resize-y hover:border-slate-300"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading || !selectedSlot}
                className="w-full gradient-primary text-white font-bold text-[16px] py-4 rounded-[12px] transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:bg-slate-300 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none flex justify-center items-center h-[56px] relative overflow-hidden group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10 w-full inline-flex justify-center items-center text-center">Confirm & Book Appointment</span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Toast Notification */}
      {toast.open && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUpFade">
          <div
            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-xl font-bold text-[14px] border ${toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
          >
            {/* Icon Color Fix: Changed text-white to text-emerald-500 */}
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-500" />
            )}

            {/* The message text will now inherit text-emerald-800 from the parent div */}
            {toast.message}

            <button
              onClick={() => setToast({ ...toast, open: false })}
              className={`ml-4 p-1 rounded-lg transition-colors ${toast.type === 'success'
                ? 'hover:bg-emerald-100 text-emerald-600'
                : 'hover:bg-rose-100 text-rose-600'
                }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    }>
      <BookAppointmentContent />
    </Suspense>
  );
}