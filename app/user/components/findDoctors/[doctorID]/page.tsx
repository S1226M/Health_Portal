import React from "react";
import { getDoctorById } from "@/app/user/modules/appointments/action/getDoctorById";
import { MapPin, Star, Clock, HeartPulse, ChevronRight, CheckCircle2, Building, Shield, Activity, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DoctorProfilePage({ params }: { params: Promise<{ doctorID: string }> }) {
    const resolvedParams = await params;
    const doctorId = Number(resolvedParams.doctorID);

    if (isNaN(doctorId)) {
        notFound();
    }

    const doc = await getDoctorById(doctorId);

    if (!doc) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <Shield className="w-16 h-16 text-slate-300 mb-4" />
                <h1 className="text-2xl font-bold text-slate-800">Doctor Not Found</h1>
                <p className="text-slate-500 mt-2 text-center max-w-sm">The profile you are looking for does not exist or has been removed.</p>
                <Link href="/user/components/findDoctors" className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
                    Back to Search
                </Link>
            </div>
        );
    }

    const reviews = doc.hop_doctorreview || [];
    const averageRating = reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.Rating, 0) / reviews.length
        : 4.9; // Base placeholder if no reviews exist in db

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Header / Hero Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="relative pt-12 pb-16 overflow-hidden">
                    <div className="absolute inset-0 z-0 border-b border-slate-100">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-blue-50/50 to-transparent"></div>
                        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] opacity-60"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[30rem] h-[30rem] bg-indigo-100/30 rounded-full blur-[100px] opacity-60"></div>
                    </div>

                    <div className="container relative z-10 mx-auto px-4 max-w-6xl">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-8">
                            <Link href="/user/components/findDoctors" className="hover:text-blue-600 transition-colors">Find Doctors</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-slate-900 truncate">Dr. {doc.DoctorName}</span>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            {/* Doctor Avatar */}
                            <div className="relative shrink-0">
                                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full"></div>
                                <div className="w-32 h-32 md:w-40 md:w-40 bg-gradient-to-br from-blue-100 to-indigo-50 text-blue-600 flex items-center justify-center rounded-3xl border-4 border-white shadow-xl relative z-10 overflow-hidden">
                                    <span className="text-5xl md:text-6xl font-extrabold shadow-sm">
                                        {doc.DoctorName.charAt(0)}
                                    </span>
                                </div>
                                <div className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full z-20 shadow-md">
                                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>

                            {/* Doctor Info */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100 shadow-sm">
                                    <HeartPulse className="w-3.5 h-3.5" />
                                    <span>Verified Specialist</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                                    Dr. {doc.DoctorName}
                                </h1>
                                <p className="text-lg text-blue-600 font-medium mb-4 flex items-center gap-2">
                                    {doc.hop_specialization?.SpecializationName || "General Practitioner"}
                                    <span className="text-slate-300">•</span>
                                    <span className="text-slate-600 font-normal flex items-center gap-1.5">
                                        <Building className="w-4 h-4" />
                                        {doc.hop_hospital?.HospitalName || "Private Clinic"}
                                    </span>
                                </p>

                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className={`w-5 h-5 ${star <= Math.round(averageRating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}`} />
                                            ))}
                                        </div>
                                        <span className="font-bold text-slate-800 ml-1">{averageRating.toFixed(1)}</span>
                                        <span className="text-slate-500 font-medium">({reviews.length} Reviews)</span>
                                    </div>

                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden md:block"></div>

                                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                                        <Activity className="w-5 h-5 text-green-500" />
                                        Accepting New Patients
                                    </div>
                                </div>
                            </div>

                            {/* CTA Actions */}
                            <div className="w-full md:w-auto flex flex-col gap-3 shrink-0 bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm">
                                <div className="text-center mb-1">
                                    <div className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">Consultation Fee</div>
                                    <div className="text-slate-900 font-extrabold text-3xl">$50<span className="text-lg text-slate-400 font-medium">/visit</span></div>
                                </div>
                                <Link
                                    href={`/user/components/hop/appointment/bookAppointment?doctorId=${doc.DoctorID}`}
                                    className="flex items-center justify-center gap-2 w-full md:w-64 py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                                >
                                    <span>Book Appointment Now</span>
                                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content Details */}
            <div className="container mx-auto px-4 max-w-6xl mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Shield className="w-4 h-4" />
                                </span>
                                About Doctor
                            </h2>
                            <p className="text-slate-600 leading-relaxed min-h-[100px]">
                                {doc.Description || `Dr. ${doc.DoctorName} is a highly qualified ${doc.hop_specialization?.SpecializationName || "physician"} committed to providing exceptional care. With extensive experience and a dedication to staying current with the latest medical advancements, Dr. ${doc.DoctorName.split(' ')[0]} offers a compassionate and comprehensive approach to patient health.`}
                            </p>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                                        <Star className="w-4 h-4 fill-current" />
                                    </span>
                                    Patient Reviews
                                </h2>
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 font-medium text-sm rounded-lg">{reviews.length} Total</span>
                            </div>

                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.DoctorReviewID} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                                                    {review.hop_patient?.PatientName?.charAt(0) || "A"}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-slate-900 text-sm">{review.hop_patient?.PatientName || "Anonymous Patient"}</div>
                                                    <div className="flex gap-0.5 mt-0.5">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star key={s} className={`w-3 h-3 ${s <= review.Rating ? "text-amber-400 fill-amber-400" : "text-slate-300 fill-slate-300"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-slate-400 font-medium">
                                                    {new Date(review.Created).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm ml-10 leading-relaxed">
                                                {review.ReviewText || "No detailed review provided."}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 px-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <Activity className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500 font-medium">No reviews yet for this doctor.</p>
                                    <p className="text-sm text-slate-400 mt-1">Be the first to leave a review after your visit!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="space-y-6">
                        {/* Location Details */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                                    <MapPin className="w-4 h-4" />
                                </span>
                                Practice Location
                            </h3>
                            <div className="font-semibold text-slate-900 text-lg mb-1">
                                {doc.hop_hospital?.HospitalName || "Private Clinic"}
                            </div>
                            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                                {doc.hop_hospital?.Address || "123 Healthcare Ave, Medical District"}
                                {doc.hop_hospital?.loc_city?.CityName && `, ${doc.hop_hospital?.loc_city?.CityName}`}
                                {doc.hop_hospital?.loc_city?.loc_state?.StateName && `, ${doc.hop_hospital?.loc_city?.loc_state?.StateName}`}
                            </p>

                            <div className="w-full h-32 bg-slate-100 rounded-xl overflow-hidden relative">
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce shadow-red-500/30">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                                    <Calendar className="w-4 h-4" />
                                </span>
                                Working Hours
                            </h3>
                            <ul className="space-y-3 text-sm">
                                {[
                                    { day: "Monday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Tuesday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Wednesday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Thursday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Friday", hours: "09:00 AM - 04:00 PM" },
                                    { day: "Saturday", hours: "Closed", closed: true },
                                    { day: "Sunday", hours: "Closed", closed: true },
                                ].map((schedule) => (
                                    <li key={schedule.day} className="flex justify-between items-center">
                                        <span className={`font-medium ${schedule.closed ? 'text-slate-400' : 'text-slate-700'}`}>{schedule.day}</span>
                                        <span className={`font-medium ${schedule.closed ? 'text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md' : 'text-slate-600'}`}>
                                            {schedule.hours}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}