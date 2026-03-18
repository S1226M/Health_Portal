"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HeartPulse, User, CalendarDays, FileText, CheckCircle2, AlertCircle, Info, Send } from "lucide-react";
import { requestSurgeryBooking } from "./action/bookSurgery";

export default function BookSurgeryClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const surgeryId = searchParams.get("surgeryId") || "";

    const [loading, setLoading] = useState(false);
    const [isSelf, setIsSelf] = useState(true);
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success"
    });

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
                setToast({ open: true, message: res.message, severity: "success" });
                window.dispatchEvent(new CustomEvent("bookingSuccess"));
                setTimeout(() => router.push("/user"), 2000);
            } else {
                setToast({ open: true, message: res.message, severity: "error" });
            }
        } catch {
            setToast({ open: true, message: "Unexpected error occurred.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-400/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

            {/* Custom Toast Notification */}
            {toast.open && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slideDownFade">
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-[1rem] shadow-2xl border backdrop-blur-md ${
                        toast.severity === 'success' 
                        ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' 
                        : 'bg-rose-50/90 border-rose-200 text-rose-800'
                    }`}>
                        {toast.severity === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                        <span className="font-bold text-[15px]">{toast.message}</span>
                        <button 
                            onClick={() => setToast({ ...toast, open: false })}
                            className="ml-4 p-1 hover:bg-black/5 rounded-full transition-colors"
                        >
                            <AlertCircle className="w-4 h-4 opacity-0" /> {/* Spacer */}
                        </button>
                    </div>
                </div>
            )}

            <div className="container relative z-10 mx-auto px-4 max-w-3xl pt-8">
                <div className="bg-white rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-slideUpFade">

                    <div className="gradient-primary px-8 py-12 border-b border-primary-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 shadow-sm">
                                <HeartPulse className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                                Request Surgery
                            </h1>
                            <p className="text-primary-100 text-[16px] font-medium max-w-lg mx-auto leading-relaxed">
                                Submit your request and our hospital coordinators will contact you to confirm doctors, timings, and pre-operative requirements.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-10">
                        {/* Notice Panel */}
                        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                            <div className="bg-white p-2 rounded-xl shrink-0 border border-amber-100 shadow-sm mt-0.5">
                                <Info className="w-6 h-6 text-amber-500" />
                            </div>
                            <p className="text-amber-900 text-[14px] font-bold leading-relaxed pt-1">
                                <span className="text-amber-700 block mb-1 uppercase tracking-widest text-[11px] font-extrabold">Important Note</span>
                                This form does not confirm your immediate surgery slot. It acts as an official request. Our medical board will review your file and coordinate exact schedules.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Patient Info */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                                        <User className="w-5 h-5 text-slate-700" />
                                    </div>
                                    <h2 className="text-[14px] font-extrabold text-slate-900 uppercase tracking-widest border-b border-transparent">
                                        Patient Info
                                    </h2>
                                </div>

                                <label className={`flex items-center gap-4 cursor-pointer p-5 border-2 rounded-2xl transition-all duration-300 ${
                                    isSelf 
                                    ? 'bg-primary-50 border-primary-500 shadow-md' 
                                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                                }`}>
                                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                                        isSelf ? 'border-primary-600 bg-primary-600' : 'border-slate-300 bg-white'
                                    }`}>
                                        {isSelf && <CheckCircle2 className="w-4 h-4 text-white animate-scaleIn" />}
                                    </div>
                                    <span className={`block text-[15px] font-extrabold ${isSelf ? 'text-primary-900' : 'text-slate-700'}`}>I am the patient</span>
                                </label>

                                {/* Sliding block for non-self */}
                                <div className={`transition-all duration-500 overflow-hidden ${isSelf ? 'max-h-0 opacity-0' : 'max-h-[300px] opacity-100'}`}>
                                    <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner mt-2">
                                        <div className="space-y-2">
                                            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">
                                                Patient Full Name <span className="text-rose-500">*</span>
                                            </label>
                                            <input 
                                                type="text" 
                                                name="PatientName" 
                                                required={!isSelf}
                                                disabled={isSelf}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[15px] font-bold text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm placeholder:text-slate-400" 
                                                placeholder="Enter patient name"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Preferences */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                                        <CalendarDays className="w-5 h-5 text-slate-700" />
                                    </div>
                                    <h2 className="text-[14px] font-extrabold text-slate-900 uppercase tracking-widest">
                                        Preferences
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">
                                            Preferred Date <span className="text-rose-500">*</span>
                                        </label>
                                        <input 
                                            type="date" 
                                            name="PreferredDate" 
                                            required 
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[15px] font-bold text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm" 
                                        />
                                        <span className="text-[13px] text-slate-500 font-medium block mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            We will try to accommodate this date based on OT availability.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                                    <FileText className="w-5 h-5 text-slate-700" />
                                </div>
                                <label className="text-[14px] font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    Additional Notes
                                </label>
                            </div>
                            <textarea
                                name="Notes"
                                rows={5}
                                placeholder="Please mention any pre-existing conditions, allergies, or questions for our coordinator..."
                                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[15px] font-medium text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm resize-y placeholder:text-slate-400 placeholder:font-medium leading-relaxed"
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="pt-8 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full gradient-primary hover:shadow-lg text-white font-extrabold text-[16px] py-5 rounded-[1rem] transition-all flex justify-center items-center gap-3 shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white/40 border-t-white rounded-full animate-spin shrink-0"></div>
                                        <span>Submitting Request...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                        <span>Submit Surgery Request</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
