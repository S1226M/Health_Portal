"use client";

import React, { useState, useMemo } from "react";
import { Search, Microscope, FlaskConical, IndianRupee, Clock, ClipboardPaste, ArrowRight, X } from "lucide-react";
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
        <div className="min-h-screen bg-industrial-50 font-sans text-industrial-900 pb-24">
            {/* Hero Section */}
            <div className="relative pt-24 pb-28 border-b border-industrial-200 bg-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl animate-slideUpFade">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-[13px] font-bold text-primary-700 bg-primary-50 rounded-[4px] border border-primary-200 uppercase tracking-widest shadow-sm">
                        <Microscope className="w-4 h-4" />
                        <span>Diagnostic Services</span>
                    </div>

                    <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-industrial-900 tracking-tight leading-[1.1] mb-6">
                        Premium <span className="text-primary-600">Lab Tests</span>
                    </h1>

                    <p className="text-lg text-industrial-600 mb-10 max-w-2xl mx-auto font-medium">
                        Accurate, timely, and convenient testing services. Book online and get your reports delivered digitally.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-sm border border-industrial-200 flex flex-col md:flex-row gap-2 relative z-20 group">
                        <div className="flex-1 flex items-center px-4 bg-industrial-50 rounded-md border border-industrial-200 focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-transparent transition-all">
                            <Search className="w-5 h-5 text-industrial-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for blood tests, profiles, or codes..."
                                className="w-full bg-transparent border-none outline-none px-3 py-3 text-industrial-900 placeholder:text-industrial-400 text-[15px] font-medium"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-industrial-200 rounded-full transition-colors">
                                    <X className="w-4 h-4 text-industrial-500" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-5xl mx-auto px-6 -mt-8 relative z-20 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-industrial-200 pb-4 bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold text-industrial-900 tracking-tight">Available Tests</h2>
                    <div className="px-3 py-1.5 bg-white border border-industrial-200 text-industrial-600 rounded-md text-[13px] font-bold tracking-wide flex items-center gap-2 uppercase">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {filteredTests.length} {filteredTests.length === 1 ? 'Test' : 'Tests'} Found
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTests.map((test) => (
                        <div key={test.LabTestID} className="group bg-white rounded-lg p-6 shadow-sm border border-industrial-200 hover:border-primary-600 hover:shadow-md transition-all flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100">
                                        <FlaskConical className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-industrial-900 leading-snug group-hover:text-primary-600 transition-colors">
                                            {test.TestName}
                                        </h3>
                                        {test.TestCode && (
                                            <span className="inline-block mt-1 px-2.5 py-0.5 bg-industrial-100 text-industrial-600 text-xs font-bold rounded border border-industrial-200 tracking-wider">
                                                CODE: {test.TestCode}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-industrial-100 mb-5 relative z-10">
                                <div className="flex items-center gap-2 text-sm font-medium text-industrial-600">
                                    <ClipboardPaste className="w-4 h-4 text-industrial-400 shrink-0" />
                                    <span>E-Report included</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-industrial-600">
                                    <Clock className="w-4 h-4 text-industrial-400 shrink-0" />
                                    <span>24hr turnaround</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <p className="text-xs font-bold text-industrial-500 uppercase tracking-widest mb-1">Price</p>
                                    <div className="flex items-center gap-1 text-2xl font-extrabold text-industrial-900">
                                        <IndianRupee className="w-5 h-5" />
                                        {Number(test.Price).toFixed(0)}
                                    </div>
                                </div>
                                <Link
                                    href={`/user/modules/lab/bookTest?testId=${test.LabTestID}`}
                                    className="px-5 py-2.5 bg-industrial-900 text-white rounded-md font-bold text-sm hover:bg-primary-600 transition-all flex items-center gap-2 shadow-sm relative z-10"
                                >
                                    Book Test <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {filteredTests.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-lg border border-industrial-200">
                            <Microscope className="w-12 h-12 mx-auto text-industrial-300 mb-4" />
                            <h3 className="text-lg font-bold text-industrial-900 mb-2">No tests found</h3>
                            <p className="text-industrial-500">Could not find any test matching &quot;{searchQuery}&quot;</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
