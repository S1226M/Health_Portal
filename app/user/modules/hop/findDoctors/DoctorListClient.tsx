"use client";

import React, { useState, useMemo } from "react";
import { Search, MapPin, Star, Clock, ShieldCheck, HeartPulse, CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function DoctorListClient({
    initialDoctors,
    specId,
    initialSearch = ""
}: {
    initialDoctors: any[],
    specId?: number | null,
    initialSearch?: string
}) {
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    const filteredDoctors = useMemo(() => {
        let docs = initialDoctors;

        if (!searchQuery.trim()) {
            if (specId) {
                return docs.filter(doc => doc.hop_specialization?.SpecializationID === specId || doc.SpecializationID === specId);
            }
            return docs;
        }

        const query = searchQuery.toLowerCase();

        return docs.filter((doc) => {
            const nameMatch = doc.DoctorName?.toLowerCase().includes(query);
            const specMatch = doc.hop_specialization?.SpecializationName?.toLowerCase().includes(query);
            const hospMatch = doc.hop_hospital?.HospitalName?.toLowerCase().includes(query);

            return nameMatch || specMatch || hospMatch;
        });
    }, [initialDoctors, searchQuery, specId]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute top-20 right-20 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

                <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl pt-24 pb-32 animate-slideUpFade">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[13px] font-bold text-primary-200 bg-white/10 rounded-full border border-white/10 uppercase tracking-widest backdrop-blur-sm">
                        <HeartPulse className="w-4 h-4" />
                        <span>Premium Healthcare Professionals</span>
                    </div>

                    <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                        Find Your <span className="text-primary-300">Perfect Doctor</span>
                    </h1>

                    <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
                        Connect with top-rated medical specialists in your area. Book appointments effortlessly and take control of your health today.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 relative z-20">
                        <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all">
                            <Search className="w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search doctors, specialties, or clinics..."
                                className="w-full bg-transparent border-none outline-none px-3 py-3 text-slate-900 placeholder:text-slate-400 text-[15px] font-medium"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                                    <X className="w-4 h-4 text-slate-500" />
                                </button>
                            )}
                        </div>
                        <button className="px-8 py-3 gradient-primary text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
                            Search Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="container max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-24 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Available Specialists</h2>
                    <div className="px-4 py-2 bg-primary-50 border border-primary-200 text-primary-700 rounded-xl text-[13px] font-bold tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Available
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredDoctors.map((doc) => (
                        <div
                            key={doc.DoctorID}
                            className="group card-premium gradient-card-hover p-6 flex flex-col relative"
                        >
                            <div className="relative z-10 flex items-start gap-4 mb-5">
                                <div className="w-14 h-14 rounded-2xl gradient-primary text-white flex items-center justify-center shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                                    <span className="text-xl font-bold tracking-tight">
                                        {doc.DoctorName.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h3 className="text-[17px] font-bold text-slate-900 truncate group-hover:text-primary-700 transition-colors" title={doc.DoctorName}>
                                            {doc.DoctorName}
                                        </h3>
                                        <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" />
                                    </div>
                                    <p className="text-primary-600 font-semibold text-[13px] mb-1.5 truncate">
                                        {doc.hop_specialization?.SpecializationName || "General Practitioner"}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                        ))}
                                        <span className="text-slate-500 text-[12px] font-bold ml-1.5">(4.9)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2.5 mb-6 relative z-10 flex-1 border-t border-b border-slate-100 py-4">
                                <div className="flex items-center gap-3 text-slate-600 text-[14px]">
                                    <div className="w-7 h-7 flex items-center justify-center shrink-0 rounded-lg bg-slate-50 text-slate-400">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="truncate font-medium">
                                        {doc.hop_hospital?.HospitalName || "Private Clinic"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 text-[14px]">
                                    <div className="w-7 h-7 flex items-center justify-center shrink-0 rounded-lg bg-slate-50 text-slate-400">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Mon – Fri, 9AM – 5PM</span>
                                </div>
                            </div>

                            <div className="pt-4 mt-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Consultation</span>
                                    <span className="text-slate-900 font-extrabold text-2xl leading-none">
                                        {doc.Consultation_Fee ? `₹${Number(doc.Consultation_Fee).toFixed(0)}` : "Contact"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 relative z-10 mt-1">
                                    <Link
                                        href={`/user/modules/hop/findDoctors/${doc.DoctorID}`}
                                        className="flex items-center justify-center px-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all duration-200 text-[13px] active:scale-[0.98] no-underline"
                                    >
                                        Details
                                    </Link>
                                    <Link
                                        href={`/user/modules/hop/appointment/bookAppointment?doctorId=${doc.DoctorID}`}
                                        className="flex items-center justify-center px-2 py-2.5 gradient-primary text-white rounded-xl font-bold transition-all duration-200 text-[13px] shadow-sm hover:shadow-md active:scale-[0.98] no-underline"
                                    >
                                        Book
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredDoctors.length === 0 && (
                        <div className="col-span-full py-24 bg-white rounded-2xl border border-slate-200 text-center shadow-sm flex flex-col items-center justify-center">
                            <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No Results Found</h3>
                            <p className="text-slate-500 max-w-md mx-auto font-medium text-[15px]">
                                {searchQuery
                                    ? `We couldn't find any specialist matching "${searchQuery}". Please try adjusting your search terms.`
                                    : "We couldn't find any specialist matching your criteria at the moment. Please check back later."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
