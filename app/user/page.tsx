import React from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  Stethoscope,
  Video,
  HeartPulse,
  Activity,
  Pill,
  Microscope,
  Stethoscope as SurgIcon,
  Star,
  CheckCircle2,
  ShieldAlert,
  Shield,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { getAllDoctor } from "@/app/user/modules/hop/appointment/action/getAllDoctor";
import { getAllSpecializations } from "@/app/user/modules/hop/appointment/action/getAllSpecializations";

export default async function Home() {
  const doctors = await getAllDoctor();
  const specializations = await getAllSpecializations();

  const getSpecialtyIcon = (index: number) => {
    const icons = [Stethoscope, Activity, HeartPulse, ShieldAlert];
    const Icon = icons[index % icons.length];
    return <Icon className="w-6 h-6" />;
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
      {/* === HERO SECTION === */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 gradient-hero" />
        {/* Decorative floating shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-40 left-1/3 w-32 h-32 bg-primary-300/5 rounded-full blur-2xl" />

        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl pt-28 pb-36 animate-slideUpFade">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-[13px] font-bold text-primary-200 bg-white/10 rounded-full border border-white/10 uppercase tracking-widest backdrop-blur-sm">
            <HeartPulse className="w-4 h-4" />
            <span>Trusted by thousands of patients</span>
          </div>

          <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Your Health,{" "}
            <br className="hidden md:block" />
            <span className="text-primary-300">Our Top Priority</span>
          </h1>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Book appointments, consult online, and order medicines effortlessly.
            The most trusted healthcare platform for you and your family.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {[
              { value: `${doctors.length}+`, label: "Doctors", icon: Stethoscope },
              { value: `${specializations.length}+`, label: "Specialities", icon: Award },
              { value: "24/7", label: "Support", icon: Clock },
              { value: "10K+", label: "Patients", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <stat.icon className="w-5 h-5 text-primary-300" />
                </div>
                <div>
                  <div className="text-white font-extrabold text-xl leading-none">{stat.value}</div>
                  <div className="text-slate-400 text-xs font-medium mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === SERVICES GRID === */}
      <div
        className="container max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-24 animate-slideUpFade"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* Find Doctors */}
          <Link
            href="/user/modules/hop/findDoctors"
            className="group card-premium gradient-card-hover flex flex-col items-center p-8 no-underline"
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary text-white flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-center text-lg">Find Doctors</h3>
            <p className="text-[13px] text-slate-500 mt-1.5 text-center font-medium">
              Book appointments
            </p>
          </Link>

          {/* Video Consult (Coming Soon) */}
          <div className="card-premium flex flex-col items-center p-8 relative overflow-hidden group cursor-not-allowed opacity-70">
            <div className="absolute top-3 right-3 bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider z-10">
              Coming Soon
            </div>
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-5">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-400 text-center text-lg">Video Consult</h3>
            <p className="text-[13px] text-slate-400 mt-1.5 text-center font-medium">
              Talk in 15 mins
            </p>
          </div>

          {/* Lab Tests */}
          <Link
            href="/user/modules/lab/testList"
            className="group card-premium gradient-card-hover flex flex-col items-center p-8 no-underline"
          >
            <div className="w-16 h-16 rounded-2xl bg-violet-500 text-white flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Microscope className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-center text-lg">Lab Tests</h3>
            <p className="text-[13px] text-slate-500 mt-1.5 text-center font-medium">
              Home sample collection
            </p>
          </Link>

          {/* Surgeries */}
          <Link
            href="/user/modules/sur/surgeryList"
            className="group card-premium gradient-card-hover flex flex-col items-center p-8 no-underline hidden md:flex"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <SurgIcon className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-center text-lg">Surgeries</h3>
            <p className="text-[13px] text-slate-500 mt-1.5 text-center font-medium">
              Expert surgical care
            </p>
          </Link>
        </div>
      </div>

      {/* === SPECIALIZATIONS === */}
      <div
        className="container max-w-7xl mx-auto px-6 mb-24 animate-slideUpFade"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-[12px] font-bold text-primary-700 bg-primary-50 rounded-full border border-primary-200 uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5" />
              Medical Departments
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Top Specialities
            </h2>
            <p className="text-[15px] font-medium text-slate-500 mt-2">
              Consult with verified doctors based on their specialization.
            </p>
          </div>
          <Link
            href="/user/modules/hop/specialization"
            className="text-[14px] font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group transition-colors no-underline shrink-0"
          >
            View all{" "}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {specializations.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-5">
            {specializations.slice(0, 6).map((spec, i) => (
              <Link
                key={spec.SpecializationID}
                href={`/user/modules/hop/findDoctors?specId=${spec.SpecializationID}`}
                className="card-premium gradient-card-hover flex flex-col items-center justify-center group p-6 aspect-square no-underline"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  {getSpecialtyIcon(i)}
                </div>
                <h4 className="text-[14px] font-bold text-slate-800 text-center leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
                  {spec.SpecializationName}
                </h4>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center">
            <Activity className="w-8 h-8 mx-auto mb-3 text-slate-400" />
            <p className="text-slate-500 font-medium">No specializations loaded in database.</p>
          </div>
        )}
      </div>

      {/* === HEALTH LIBRARY (COMING SOON) === */}
      <div
        className="container max-w-7xl mx-auto px-6 mb-12 animate-slideUpFade"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="relative rounded-2xl overflow-hidden gradient-hero p-10 md:p-14 shadow-lg">
          {/* Subtle pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 z-20 backdrop-blur-[2px]">
            <div className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-white text-[11px] font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Coming Soon
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-3">
              Health Library & Articles
            </h2>
            <p className="text-slate-300 text-[15px] text-center max-w-xl font-medium tracking-wide">
              Stay tuned for expert-curated content, wellness tips, and medical
              guidelines directly from top doctors.
            </p>
          </div>

          {/* Fake Background Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-20 select-none z-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/5">
                <div className="w-full h-32 bg-white/5 rounded-xl mb-5" />
                <div className="h-4 bg-white/5 rounded w-1/4 mb-4" />
                <div className="h-5 bg-white/10 rounded w-full mb-3" />
                <div className="h-5 bg-white/10 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
