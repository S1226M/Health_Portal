"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { Microscope, User, Info } from "lucide-react";
import { bookLabTest } from "./action/bookLabTest";

export default function BookLabTestClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const testId = searchParams.get("testId") || "";

    const [loading, setLoading] = useState(false);
    const [isSelf, setIsSelf] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

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
                setSnackbar({ open: true, message: "Test booked successfully!", severity: "success" });
                window.dispatchEvent(new CustomEvent("bookingSuccess"));
                setTimeout(() => router.push("/user"), 1500);
            } else {
                setSnackbar({ open: true, message: res.message, severity: "error" });
            }
        } catch {
            setSnackbar({ open: true, message: "Unexpected error", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-industrial-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-2xl mx-auto">
                <div className="bg-white rounded-[4px] shadow-sm border border-industrial-200 overflow-hidden">

                    <div className="bg-industrial-900 px-8 py-6 border-b border-industrial-800">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Microscope className="w-6 h-6 text-primary-500" />
                            Book Lab Test
                        </h1>
                        <p className="text-industrial-400 text-[14px] mt-2 font-medium">Please provide patient details to proceed.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-blue-800 text-sm font-medium">Home sample collection will be scheduled shortly after booking confirmation. Our team will contact you.</p>
                        </div>

                        <div>
                            <h2 className="text-[13px] font-bold text-industrial-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-industrial-100 pb-2">
                                <User className="w-4 h-4" /> Patient Information
                            </h2>

                            <label className="flex items-center gap-3 cursor-pointer group mb-6 p-3 bg-industrial-50 border border-industrial-200 rounded-[4px]">
                                <input
                                    type="checkbox"
                                    checked={isSelf}
                                    onChange={(e) => setIsSelf(e.target.checked)}
                                    className="w-5 h-5 rounded border-industrial-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                                />
                                <span className="text-[14px] font-bold text-industrial-900">I am booking for myself</span>
                            </label>

                            {!isSelf && (
                                <div className="space-y-4 bg-industrial-50 p-6 rounded-[4px] border border-industrial-200">
                                    <div>
                                        <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Patient Name *</label>
                                        <input type="text" name="PatientName" required className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-bold text-industrial-700 mb-1.5">Relation (Optional)</label>
                                        <input type="text" name="Relation" className="w-full bg-white border border-industrial-300 rounded-[4px] px-4 py-2 text-[15px] focus:ring-2 focus:ring-primary-600 outline-none" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-industrial-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-[15px] py-3.5 rounded-[4px] transition-all flex justify-center items-center h-[52px]"
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm Booking"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
}
