import React from "react";
import Link from "next/link";
import { ChevronLeft, Stethoscope, Activity, HeartPulse, ShieldAlert, Heart, Brain, Bone, Eye } from "lucide-react";
import { getAllSpecializations } from "@/app/user/modules/hop/appointment/action/getAllSpecializations";

export default async function AllSpecializationsPage() {
    const specializations = await getAllSpecializations();

    const getSpecialtyIcon = (index: number) => {
        const icons = [Stethoscope, Activity, HeartPulse, ShieldAlert, Heart, Brain, Bone, Eye];
        const Icon = icons[index % icons.length];
        return <Icon className="w-6 h-6" />;
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute top-20 right-20 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-float" />

                <div className="container max-w-7xl mx-auto px-6 relative z-10 pt-12 pb-16">
                    <Link
                        href="/user"
                        className="inline-flex items-center text-sm font-medium text-primary-200 hover:text-white transition-colors mb-6 no-underline"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-14 h-14 rounded-2xl gradient-primary text-white flex items-center justify-center shrink-0 shadow-lg">
                            <Stethoscope className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            All Medical Specialities
                        </h1>
                    </div>
                    <p className="text-slate-300 max-w-2xl ml-[74px] font-medium">
                        Find the right specialist for your health needs. Choose from our comprehensive list of verified medical departments and directly book an appointment.
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="container max-w-7xl mx-auto px-6 -mt-6 relative z-20">
                {specializations.length > 0 ? (
                    <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                        {specializations.map((spec, i) => (
                            <Link
                                key={spec.SpecializationID}
                                href={`/user/modules/hop/findDoctors?specId=${spec.SpecializationID}`}
                                className="card-premium gradient-card-hover w-44 h-48 flex flex-col items-center justify-center group shrink-0 no-underline"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                    {getSpecialtyIcon(i)}
                                </div>
                                <h4 className="text-[15px] font-bold text-primary-700 text-center leading-tight group-hover:text-primary-800 transition-colors px-3 line-clamp-2">
                                    {spec.SpecializationName}
                                </h4>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 bg-white rounded-2xl border border-slate-200 border-dashed text-center">
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No specializations found</h3>
                        <p className="text-slate-500">There are currently no active specializations in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
