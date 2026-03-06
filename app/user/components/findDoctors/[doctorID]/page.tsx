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
            <div className="min-h-screen bg-industrial-50 flex flex-col items-center justify-center p-6 text-industrial-900">
                <Shield className="w-16 h-16 text-industrial-300 mb-6" />
                <h1 className="text-2xl font-bold text-industrial-900 mb-2">Doctor Not Found</h1>
                <p className="text-industrial-500 mt-2 text-center max-w-sm font-medium">The profile you are looking for does not exist or has been removed from our enterprise directory.</p>
                <Link href="/user/components/findDoctors" className="mt-8 px-8 py-3 bg-primary-600 text-white rounded-md font-bold hover:bg-primary-700 transition shadow-sm active:scale-[0.98]">
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
        <div className="min-h-screen bg-industrial-50 font-sans pb-24 text-industrial-900">
            {/* Header / Hero Section */}
            <div className="bg-white border-b border-industrial-200 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                <div className="container relative z-10 mx-auto px-6 max-w-6xl pt-10 pb-12">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-[13px] font-bold tracking-wide uppercase text-industrial-500 mb-8">
                        <Link href="/user/components/findDoctors" className="hover:text-primary-600 transition-colors">Find Doctors</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-industrial-900 truncate">Dr. {doc.DoctorName}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Doctor Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 md:w-36 md:h-36 bg-primary-50 text-primary-600 flex items-center justify-center rounded-lg border border-primary-100 shadow-sm relative z-10 overflow-hidden">
                                <span className="text-[3.5rem] font-extrabold tracking-tight">
                                    {doc.DoctorName.charAt(0)}
                                </span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-md border border-industrial-200 z-20 shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-primary-600" />
                            </div>
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 mb-4 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-[4px] border border-emerald-100 uppercase tracking-widest shadow-sm">
                                <HeartPulse className="w-3.5 h-3.5" />
                                <span>Verified Specialist</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-industrial-900 tracking-tight mb-3">
                                Dr. {doc.DoctorName}
                            </h1>
                            <div className="text-[17px] text-primary-600 font-bold mb-5 flex flex-wrap items-center gap-3">
                                {doc.hop_specialization?.SpecializationName || "General Practitioner"}
                                <span className="text-industrial-300 hidden md:inline">•</span>
                                <span className="text-industrial-600 font-medium flex items-center gap-1.5 bg-industrial-50 border border-industrial-200 px-3 py-1 rounded-[4px] text-sm">
                                    <Building className="w-4 h-4 text-industrial-400" />
                                    {doc.hop_hospital?.HospitalName || "Private Clinic"}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 border-t border-industrial-100 pt-5">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className={`w-4 h-4 ${star <= Math.round(averageRating) ? "text-amber-500 fill-amber-500" : "text-industrial-200 fill-industrial-200"}`} />
                                        ))}
                                    </div>
                                    <span className="font-extrabold text-industrial-900 ml-1.5 text-[15px]">{averageRating.toFixed(1)}</span>
                                    <span className="text-industrial-500 font-medium text-[13px] ml-1">({reviews.length} Reviews)</span>
                                </div>

                                <div className="w-px h-6 bg-industrial-200 hidden md:block"></div>

                                <div className="flex items-center gap-2 text-industrial-700 font-bold text-[14px]">
                                    <Activity className="w-4 h-4 text-emerald-500" />
                                    Accepting New Patients
                                </div>
                            </div>
                        </div>

                        {/* CTA Actions */}
                        <div className="w-full md:w-auto flex flex-col gap-4 shrink-0 bg-industrial-50 border border-industrial-200 p-6 rounded-lg shadow-sm">
                            <div className="text-center md:text-left mb-2">
                                <div className="text-[11px] font-bold tracking-widest text-industrial-500 uppercase mb-1">Consultation</div>
                                <div className="text-industrial-900 font-extrabold text-4xl">$50<span className="text-lg text-industrial-400 font-medium ml-1">/visit</span></div>
                            </div>
                            <Link
                                href={`/user/components/hop/appointment/bookAppointment?doctorId=${doc.DoctorID}`}
                                className="flex items-center justify-center gap-2 w-full md:w-64 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-[4px] font-bold transition-all shadow-sm group/btn active:scale-[0.98]"
                            >
                                <span>Book Appointment</span>
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content Details */}
            <div className="container mx-auto px-6 max-w-6xl mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-8 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                        {/* About Section */}
                        <div className="bg-white p-8 rounded-lg border border-industrial-200 shadow-sm">
                            <h2 className="text-[14px] font-bold text-industrial-500 tracking-widest uppercase flex items-center gap-2 mb-4 border-b border-industrial-100 pb-3">
                                <Shield className="w-4 h-4 text-primary-500" />
                                About Doctor
                            </h2>
                            <p className="text-industrial-700 leading-relaxed font-medium">
                                {doc.Description || `Dr. ${doc.DoctorName} is a highly qualified ${doc.hop_specialization?.SpecializationName || "physician"} committed to providing exceptional care within the enterprise healthcare network. With extensive experience and a dedication to staying current with the latest medical advancements, Dr. ${doc.DoctorName.split(' ')[0]} offers a compassionate and comprehensive approach to patient health and organizational wellness.`}
                            </p>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white p-8 rounded-lg border border-industrial-200 shadow-sm">
                            <div className="flex items-center justify-between mb-6 border-b border-industrial-100 pb-3">
                                <h2 className="text-[14px] font-bold text-industrial-500 tracking-widest uppercase flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500" />
                                    Patient Reviews
                                </h2>
                                <span className="px-3 py-1 bg-industrial-100 text-industrial-600 font-bold text-[12px] rounded border border-industrial-200">{reviews.length} Total</span>
                            </div>

                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.DoctorReviewID} className="p-6 rounded-[4px] bg-industrial-50 border border-industrial-200">
                                            <div className="flex items-center justify-between mb-3 border-b border-industrial-100 pb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded shrink-0 bg-industrial-200 flex items-center justify-center text-industrial-600 font-bold text-sm">
                                                        {review.hop_patient?.PatientName?.charAt(0) || "A"}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-industrial-900 text-[14px]">{review.hop_patient?.PatientName || "Anonymous Patient"}</div>
                                                        <div className="flex gap-0.5 mt-0.5">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <Star key={s} className={`w-3.5 h-3.5 ${s <= review.Rating ? "text-amber-500 fill-amber-500" : "text-industrial-300 fill-industrial-300"}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-[12px] text-industrial-400 border border-industrial-200 bg-white px-2 py-1 flex rounded font-mono font-medium tracking-tight">
                                                    {new Date(review.Created).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <p className="text-industrial-700 text-[14px] font-medium leading-relaxed">
                                                {review.ReviewText || "No detailed review provided in the system logs."}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 px-4 bg-industrial-50 rounded border border-industrial-200 border-dashed">
                                    <Activity className="w-8 h-8 text-industrial-400 mx-auto mb-3" />
                                    <p className="text-industrial-600 font-bold">No reviews logged.</p>
                                    <p className="text-[13px] text-industrial-500 mt-1 font-medium">Be the first to insert a review into the system after your visit.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="space-y-6 animate-slideUpFade" style={{ animationDelay: "0.2s" }}>
                        {/* Location Details */}
                        <div className="bg-white p-6 rounded-lg border border-industrial-200 shadow-sm">
                            <h3 className="text-[14px] font-bold text-industrial-500 tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-industrial-100 pb-3">
                                <MapPin className="w-4 h-4 text-red-500" />
                                Practice Location
                            </h3>
                            <div className="bg-industrial-50 p-4 rounded-[4px] border border-industrial-200 mb-5 relative overflow-hidden group hover:border-industrial-300 transition-colors cursor-default">
                                <div className="font-bold text-industrial-900 text-lg mb-1 relative z-10">
                                    {doc.hop_hospital?.HospitalName || "Private Clinic"}
                                </div>
                                <p className="text-industrial-600 text-[14px] leading-relaxed font-medium relative z-10">
                                    {doc.hop_hospital?.Address || "123 Healthcare Ave, Medical District"}
                                    {doc.hop_hospital?.loc_city?.CityName && `, ${doc.hop_hospital?.loc_city?.CityName}`}
                                    {doc.hop_hospital?.loc_city?.loc_state?.StateName && `, ${doc.hop_hospital?.loc_city?.loc_state?.StateName}`}
                                </p>
                            </div>

                            <div className="w-full h-32 bg-industrial-100 rounded-[4px] border border-industrial-200 flex items-center justify-center relative shadow-inner overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                                <div className="w-10 h-10 bg-industrial-900 rounded-md flex items-center justify-center border-2 border-white relative z-10 shadow-md">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-white p-6 rounded-lg border border-industrial-200 shadow-sm">
                            <h3 className="text-[14px] font-bold text-industrial-500 tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-industrial-100 pb-3">
                                <Calendar className="w-4 h-4 text-emerald-600" />
                                Working Hours
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { day: "Monday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Tuesday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Wednesday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Thursday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Friday", hours: "09:00 AM - 04:00 PM" },
                                    { day: "Saturday", hours: "Closed", closed: true },
                                    { day: "Sunday", hours: "Closed", closed: true },
                                ].map((schedule) => (
                                    <li key={schedule.day} className="flex justify-between items-center bg-industrial-50 px-3 py-2 rounded-[4px] border border-industrial-100">
                                        <span className={`font-bold text-[13px] uppercase tracking-wide ${schedule.closed ? 'text-industrial-400' : 'text-industrial-700'}`}>{schedule.day}</span>
                                        <span className={`font-medium text-[13px] ${schedule.closed ? 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded-[2px] border border-rose-100 tracking-wide uppercase font-bold' : 'text-industrial-900 font-mono'}`}>
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