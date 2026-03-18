import React from "react";
import { getDoctorById } from "@/app/user/modules/hop/appointment/action/getDoctorById";
import { MapPin, Star, Clock, HeartPulse, ChevronRight, CheckCircle2, Building, Shield, Activity, Calendar, Phone, Mail, CreditCard, Award, Users, Stethoscope, IndianRupee, ChevronLeft } from "lucide-react";
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
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                    <Shield className="w-10 h-10 text-slate-300" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Doctor Not Found</h1>
                <p className="text-slate-500 mt-2 text-center max-w-sm font-medium">The profile you are looking for does not exist or has been removed.</p>
                <Link href="/user/modules/hop/findDoctors" className="mt-8 px-8 py-3 gradient-primary text-white rounded-xl font-bold hover:opacity-90 transition shadow-md active:scale-[0.98] no-underline">
                    Back to Search
                </Link>
            </div>
        );
    }

    const reviews = doc.hop_doctorreview || [];
    const averageRating = reviews.length > 0
        ? reviews.reduce((acc: number, r: any) => acc + r.Rating, 0) / reviews.length
        : 0;

    const experienceYears = Math.max(0, Math.floor((new Date().getTime() - new Date(doc.Created).getTime()) / (1000 * 60 * 60 * 24 * 365)));
    const availableSlots = doc.hop_doctor_slot_mapping?.filter((slot: any) => slot.IsActive !== false) || [];
    const upcomingAppointments = doc.hop_appointment?.length || 0;
    const consultationFee = doc.Consultation_Fee ? Number(doc.Consultation_Fee) : null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute top-10 right-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-0 left-20 w-48 h-48 bg-accent-400/5 rounded-full blur-3xl" />

                <div className="container relative z-10 mx-auto px-6 max-w-6xl pt-10 pb-16">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-primary-200 mb-8">
                        <Link href="/user/modules/hop/findDoctors" className="hover:text-white transition-colors flex items-center gap-1 no-underline text-primary-200">
                            <ChevronLeft className="w-4 h-4" /> Find Doctors
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-primary-400" />
                        <span className="text-white truncate">Dr. {doc.DoctorName}</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Doctor Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 md:w-36 md:h-36 gradient-primary text-white flex items-center justify-center rounded-2xl shadow-xl relative z-10 ring-4 ring-white/10">
                                <span className="text-[3.5rem] font-extrabold tracking-tight">
                                    {doc.DoctorName.charAt(0)}
                                </span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-md z-20">
                                <CheckCircle2 className="w-5 h-5 text-primary-600" />
                            </div>
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 text-[11px] font-bold text-emerald-200 bg-emerald-500/20 rounded-full border border-emerald-400/30 uppercase tracking-widest backdrop-blur-sm">
                                <HeartPulse className="w-3.5 h-3.5" />
                                <span>Verified Specialist</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                                Dr. {doc.DoctorName}
                            </h1>
                            <div className="text-[17px] text-primary-200 font-bold mb-3 flex flex-wrap items-center gap-3">
                                {doc.hop_specialization?.SpecializationName || "General Practitioner"}
                                <span className="text-white/20 hidden md:inline">•</span>
                                <span className="text-slate-300 font-medium flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg text-sm backdrop-blur-sm">
                                    <Building className="w-4 h-4 text-primary-300" />
                                    {doc.hop_hospital?.HospitalName || "Private Clinic"}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 mb-5">
                                {experienceYears > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <Award className="w-4 h-4 text-amber-400" />
                                        <span className="font-bold text-white text-[15px]">{experienceYears}+ Years Experience</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className={`w-4 h-4 ${star <= Math.round(averageRating) ? "text-amber-400 fill-amber-400" : "text-white/20 fill-white/20"}`} />
                                        ))}
                                    </div>
                                    <span className="font-extrabold text-white ml-1.5 text-[15px]">{averageRating > 0 ? averageRating.toFixed(1) : "New"}</span>
                                    <span className="text-slate-400 font-medium text-[13px] ml-1">({reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'})</span>
                                </div>
                            </div>

                            <div className="text-slate-300 text-[15px] leading-relaxed font-medium max-w-2xl">
                                {doc.Description || `Dr. ${doc.DoctorName} is a highly qualified ${doc.hop_specialization?.SpecializationName || "physician"} committed to providing exceptional care.`}
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="w-full md:w-auto flex flex-col gap-4 shrink-0 glass-dark p-6 rounded-2xl shadow-xl">
                            <div className="text-center md:text-left mb-2">
                                <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1">Consultation</div>
                                <div className="text-white font-extrabold text-4xl flex items-center justify-center md:justify-start">
                                    {consultationFee !== null ? (
                                        <>
                                            <IndianRupee className="w-7 h-7" />
                                            {consultationFee.toFixed(0)}
                                        </>
                                    ) : (
                                        <span className="text-xl text-slate-400">Contact for Fee</span>
                                    )}
                                    {consultationFee !== null && <span className="text-lg text-slate-400 font-medium ml-1">/visit</span>}
                                </div>
                            </div>
                            <Link
                                href={`/user/modules/hop/appointment/bookAppointment?doctorId=${doc.DoctorID}`}
                                className="flex items-center justify-center gap-2 w-full md:w-64 py-3.5 gradient-primary text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl group/btn active:scale-[0.98] no-underline"
                            >
                                <span>Book Appointment</span>
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 max-w-6xl mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                        {/* About */}
                        <div className="card-premium p-8">
                            <h2 className="text-sm font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                                <Shield className="w-4 h-4 text-primary-500" />
                                About Doctor
                            </h2>
                            <div className="space-y-4">
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {doc.Description || `Dr. ${doc.DoctorName} is a highly qualified ${doc.hop_specialization?.SpecializationName || "physician"} committed to providing exceptional care. With extensive experience and a dedication to staying current with the latest medical advancements, Dr. ${doc.DoctorName.split(' ')[0]} offers a compassionate and comprehensive approach to patient health.`}
                                </p>
                                {doc.hop_specialization?.Description && (
                                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                                        <h3 className="font-bold text-primary-800 mb-2">Specialization Focus</h3>
                                        <p className="text-primary-700 text-sm leading-relaxed">{doc.hop_specialization.Description}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Treatments */}
                        {doc.hop_hospital?.hop_hospitaltreatment && doc.hop_hospital.hop_hospitaltreatment.length > 0 && (
                            <div className="card-premium p-8">
                                <h2 className="text-sm font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                                    <Stethoscope className="w-4 h-4 text-emerald-500" />
                                    Treatments Offered
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {doc.hop_hospital.hop_hospitaltreatment.map((treatment: any) => (
                                        <div key={treatment.HospitalTreatmentID} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                            <span className="text-slate-700 font-medium text-sm">{treatment.hop_treatmenttype?.TreatmentTypeName}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Time Slots */}
                        {availableSlots.length > 0 && (
                            <div className="card-premium p-8">
                                <h2 className="text-sm font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                                    <Clock className="w-4 h-4 text-blue-500" />
                                    Available Time Slots
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {availableSlots.slice(0, 6).map((slot: any) => (
                                        <div key={slot.MappingID} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                <span className="text-blue-700 font-medium text-sm">
                                                    {slot.hop_timeslot_master?.SlotName || "Time slot"}
                                                </span>
                                            </div>
                                            <span className="text-xs text-blue-600 bg-blue-100 px-2.5 py-1 rounded-lg font-bold">
                                                Available
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {availableSlots.length > 6 && (
                                    <p className="text-slate-500 text-sm mt-3 text-center">
                                        And {availableSlots.length - 6} more time slots available
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Reviews */}
                        <div className="card-premium p-8">
                            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
                                <h2 className="text-sm font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500" />
                                    Patient Reviews
                                </h2>
                                <div className="flex items-center gap-3">
                                    {averageRating > 0 && (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 font-bold text-[13px] rounded-lg border border-amber-200">
                                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                            {averageRating.toFixed(1)} Avg
                                        </div>
                                    )}
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[12px] rounded-lg border border-slate-200">{reviews.length} Total</span>
                                </div>
                            </div>

                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.slice(0, 5).map((review: any) => (
                                        <div key={review.DoctorReviewID} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                                            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl shrink-0 gradient-primary flex items-center justify-center text-white font-bold text-sm">
                                                        {review.hop_patient?.PatientName?.charAt(0) || "A"}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 text-[14px]">{review.hop_patient?.PatientName || "Anonymous Patient"}</div>
                                                        <div className="flex gap-0.5 mt-0.5">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <Star key={s} className={`w-3.5 h-3.5 ${s <= review.Rating ? "text-amber-400 fill-amber-400" : "text-slate-300 fill-slate-300"}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-[12px] text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                                                    {new Date(review.Created).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-[14px] font-medium leading-relaxed">
                                                {review.ReviewText || "No detailed review provided."}
                                            </p>
                                        </div>
                                    ))}
                                    {reviews.length > 5 && (
                                        <div className="text-center pt-4">
                                            <p className="text-slate-500 text-sm">And {reviews.length - 5} more reviews...</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                                    <Activity className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-600 font-bold">No reviews yet.</p>
                                    <p className="text-[13px] text-slate-500 mt-1 font-medium">Be the first to leave a review after your visit.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 animate-slideUpFade" style={{ animationDelay: "0.2s" }}>
                        {/* Hospital Details */}
                        <div className="card-premium p-6">
                            <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Building className="w-4 h-4 text-indigo-500" />
                                Hospital Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="font-bold text-slate-900 text-lg mb-1">
                                        {doc.hop_hospital?.HospitalName || "Private Clinic"}
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {doc.hop_hospital?.Address || "Contact hospital for address"}
                                    </p>
                                    <p className="text-slate-500 text-sm mt-1">
                                        {doc.hop_hospital?.loc_city?.CityName}
                                        {doc.hop_hospital?.loc_city?.loc_state?.StateName && `, ${doc.hop_hospital?.loc_city?.loc_state?.StateName}`}
                                        {doc.hop_hospital?.loc_city?.loc_state?.loc_country?.CountryName && `, ${doc.hop_hospital?.loc_city?.loc_state?.loc_country?.CountryName}`}
                                    </p>
                                </div>
                                {doc.hop_hospital?.OpeningDate && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-emerald-500" />
                                        <span className="text-slate-600">Established: {new Date(doc.hop_hospital.OpeningDate).getFullYear()}</span>
                                    </div>
                                )}
                                {doc.hop_hospital?.RegistrationCharge && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <CreditCard className="w-4 h-4 text-blue-500" />
                                        <span className="text-slate-600">Registration: ₹{Number(doc.hop_hospital.RegistrationCharge).toFixed(2)}</span>
                                    </div>
                                )}
                                {doc.hop_hospital?.pay_paymentmode && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <CreditCard className="w-4 h-4 text-green-500" />
                                        <span className="text-slate-600">Payment: {doc.hop_hospital.pay_paymentmode.PaymentModeName}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="card-premium p-6">
                            <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Activity className="w-4 h-4 text-purple-500" />
                                Quick Stats
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                                    <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                    <div className="text-2xl font-extrabold text-purple-700">{reviews.length}</div>
                                    <div className="text-xs text-purple-600 font-bold uppercase tracking-wide">Reviews</div>
                                </div>
                                <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                    <Calendar className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                    <div className="text-2xl font-extrabold text-emerald-700">{upcomingAppointments}</div>
                                    <div className="text-xs text-emerald-600 font-bold uppercase tracking-wide">Appts</div>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                                    <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                    <div className="text-2xl font-extrabold text-blue-700">{availableSlots.length}</div>
                                    <div className="text-xs text-blue-600 font-bold uppercase tracking-wide">Slots</div>
                                </div>
                                <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
                                    <Award className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                                    <div className="text-2xl font-extrabold text-amber-700">{experienceYears > 0 ? `${experienceYears}+` : "New"}</div>
                                    <div className="text-xs text-amber-600 font-bold uppercase tracking-wide">Yrs Exp</div>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="card-premium p-6">
                            <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Calendar className="w-4 h-4 text-emerald-600" />
                                Working Hours
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    { day: "Monday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Tuesday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Wednesday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Thursday", hours: "09:00 AM - 05:00 PM" },
                                    { day: "Friday", hours: "09:00 AM - 04:00 PM" },
                                    { day: "Saturday", hours: "Closed", closed: true },
                                    { day: "Sunday", hours: "Closed", closed: true },
                                ].map((schedule) => (
                                    <li key={schedule.day} className="flex justify-between items-center bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-100">
                                        <span className={`font-bold text-[13px] ${schedule.closed ? 'text-slate-400' : 'text-slate-700'}`}>{schedule.day}</span>
                                        <span className={`font-medium text-[13px] ${schedule.closed ? 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100 font-bold text-[11px] uppercase tracking-wider' : 'text-slate-600 font-mono'}`}>
                                            {schedule.hours}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="card-premium p-6">
                            <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Phone className="w-4 h-4 text-primary-500" />
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Phone</div>
                                        <div className="text-slate-500 text-sm">Contact hospital for appointment</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Email</div>
                                        <div className="text-slate-500 text-sm">info@{doc.hop_hospital?.HospitalName?.toLowerCase().replace(/\s+/g, '') || 'hospital'}.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">Location</div>
                                        <div className="text-slate-500 text-sm">{doc.hop_hospital?.loc_city?.CityName || 'City'}, {doc.hop_hospital?.loc_city?.loc_state?.StateName || 'State'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}