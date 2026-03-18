"use client";

import React, { useState, useMemo } from "react";
import { Search, Microscope, FlaskConical, IndianRupee, Clock, ClipboardPaste, ArrowRight, X, Shield, Activity } from "lucide-react";
import Link from "next/link";

interface LabTest {
    LabTestID: number;
    TestName: string;
    TestCode: string | null;
    Price: string | number;
}

export default function LabTestListClient({ initialTests }: { initialTests: LabTest[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTests = useMemo(() => {
        if (!searchQuery.trim()) return initialTests;
        const query = searchQuery.toLowerCase();
        return initialTests.filter(test =>
            test.TestName.toLowerCase().includes(query) ||
            (test.TestCode && test.TestCode.toLowerCase().includes(query))
        );
    }, [initialTests, searchQuery]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
            {/* Hero Section */}
            <div className="relative pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 gradient-hero z-0" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulseGlow" />

                <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl animate-slideUpFade">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[12px] font-extrabold text-primary-200 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 uppercase tracking-widest shadow-sm">
                        <Microscope className="w-4 h-4" />
                        <span>Diagnostic Services</span>
                    </div>

                    <h1 className="text-4xl md:text-[4rem] font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                        Premium <span className="text-primary-300">Lab Tests</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Accurate, timely, and convenient diagnostic testing. Book online and get your certified reports delivered digitally.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto relative z-20 group">
                        <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl shadow-slate-900/10 border border-white/40 focus-within:ring-4 focus-within:ring-primary-500/20 transition-all">
                            <div className="flex-1 flex items-center px-4">
                                <Search className="w-6 h-6 text-primary-500 shrink-0" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for blood tests, profiles, or codes..."
                                    className="w-full bg-transparent border-none outline-none px-4 py-4 text-slate-900 placeholder:text-slate-400 text-[16px] font-bold"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} className="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0">
                                        <X className="w-5 h-5 text-slate-400" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-6xl mx-auto px-6 -mt-10 relative z-20 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white/80 backdrop-blur-md p-5 rounded-[1.25rem] shadow-sm border border-slate-200 glass">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <Activity className="w-6 h-6 text-primary-500" />
                        Available Tests
                    </h2>
                    <div className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-[14px] font-bold tracking-wide flex items-center gap-2 uppercase shadow-inner">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulseshadow"></span>
                        {filteredTests.length} {filteredTests.length === 1 ? 'Test' : 'Tests'} Found
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTests.map((test) => (
                        <div key={test.LabTestID} className="group bg-white rounded-[1.5rem] p-6 shadow-xl shadow-slate-200/40 border border-slate-200 hover:border-primary-300 transition-all duration-300 flex flex-col relative overflow-hidden hover:-translate-y-1">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    <FlaskConical className="w-7 h-7" />
                                </div>
                                {test.TestCode && (
                                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-extrabold rounded-lg border border-slate-200 tracking-widest uppercase shadow-sm">
                                        {test.TestCode}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-extrabold text-slate-900 leading-snug group-hover:text-primary-600 transition-colors mb-4 line-clamp-2 min-h-[56px]">
                                {test.TestName}
                            </h3>

                            <div className="flex flex-col gap-3 py-5 border-t border-b border-slate-100 mb-6 bg-slate-50/50 rounded-xl px-4 mt-auto">
                                <div className="flex items-center gap-3 text-[14px] font-bold text-slate-600">
                                    <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span>Certified Lab Report</span>
                                </div>
                                <div className="flex items-center gap-3 text-[14px] font-bold text-slate-600">
                                    <ClipboardPaste className="w-4 h-4 text-primary-500 shrink-0" />
                                    <span>Digital E-Report</span>
                                </div>
                                <div className="flex items-center gap-3 text-[14px] font-bold text-slate-600">
                                    <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span>24hr Turnaround</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Total Price</p>
                                    <div className="flex items-center text-3xl font-extrabold text-slate-900 tracking-tight">
                                        <IndianRupee className="w-6 h-6 mb-0.5 text-primary-600" />
                                        {Number(test.Price).toFixed(0)}
                                    </div>
                                </div>
                                <Link
                                    href={`/user/modules/lab/bookTest?testId=${test.LabTestID}`}
                                    className="px-6 py-3 gradient-primary text-white rounded-xl font-bold text-[14px] shadow-md hover:shadow-lg transition-all flex items-center gap-2 group-hover:scale-105 active:scale-95"
                                >
                                    Book <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {filteredTests.length === 0 && (
                        <div className="col-span-full py-32 text-center bg-white rounded-[1.5rem] border border-slate-200 shadow-sm glass">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-inner">
                                <Microscope className="w-12 h-12 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">No Tests Found</h3>
                            <p className="text-slate-500 font-medium max-w-md mx-auto">We couldn't find any tests matching "{searchQuery}". Try using different keywords or test codes.</p>
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
