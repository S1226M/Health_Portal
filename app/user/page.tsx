import React from "react";
import Link from "next/link";
import { Search, ChevronRight, Stethoscope, Video, HeartPulse, Activity, Pill, Microscope, Stethoscope as SurgIcon, Star, CheckCircle2, ShieldAlert } from "lucide-react";
import { getAllDoctor } from "@/app/user/modules/appointments/action/getAllDoctor";
import { getAllSpecializations } from "@/app/user/modules/appointments/action/getAllSpecializations";

export default async function Home() {
  const doctors = await getAllDoctor();
  const specializations = await getAllSpecializations();

  // Icons mapper for specializations
  const getSpecialtyIcon = (index: number) => {
    const icons = [Stethoscope, Activity, HeartPulse, ShieldAlert];
    const Icon = icons[index % icons.length];
    return <Icon className="w-6 h-6" />;
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-16 pb-24 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-100 rounded-full blur-[80px] opacity-60"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[30rem] h-[30rem] bg-indigo-50 rounded-full blur-[100px] opacity-80"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Your Health, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Our Top Priority</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Book appointments, consult online, and order medicines effortlessly. The most trusted healthcare platform for you and your family.
          </p>

          {/* Aesthetic Mock Search Bar */}
          <div className="max-w-2xl mx-auto bg-white p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row gap-2 relative z-20">
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors, specialities, or health issues..."
                className="w-full bg-transparent border-none outline-none px-3 py-3 text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <button className="px-8 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300 shadow-md whitespace-nowrap">
              Find Care
            </button>
          </div>
        </div>
      </div>

      {/* --- QUICK SERVICES GRID --- */}
      <div className="container max-w-7xl mx-auto px-4 -mt-10 relative z-20 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {/* Card 1: Find Doctors (Active) */}
          <Link
            href="/user/components/findDoctors"
            className="group flex flex-col items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-center">Find Doctors</h3>
            <p className="text-sm text-slate-500 mt-1 text-center font-medium">Book appointments</p>
          </Link>

          {/* Card 2: Video Consult (Coming Soon) */}
          <div className="flex flex-col items-center p-6 bg-slate-50/80 rounded-3xl border border-slate-200 border-dashed relative overflow-hidden group cursor-not-allowed">
            <div className="absolute top-4 right-4 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide z-10">
              Coming Soon
            </div>
            <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center mb-4 opacity-70">
              <Video className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-700 text-center opacity-70">Video Consult</h3>
            <p className="text-sm text-slate-400 mt-1 text-center font-medium opacity-70">Talk in 15 mins</p>
          </div>

          {/* Card 3: Lab Tests (Coming Soon) */}
          <div className="flex flex-col items-center p-6 bg-slate-50/80 rounded-3xl border border-slate-200 border-dashed relative overflow-hidden group cursor-not-allowed hidden md:flex">
            <div className="absolute top-4 right-4 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide z-10">
              Coming Soon
            </div>
            <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center mb-4 opacity-70">
              <Microscope className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-700 text-center opacity-70">Lab Tests</h3>
            <p className="text-sm text-slate-400 mt-1 text-center font-medium opacity-70">Free home sample</p>
          </div>

          {/* Card 4: Surgeries (Coming Soon) */}
          <div className="flex flex-col items-center p-6 bg-slate-50/80 rounded-3xl border border-slate-200 border-dashed relative overflow-hidden group cursor-not-allowed hidden md:flex">
            <div className="absolute top-4 right-4 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide z-10">
              Coming Soon
            </div>
            <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center mb-4 opacity-70">
              <SurgIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-700 text-center opacity-70">Surgeries</h3>
            <p className="text-sm text-slate-400 mt-1 text-center font-medium opacity-70">Safe and trusted</p>
          </div>

        </div>
      </div>

      {/* --- DYNAMIC SPECIALIZATIONS SECTION --- */}
      <div className="container max-w-7xl mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Top Specialities</h2>
            <p className="text-slate-600 mt-1">Consult with verified doctors based on their specialization.</p>
          </div>
          <Link href="/user/components/hop/specialization" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group">
            View all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {specializations.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {specializations.slice(0, 6).map((spec, i) => (
              <Link
                key={spec.SpecializationID}
                href={`/user/components/findDoctors?specId=${spec.SpecializationID}`}
                className="bg-white rounded-xl w-40 h-44 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group"
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
          <div className="p-8 bg-white rounded-3xl border border-slate-200 border-dashed text-center text-slate-500">
            No specializations loaded in database.
          </div>
        )}
      </div>

      {/* --- DYNAMIC DOCTORS SECTION (Horizontal Scroll) --- */}
      <div className="container max-w-7xl mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Book an In-Clinic Appointment</h2>
            <p className="text-slate-600 mt-1">Find experienced doctors across all premium clinics.</p>
          </div>
        </div>

        {doctors.length > 0 ? (
          <div className="flex overflow-x-auto pb-8 -mb-4 snap-x snap-mandatory hide-scroll-bar gap-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style dangerouslySetInnerHTML={{
              __html: `
              .hide-scroll-bar::-webkit-scrollbar {
                display: none;
              }
            `}} />

            {doctors.map((doc) => (
              <div key={doc.DoctorID} className="snap-start shrink-0 w-72 group">
                <Link href={`/user/components/findDoctors/${doc.DoctorID}`} className="block h-full bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-50 font-bold text-xl">
                      {doc.DoctorName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-tight">Dr. {doc.DoctorName}</h3>
                      <p className="text-xs text-blue-600 font-medium">{doc.hop_specialization?.SpecializationName || "General"}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      {doc.hop_hospital?.HospitalName || "Private Clinic"}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-2 opacity-80">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      4.9 Rating Focus
                    </div>
                  </div>

                  <div className="w-full py-2.5 bg-slate-50 text-slate-900 text-sm font-semibold text-center rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Book Appointment
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white rounded-3xl border border-slate-200 border-dashed text-center text-slate-500">
            No doctors available right now.
          </div>
        )}
      </div>

      {/* --- COMING SOON: TOP ARTICLES SECTION --- */}
      <div className="container max-w-7xl mx-auto px-4 mb-10">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] pointer-events-none"></div>

          {/* Coming Soon Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-slate-900/40 z-20">
            <div className="px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
              Coming Soon
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center">Health Library & Articles</h2>
            <p className="text-slate-300 mt-2 text-center max-w-md">Stay tuned for expert-curated content, wellness tips, and medical guidelines directly from top doctors.</p>
          </div>

          {/* Blurred Fake Background Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 blur-sm select-none z-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
                <div className="w-full h-32 bg-slate-700 rounded-xl mb-4 animate-pulse"></div>
                <div className="h-4 bg-slate-700 rounded w-1/4 mb-3"></div>
                <div className="h-5 bg-slate-600 rounded w-full mb-2"></div>
                <div className="h-5 bg-slate-600 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
