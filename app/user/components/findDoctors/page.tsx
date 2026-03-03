import React from "react";
import { getAllDoctor } from "@/app/user/modules/appointments/action/getAllDoctor";
import { getDoctorBySpecializationId } from "@/app/user/modules/appointments/action/getDoctorBySpecializationId";
import { Search, MapPin, Star, Clock, ShieldCheck, HeartPulse, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function FindDoctorPage({ searchParams }: { searchParams: Promise<{ specId?: string }> }) {
    const resolvedParams = await searchParams;
    const specId = resolvedParams.specId ? parseInt(resolvedParams.specId) : null;

    // Fetch specifically by specialization if specId is passed!
    const allDoctors = specId && !isNaN(specId)
        ? await getDoctorBySpecializationId(specId)
        : await getAllDoctor();

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className="relative pt-24 pb-32 overflow-hidden bg-white">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 z-0 border-b border-slate-100">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-100 rounded-full blur-[80px] opacity-60"></div>
                    <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[30rem] h-[30rem] bg-violet-100 rounded-full blur-[100px] opacity-60"></div>
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold text-blue-700 bg-blue-50/80 rounded-full border border-blue-200/50 backdrop-blur-md shadow-sm">
                        <HeartPulse className="w-4 h-4" />
                        <span>Premium Healthcare Professionals</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Perfect Doctor</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Connect with top-rated medical specialists in your area. Book appointments effortlessly and take control of your health today.
                    </p>

                    {/* Aesthetic Mock Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col sm:flex-row gap-3 relative z-20">
                        <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <Search className="w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search doctors, specialties, or clinics..."
                                className="w-full bg-transparent border-none outline-none px-3 py-3.5 text-slate-700 placeholder:text-slate-400"
                            />
                        </div>
                        <button className="px-8 py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap">
                            Search Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="container mx-auto px-4 pb-24 -mt-8 relative z-20">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Available Specialists</h2>
                    <div className="px-4 py-2 bg-white shadow-sm border border-slate-200 text-slate-600 rounded-full text-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        {allDoctors.length} Doctors Available
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {allDoctors.map((doc) => (
                        <div
                            key={doc.DoctorID}
                            className="group bg-white rounded-3xl p-1 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden"
                        >
                            <div className="p-6 h-full flex flex-col bg-white rounded-[22px] relative overflow-hidden">
                                {/* Decorative background hover flair */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent -translate-y-16 translate-x-16 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out z-0"></div>

                                <div className="relative z-10 flex items-start gap-4 mb-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:shadow-md transition-all duration-300">
                                        <span className="text-2xl font-bold">
                                            {doc.DoctorName.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0 pt-1">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <h3 className="text-lg font-bold text-slate-900 truncate" title={doc.DoctorName}>
                                                {doc.DoctorName}
                                            </h3>
                                            <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                                        </div>
                                        <p className="text-blue-600 font-medium text-sm mb-2 truncate">
                                            {doc.hop_specialization?.SpecializationName || "General Practitioner"}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                            ))}
                                            <span className="text-slate-400 text-xs font-medium ml-1.5">(4.9)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 relative z-10 flex-1">
                                    <div className="flex items-center gap-3 text-slate-600 text-sm p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                                            <MapPin className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="truncate font-medium">
                                            {doc.hop_hospital?.HospitalName || "Private Clinic"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 text-sm p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                                            <Clock className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="font-medium">Mon - Fri, 9AM - 5PM</span>
                                    </div>
                                </div>

                                <div className="pt-5 border-t border-slate-100/80 flex items-center justify-between gap-3 relative z-10 mt-auto">
                                    <div>
                                        <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-0.5">Consultation</div>
                                        <div className="text-slate-900 font-extrabold text-xl">$50</div>
                                    </div>
                                    <div className="flex-1 flex gap-2">
                                        <Link
                                            href={`/user/components/findDoctors/${doc.DoctorID}`}
                                            className="flex-1 flex items-center justify-center px-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-300 text-sm"
                                        >
                                            Details
                                        </Link>
                                        <Link
                                            href={`/user/components/hop/appointment/bookAppointment?doctorId=${doc.DoctorID}`}
                                            className="flex-[1.5] flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300 group/btn text-sm"
                                        >
                                            <span className="relative z-10">Book Now</span>
                                            <ChevronRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {allDoctors.length === 0 && (
                        <div className="col-span-full py-24 bg-white rounded-3xl border border-slate-100 text-center shadow-sm">
                            <ShieldCheck className="w-20 h-20 mx-auto mb-6 text-slate-200" />
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">No Doctors Found</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                We couldn't find any specialist matching your criteria at the moment. Please check back later.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}