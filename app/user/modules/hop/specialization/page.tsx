import React from "react";
import Link from "next/link";
import { ChevronLeft, Stethoscope, Activity, HeartPulse, ShieldAlert, Heart, Brain, Bone, Eye } from "lucide-react";
import { getAllSpecializations } from "@/app/user/modules/hop/appointment/action/getAllSpecializations";

export default async function AllSpecializationsPage() {
    const specializations = await getAllSpecializations();

    // Icons mapper for specializations
    const getSpecialtyIcon = (index: number) => {
        const icons = [Stethoscope, Activity, HeartPulse, ShieldAlert, Heart, Brain, Bone, Eye];
        const Icon = icons[index % icons.length];
        return <Icon className="w-6 h-6" />;
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 pt-8 pb-12 mb-10">
                <div className="container max-w-7xl mx-auto px-4">
                    <Link
                        href="/user"
                        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            All Medical Specialities
                        </h1>
                    </div>
                    <p className="text-slate-600 max-w-2xl ml-16">
                        Find the right specialist for your health needs. Choose from our comprehensive list of verified medical departments and directly book an appointment.
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="container max-w-7xl mx-auto px-4">
                {specializations.length > 0 ? (
                    <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                        {specializations.map((spec, i) => (
                            <Link
                                key={spec.SpecializationID}
                                href={`/user/modules/hop/findDoctors?specId=${spec.SpecializationID}`}
                                className="bg-white rounded-xl w-40 h-44 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group shrink-0"
                            >
                                <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    {getSpecialtyIcon(i)}
                                </div>
                                <h4 className="text-[15px] font-semibold text-blue-600 text-center leading-tight underline underline-offset-4 decoration-blue-600/30 group-hover:decoration-blue-600 transition-colors px-2 line-clamp-2">
                                    {spec.SpecializationName}
                                </h4>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 bg-white rounded-3xl border border-slate-200 border-dashed text-center">
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No specializations found</h3>
                        <p className="text-slate-500">There are currently no active specializations in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
