"use client";

import React, { useEffect, useState } from "react";
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    PlusIcon,
    Clock,
    History,
    XCircle,
    Star,
    MessageSquare,
    AlertCircle,
    CheckCircle2,
    X
} from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { getViewBookedAppointments } from "@/app/user/modules/hop/appointment/action/getViewBookedAppointments";
import { submitDoctorReview } from "@/app/user/modules/hop/appointment/action/submitDoctorReview";

interface Appointment {
    AppointmentID: number;
    AppointmentNo: string;
    AppointmentDate: string | Date;
    Status: string;
    Reason: string | null;
    PatientName: string;
    DoctorID: number;
    appointmentStatus: string; // "Upcoming" | "Completed" | "Cancelled"
    hop_doctor: {
        DoctorName: string;
        hop_specialization: {
            SpecializationName: string;
        } | null;
        hop_hospital: {
            HospitalName: string;
            Address: string | null;
        } | null;
    };
    hop_timeslot_master: {
        StartTime: string | Date;
        EndTime: string | Date;
        SlotName: string;
    } | null;
}

export default function ViewBookedAppointment() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    // Review modal state
    const [reviewOpen, setReviewOpen] = useState(false);
    const [reviewAppt, setReviewAppt] = useState<Appointment | null>(null);
    const [reviewRating, setReviewRating] = useState<number>(0);
    const [reviewHover, setReviewHover] = useState<number>(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    
    // Toast state
    const [toast, setToast] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({ open: false, message: '', type: 'success' });

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const result = await getViewBookedAppointments();
                if (result.success && result.data) {
                    setAppointments(result.data as any);
                } else {
                    setError(result.message || "Failed to load appointments");
                }
            } catch (err) {
                console.error("Error loading appointments:", err);
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Toast auto-hide
    useEffect(() => {
        if (toast.open) {
            const timer = setTimeout(() => setToast(t => ({ ...t, open: false })), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast.open]);

    const formatTime = (time?: string | Date) => {
        if (!time) return "";
        if (typeof time === "string" && (time.includes("AM") || time.includes("PM"))) return time;
        return dayjs(time).format("h:mm A");
    };

    const getApptStatusClasses = (status: string) => {
        switch (status) {
            case 'Upcoming':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Completed':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Cancelled':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    const getPrimaryStatusClasses = (status: string) => {
        switch (status.toLowerCase()) {
            case 'scheduled':
            case 'confirmed':
                return 'bg-primary-50 text-primary-700 border-primary-200';
            case 'completed':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'cancelled':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status) {
            case 'Upcoming': return <Clock className="w-3.5 h-3.5" />;
            case 'Completed': return <History className="w-3.5 h-3.5" />;
            case 'Cancelled': return <XCircle className="w-3.5 h-3.5" />;
            default: return null;
        }
    };

    const filteredAppointments = appointments.filter((appt) => {
        if (activeTab === 0) return true;
        if (activeTab === 1) return appt.appointmentStatus === "Upcoming";
        if (activeTab === 2) return appt.appointmentStatus === "Completed";
        return true;
    });

    const upcomingCount = appointments.filter(a => a.appointmentStatus === "Upcoming").length;
    const completedCount = appointments.filter(a => a.appointmentStatus === "Completed").length;

    const handleOpenReview = (appt: Appointment) => {
        setReviewAppt(appt);
        setReviewRating(0);
        setReviewHover(0);
        setReviewText("");
        setReviewOpen(true);
    };

    const handleSubmitReview = async () => {
        if (!reviewAppt || !reviewRating || reviewRating === 0) {
            setToast({ open: true, message: "Please select a rating.", type: 'error' });
            return;
        }

        setReviewSubmitting(true);
        try {
            const result = await submitDoctorReview({
                doctorId: reviewAppt.DoctorID,
                rating: reviewRating,
                reviewText: reviewText.trim(),
                appointmentId: reviewAppt.AppointmentID,
            });

            if (result.success) {
                setToast({ open: true, message: result.message, type: 'success' });
                setReviewOpen(false);
                const refreshResult = await getViewBookedAppointments();
                if (refreshResult.success && refreshResult.data) {
                    setAppointments(refreshResult.data as any);
                }
            } else {
                setToast({ open: true, message: result.message, type: 'error' });
            }
        } catch (err) {
            setToast({ open: true, message: "Failed to submit review.", type: 'error' });
        } finally {
            setReviewSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-6 max-w-3xl py-12">
                <div className="bg-rose-50 p-8 text-center rounded-2xl border border-rose-100">
                    <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-rose-900 mb-2">{error}</h3>
                    <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-white border border-rose-200 text-rose-700 rounded-xl font-bold hover:bg-rose-50 transition-colors">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-900">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200 pt-8 pb-4 sticky top-0 z-20 shadow-sm glass">
                <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl font-extrabold text-slate-900">My Appointments</h1>
                    <Link
                        href="/user/modules/hop/appointment/doctorListPage"
                        className="inline-flex items-center gap-2 px-6 py-2.5 gradient-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                    >
                        <PlusIcon className="w-5 h-5" /> Book New
                    </Link>
                </div>

                {/* Tabs */}
                <div className="container mx-auto px-6 max-w-6xl mt-6 flex gap-8">
                    <button
                        onClick={() => setActiveTab(0)}
                        className={`pb-3 font-bold text-[15px] transition-colors relative ${activeTab === 0 ? 'text-primary-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        All ({appointments.length})
                        {activeTab === 0 && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-600 rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab(1)}
                        className={`pb-3 font-bold text-[15px] transition-colors relative flex items-center gap-2 ${activeTab === 1 ? 'text-primary-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <Clock className="w-4 h-4" /> Upcoming ({upcomingCount})
                        {activeTab === 1 && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-600 rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab(2)}
                        className={`pb-3 font-bold text-[15px] transition-colors relative flex items-center gap-2 ${activeTab === 2 ? 'text-primary-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        <History className="w-4 h-4" /> Completed ({completedCount})
                        {activeTab === 2 && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary-600 rounded-t-full" />}
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl pt-10">
                {filteredAppointments.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
                        <CalendarIcon className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                            {activeTab === 1 ? "No upcoming appointments." : activeTab === 2 ? "No completed appointments." : "No booked appointments."}
                        </h3>
                        <p className="text-slate-500 font-medium mb-6">Find a doctor and book your first appointment today.</p>
                        <Link href="/user/modules/hop/appointment/doctorListPage" className="inline-flex px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                            Find Doctors
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAppointments.map((appt) => {
                            const isCompletedOrPast = appt.appointmentStatus === "Completed";
                            return (
                                <div
                                    key={appt.AppointmentID}
                                    className={`card-premium group flex flex-col ${isCompletedOrPast ? 'opacity-85 hover:opacity-100' : ''}`}
                                >
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[12px] font-bold rounded-lg border border-slate-200">
                                                #{appt.AppointmentNo}
                                            </span>
                                            <div className="flex gap-2 isolate flex-wrap justify-end">
                                                <div className={`px-2.5 py-1 text-[12px] font-bold rounded-md border flex items-center gap-1.5 ${getApptStatusClasses(appt.appointmentStatus)}`}>
                                                    <StatusIcon status={appt.appointmentStatus} />
                                                    {appt.appointmentStatus}
                                                </div>
                                                <div className={`px-2.5 py-1 text-[12px] font-bold rounded-md border ${getPrimaryStatusClasses(appt.Status)}`}>
                                                    {appt.Status}
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-extrabold text-slate-800 mb-1 group-hover:text-primary-700 transition-colors">
                                            {appt.hop_doctor.DoctorName}
                                        </h3>
                                        <p className="text-[14px] font-bold text-primary-600 mb-5">
                                            {appt.hop_doctor.hop_specialization?.SpecializationName || "Specialist"}
                                        </p>

                                        <div className="h-px bg-slate-100 w-full mb-5" />

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-slate-600 text-[14px]">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <span className="font-semibold">{dayjs(appt.AppointmentDate).format("ddd, MMM D, YYYY")}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600 text-[14px]">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                                    <ClockIcon className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <span className="font-semibold">
                                                    {appt.hop_timeslot_master ? `${formatTime(appt.hop_timeslot_master.StartTime)} - ${formatTime(appt.hop_timeslot_master.EndTime)}` : "Time not specified"}
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-3 text-slate-600 text-[14px]">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                                    <MapPinIcon className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800">{appt.hop_doctor.hop_hospital?.HospitalName || "Hospital"}</p>
                                                    {appt.hop_doctor.hop_hospital?.Address && (
                                                        <p className="text-[12px] text-slate-500 mt-0.5 leading-tight">{appt.hop_doctor.hop_hospital.Address}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {appt.Reason && (
                                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4">
                                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Reason for visit</span>
                                                <p className="text-[13px] text-slate-700 italic font-medium">"{appt.Reason}"</p>
                                            </div>
                                        )}

                                        <div className="mt-auto bg-primary-50 border border-primary-100 rounded-xl p-3 flex justify-between items-center">
                                            <span className="text-[12px] font-bold text-primary-700">Patient:</span>
                                            <span className="text-[14px] font-bold text-slate-900">{appt.PatientName}</span>
                                        </div>

                                        {isCompletedOrPast && (
                                            <div className="mt-4 pt-4 border-t border-slate-100">
                                                <button
                                                    onClick={() => handleOpenReview(appt)}
                                                    className="w-full flex items-center justify-center gap-2 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl font-bold text-[14px] transition-colors"
                                                >
                                                    <MessageSquare className="w-4 h-4" /> Rate & Review Doctor
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {reviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setReviewOpen(false)} />
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-scaleIn border border-slate-200">
                        {/* Header */}
                        <div className="bg-amber-50 px-6 py-4 border-b border-amber-200 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-amber-900">
                                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                                <h3 className="font-extrabold text-lg">Review Doctor</h3>
                            </div>
                            <button onClick={() => setReviewOpen(false)} className="text-amber-700 hover:bg-amber-200/50 p-1.5 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                            <div className="text-center mb-6">
                                <h4 className="font-bold text-slate-800 text-lg mb-1">How was your experience?</h4>
                                <p className="text-[13px] text-slate-500 font-medium mb-4">Dr. {reviewAppt?.hop_doctor?.DoctorName}</p>
                                
                                <div className="flex justify-center gap-2 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setReviewRating(star)}
                                            onMouseEnter={() => setReviewHover(star)}
                                            onMouseLeave={() => setReviewHover(0)}
                                            className="focus:outline-none transform hover:scale-110 transition-transform"
                                        >
                                            <Star className={`w-10 h-10 transition-colors ${(reviewHover || reviewRating) >= star ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
                                        </button>
                                    ))}
                                </div>
                                <div className="h-5 text-[13px] font-bold text-slate-500">
                                    {(reviewHover || reviewRating) === 1 && "Poor"}
                                    {(reviewHover || reviewRating) === 2 && "Below Average"}
                                    {(reviewHover || reviewRating) === 3 && "Average"}
                                    {(reviewHover || reviewRating) === 4 && "Good"}
                                    {(reviewHover || reviewRating) === 5 && "Excellent!"}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">Write your review (optional)</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your experience..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[14px] focus:ring-2 focus:ring-amber-400 outline-none transition-all resize-y"
                                />
                            </div>

                            {reviewAppt && (
                                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col gap-1">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Appointment</span>
                                    <span className="text-[13px] font-medium text-slate-700">#{reviewAppt.AppointmentNo} • {dayjs(reviewAppt.AppointmentDate).format("MMM D")}</span>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
                            <button onClick={() => setReviewOpen(false)} className="px-5 py-2.5 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors text-[14px]">
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                disabled={reviewSubmitting || !reviewRating}
                                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 text-[14px]"
                            >
                                {reviewSubmitting ? (
                                    <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> Submitting...</>
                                ) : (
                                    <>Submit Review</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Toast Notification */}
            {toast.open && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUpFade">
                    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl font-bold text-[14px] \${toast.type === 'success' ? 'bg-emerald-800 text-white' : 'bg-rose-800 text-white'}`}>
                        {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-300" /> : <AlertCircle className="w-5 h-5 text-rose-300" />}
                        {toast.message}
                        <button onClick={() => setToast(prev => ({ ...prev, open: false }))} className="ml-4 hover:opacity-70 transition-opacity">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}