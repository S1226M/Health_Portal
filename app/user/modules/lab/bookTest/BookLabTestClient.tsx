"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Microscope, User, Info, AlertCircle, CheckCircle2, FlaskConical, Calendar } from "lucide-react";
import { bookLabTest } from "./action/bookLabTest";

export default function BookLabTestClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const testId = searchParams.get("testId") || "";

    const [loading, setLoading] = useState(false);
    const [isSelf, setIsSelf] = useState(true);
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        if (!testId) {
            router.push("/user/modules/lab/testList");
        }
    }, [testId, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.append("LabTestID", testId);
        formData.append("IsSelf", isSelf.toString());

        try {
            const res = await bookLabTest(formData);
            if (res.success) {
                setToast({ open: true, message: "Test booked successfully!", severity: "success" });
                window.dispatchEvent(new CustomEvent("bookingSuccess"));
                setTimeout(() => router.push("/user"), 1500);
            } else {
                setToast({ open: true, message: res.message, severity: "error" });
            }
        } catch {
            setToast({ open: true, message: "Unexpected error occurred. Please try again.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 relative overflow-hidden">
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

            <div className="container relative z-10 mx-auto px-4 max-w-2xl pt-16">
                
                {/* Header Badge */}
                <div className="flex justify-center mb-8 animate-slideUpFade">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-[12px] font-extrabold uppercase tracking-widest text-slate-600">
                        <FlaskConical className="w-4 h-4 text-primary-500" />
                        Secure Booking
                    </div>
                </div>

                <div className="bg-white rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-slideUpFade" style={{ animationDelay: '0.1s' }}>
                    
                    {/* Header */}
                    <div className="gradient-primary px-8 py-10 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-10 mix-blend-overlay"></div>
                        <div className="relative z-10">
                            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                                Schedule Lab Test
                            </h1>
                            <p className="text-primary-100 text-[16px] font-medium max-w-md mx-auto">
                                Please provide the patient details to proceed with your booking request.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
                        {/* Info Alert */}
                        <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex items-start gap-4 shadow-sm animate-pulseGlow">
                            <div className="bg-white p-2 rounded-xl shrink-0 shadow-sm">
                                <Info className="w-6 h-6 text-blue-500" />
                            </div>
                            <p className="text-blue-900 text-[14px] font-semibold leading-relaxed pt-1">
                                Home sample collection will be scheduled shortly after booking confirmation. Our expert phlebotomist will contact you to confirm timing.
                            </p>
                        </div>

                        {/* Patient Information Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                                    <User className="w-5 h-5 text-slate-700" />
                                </div>
                                <h2 className="text-[14px] font-extrabold text-slate-900 uppercase tracking-widest">
                                    Patient Details
                                </h2>
                            </div>

                            {/* Booking For Toggle */}
                            <label className={`flex items-center gap-4 cursor-pointer p-5 border-2 rounded-2xl transition-all duration-300 ${
                                isSelf 
                                ? 'bg-primary-50 border-primary-500 shadow-md' 
                                : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                            }`}>
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                                    isSelf ? 'border-primary-600 bg-primary-600' : 'border-slate-300 bg-white'
                                }`}>
                                    {isSelf && <CheckCircle2 className="w-4 h-4 text-white" />}
                                </div>
                                <div>
                                    <span className={`block text-[16px] font-extrabold ${isSelf ? 'text-primary-900' : 'text-slate-700'}`}>
                                        I am booking for myself
                                    </span>
                                    <span className="block text-[13px] font-medium text-slate-500 mt-1">
                                        Use my registered profile details
                                    </span>
                                </div>
                            </label>

                            {/* Relative Info Form */}
                            <div className={`transition-all duration-500 overflow-hidden ${isSelf ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
                                <div className="space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner mt-2">
                                    <div className="space-y-2">
                                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">
                                            Patient Full Name <span className="text-rose-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="PatientName" 
                                            required={!isSelf}
                                            disabled={isSelf}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[15px] font-bold text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm placeholder:text-slate-400 placeholder:font-medium" 
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">
                                            Relation <span className="text-slate-400 font-medium normal-case tracking-normal">(Optional)</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="Relation" 
                                            disabled={isSelf}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[15px] font-bold text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm placeholder:text-slate-400 placeholder:font-medium" 
                                            placeholder="e.g., Father, Mother, Spouse"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-slate-100 mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full gradient-primary hover:shadow-lg text-white font-extrabold text-[16px] py-4 rounded-[1rem] transition-all flex justify-center items-center gap-2 shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin shrink-0"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Confirm Booking Request
                                    </>
                                )}
                            </button>
                            <p className="text-center text-[13px] font-medium text-slate-500 mt-4">
                                By confirming, you agree to our terms and conditions for diagnostic services.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
