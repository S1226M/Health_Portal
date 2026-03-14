"use client";

import React, { useState, useMemo } from "react";
import { Search, MapPin, Star, Clock, ShieldCheck, HeartPulse, CheckCircle2 } from "lucide-react";
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

    // Dynamic Search Filter Logic
    const filteredDoctors = useMemo(() => {
        let docs = initialDoctors;

        // If no search query is typed but a specialty was selected, filter by specialty
        // Otherwise, if a search query is typed, search ALL doctors (ignoring specId to allow global search)
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
        <div className="min-h-screen bg-industrial-50 font-sans text-industrial-900">
            {/* Hero Section */}
            <div className="relative pt-20 pb-28 border-b border-industrial-200 bg-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl animate-slideUpFade">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-[13px] font-bold text-primary-700 bg-primary-50 rounded-[4px] border border-primary-200 uppercase tracking-widest shadow-sm">
                        <HeartPulse className="w-4 h-4" />
                        <span>Premium Healthcare Professionals</span>
                    </div>

                    <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-industrial-900 tracking-tight leading-[1.1] mb-6">
                        Find Your <span className="text-primary-600">Perfect Doctor</span>
                    </h1>

                    <p className="text-lg text-industrial-600 mb-10 max-w-2xl mx-auto font-medium">
                        Connect with top-rated medical specialists in your area. Book appointments effortlessly and take control of your health today.
                    </p>

                    {/* Functional Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-sm border border-industrial-200 flex flex-col md:flex-row gap-2 relative z-20 group">
                        <div className="flex-1 flex items-center px-4 bg-industrial-50 rounded-md border border-industrial-200 focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-transparent transition-all">
                            <Search className="w-5 h-5 text-industrial-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search doctors, specialties, or clinics..."
                                className="w-full bg-transparent border-none outline-none px-3 py-3 text-industrial-900 placeholder:text-industrial-400 text-[15px] font-medium"
                            />
                        </div>
                        <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-semibold transition-colors shadow-sm whitespace-nowrap active:scale-[0.98]">
                            Search Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="container max-w-7xl mx-auto px-6 -mt-8 relative z-20 pb-24 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-industrial-200 pb-4 bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold text-industrial-900 tracking-tight">Available Specialists</h2>
                    <div className="px-3 py-1.5 bg-white border border-industrial-200 text-industrial-600 rounded-md text-[13px] font-bold tracking-wide flex items-center gap-2 uppercase">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Available
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDoctors.map((doc) => (
                        <div
                            key={doc.DoctorID}
                            className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md border border-industrial-200 hover:border-primary-600 transition-all duration-200 flex flex-col relative"
                        >
                            <div className="relative z-10 flex items-start gap-4 mb-5">
                                <div className="w-14 h-14 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                    <span className="text-xl font-bold tracking-tight">
                                        {doc.DoctorName.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <h3 className="text-[17px] font-bold text-industrial-900 truncate group-hover:text-primary-600 transition-colors" title={doc.DoctorName}>
                                            {doc.DoctorName}
                                        </h3>
                                        <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" />
                                    </div>
                                    <p className="text-primary-600 font-medium text-[13px] mb-1.5 truncate">
                                        {doc.hop_specialization?.SpecializationName || "General Practitioner"}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                        ))}
                                        <span className="text-industrial-500 text-[12px] font-bold ml-1.5">(4.9)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6 relative z-10 flex-1 border-t border-b border-industrial-100 py-4">
                                <div className="flex items-center gap-3 text-industrial-600 text-[14px]">
                                    <div className="w-6 h-6 flex items-center justify-center shrink-0 text-industrial-400">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="truncate font-medium">
                                        {doc.hop_hospital?.HospitalName || "Private Clinic"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-industrial-600 text-[14px]">
                                    <div className="w-6 h-6 flex items-center justify-center shrink-0 text-industrial-400">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Mon - Fri, 9AM - 5PM</span>
                                </div>
                            </div>

                            <div className="pt-4 mt-auto border-t border-industrial-100">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[11px] font-bold tracking-widest text-industrial-400 uppercase">Consultation</span>
                                    <span className="text-industrial-900 font-extrabold text-2xl leading-none">
                                        {doc.Consultation_Fee ? `₹${Number(doc.Consultation_Fee).toFixed(0)}` : "Contact"}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 relative z-10 mt-1">
                                    <Link
                                        href={`/user/modules/hop/findDoctors/${doc.DoctorID}`}
                                        className="flex items-center justify-center px-2 py-2.5 bg-industrial-100 hover:bg-industrial-200 text-industrial-700 rounded-[4px] font-bold transition-all duration-200 text-[13px] shadow-sm active:scale-[0.98]"
                                    >
                                        Details
                                    </Link>
                                    <Link
                                        href={`/user/modules/hop/appointment/bookAppointment?doctorId=${doc.DoctorID}`}
                                        className="flex items-center justify-center px-2 py-2.5 bg-industrial-900 hover:bg-primary-600 text-white rounded-[4px] font-bold transition-all duration-200 text-[13px] shadow-sm active:scale-[0.98]"
                                    >
                                        Book
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredDoctors.length === 0 && (
                        <div className="col-span-full py-24 bg-industrial-50 rounded-lg border border-industrial-200 text-center shadow-sm flex flex-col items-center justify-center">
                            <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-industrial-300" />
                            <h3 className="text-xl font-bold text-industrial-900 mb-2">No Results Found</h3>
                            <p className="text-industrial-500 max-w-md mx-auto font-medium text-[15px]">
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
