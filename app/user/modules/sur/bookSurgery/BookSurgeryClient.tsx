"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { HeartPulse, User, CalendarDays, FileText } from "lucide-react";
import { requestSurgeryBooking } from "./action/bookSurgery";

export default function BookSurgeryClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const surgeryId = searchParams.get("surgeryId") || "";

    const [loading, setLoading] = useState(false);
    const [isSelf, setIsSelf] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

    useEffect(() => {
        if (!surgeryId) {
            router.push("/user/modules/sur/surgeryList");
        }
    }, [surgeryId, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.append("SurgeryID", surgeryId);
        formData.append("IsSelf", isSelf.toString());

        try {
            const res = await requestSurgeryBooking(formData);
            if (res.success) {
                setSnackbar({ open: true, message: res.message, severity: "success" });
                window.dispatchEvent(new CustomEvent("bookingSuccess"));
                setTimeout(() => router.push("/user"), 2000);
            } else {
                setSnackbar({ open: true, message: res.message, severity: "error" });
            }
        } catch {
            setSnackbar({ open: true, message: "Unexpected error occurred.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-industrial-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-industrial-200 overflow-hidden">

                    <div className="bg-industrial-900 px-8 py-8 border-b border-industrial-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 relative z-10">
                            <HeartPulse className="w-8 h-8 text-primary-500" />
                            Request Surgery
                        </h1>
                        <p className="text-industrial-300 text-[15px] mt-3 font-medium max-w-lg relative z-10">
                            Submit your request and our hospital coordinators will contact you to confirm doctors, timings, and next steps.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="bg-amber-50 border border-amber-200 p-5 rounded-md flex items-start gap-4">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                            <p className="text-amber-900 text-[14px] font-medium leading-relaxed">
                                <strong>Important Note:</strong> This form does not confirm your immediate surgery slot. It acts as an official request. Our medical board will review your file and a representative will help coordinate exact schedules and pre-operative requirements.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Patient Info */}
                            <div>
                                <h2 className="text-[13px] font-bold text-industrial-500 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-industrial-100 pb-2">
                                    <User className="w-4 h-4" /> Patient Info
                                </h2>

                                <label className="flex items-center gap-3 cursor-pointer group mb-6 p-4 bg-industrial-50 border border-industrial-200 rounded-[4px] hover:bg-industrial-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={isSelf}
                                        onChange={(e) => setIsSelf(e.target.checked)}
                                        className="w-5 h-5 rounded border-industrial-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                                    />
                                    <span className="text-[14px] font-bold text-industrial-900">I am the patient</span>
                                </label>

                                {!isSelf && (
                                    <div className="space-y-4 animate-slideUpFade">
                                        <div>
                                            <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Patient Full Name *</label>
                                            <input type="text" name="PatientName" required className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2.5 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Booking Preferences */}
                            <div>
                                <h2 className="text-[13px] font-bold text-industrial-500 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-industrial-100 pb-2">
                                    <CalendarDays className="w-4 h-4" /> Preferences
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Preferred Date *</label>
                                        <input type="date" name="PreferredDate" required className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2.5 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all" />
                                        <span className="text-[12px] text-industrial-500 mt-1.5 block">We will try to accommodate this date based on OT availability.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[13px] font-bold text-industrial-500 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-industrial-100 pb-2">
                                <FileText className="w-4 h-4" /> Additional Notes
                            </label>
                            <textarea
                                name="Notes"
                                rows={4}
                                placeholder="Please mention any pre-existing conditions, allergies, or questions for our coordinator..."
                                className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-3 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none transition-all resize-y"
                            ></textarea>
                        </div>

                        <div className="pt-6 border-t border-industrial-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-[16px] py-4 rounded-[4px] transition-all flex justify-center items-center shadow-md active:scale-[0.99] disabled:bg-industrial-300 disabled:cursor-not-allowed"
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Surgery Request"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
}
