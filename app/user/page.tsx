import React from "react";
import Link from "next/link";
import { Search, ChevronRight, Stethoscope, Video, HeartPulse, Activity, Pill, Microscope, Stethoscope as SurgIcon, Star, CheckCircle2, ShieldAlert } from "lucide-react";
import { getAllDoctor } from "@/app/user/modules/hop/appointment/action/getAllDoctor";
import { getAllSpecializations } from "@/app/user/modules/hop/appointment/action/getAllSpecializations";

export default async function Home() {
  const doctors = await getAllDoctor();
  const specializations = await getAllSpecializations();

  // Icons mapper for specializations
  const getSpecialtyIcon = (index: number) => {
    const icons = [Stethoscope, Activity, HeartPulse, ShieldAlert];
    const Icon = icons[index % icons.length];
    return <Icon className="w-5 h-5" />;
  };

  return (
    <main className="min-h-screen bg-industrial-50 pb-20 font-sans text-industrial-900">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-28 border-b border-industrial-200 bg-white overflow-hidden">
        {/* Subtle grid background for industrial feel */}
        <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl animate-slideUpFade">
          <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-industrial-900 tracking-tight leading-[1.1] mb-6">
            Your Health, <br className="hidden md:block" />
            <span className="text-primary-600">Our Top Priority</span>
          </h1>
          <p className="text-lg text-industrial-600 mb-10 max-w-2xl mx-auto font-medium">
            Book appointments, consult online, and order medicines effortlessly. The most trusted healthcare platform for you and your family.
          </p>

          {/* Functional Search Form */}
          {/* <form action="/user/modules/hop/findDoctors" method="GET" className="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-sm border border-industrial-200 flex flex-col md:flex-row gap-2 relative z-20 group">
            <div className="flex-1 flex items-center px-4 bg-industrial-50 rounded-md border border-industrial-200 focus-within:ring-2 focus-within:ring-primary-600 focus-within:border-transparent transition-all">
              <Search className="w-5 h-5 text-industrial-400" />
              <input
                type="text"
                name="search"
                placeholder="Search doctors, specialities, or health issues..."
                className="w-full bg-transparent border-none outline-none px-3 py-3 text-industrial-900 placeholder:text-industrial-400 text-[15px] font-medium"
                required
              />
            </div>
            <button type="submit" className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-semibold transition-colors shadow-sm whitespace-nowrap active:scale-[0.98]">
              Find Care
            </button>
          </form> */}
        </div>
      </div>

      {/* --- QUICK SERVICES GRID --- */}
      <div className="container max-w-7xl mx-auto px-6 -mt-10 relative z-20 mb-20 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* Card 1: Find Doctors (Active) */}
          <Link
            href="/user/modules/hop/findDoctors"
            className="group flex flex-col items-center p-8 bg-white rounded-lg border border-industrial-200 shadow-sm hover:shadow-md hover:border-primary-600 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-industrial-900 text-center text-lg">Find Doctors</h3>
            <p className="text-[13px] text-industrial-500 mt-1 text-center font-medium">Book appointments</p>
          </Link>

          {/* Card 2: Video Consult (Coming Soon) */}
          <div className="flex flex-col items-center p-8 bg-industrial-50 rounded-lg border border-industrial-200 relative overflow-hidden group cursor-not-allowed">
            <div className="absolute top-4 right-4 bg-industrial-200 text-industrial-600 text-[10px] font-bold px-2 py-1 rounded-[4px] uppercase tracking-wide z-10">
              Coming Soon
            </div>
            <div className="w-14 h-14 rounded-md bg-industrial-200 text-industrial-400 flex items-center justify-center mb-5 opacity-70">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-industrial-500 text-center text-lg">Video Consult</h3>
            <p className="text-[13px] text-industrial-400 mt-1 text-center font-medium">Talk in 15 mins</p>
          </div>

          {/* Card 3: Lab Tests */}
          <Link
            href="/user/modules/lab/testList"
            className="group flex flex-col items-center p-8 bg-white rounded-lg border border-industrial-200 shadow-sm hover:shadow-md hover:border-primary-600 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-industrial-900 text-center text-lg">Lab Tests</h3>
            <p className="text-[13px] text-industrial-500 mt-1 text-center font-medium">Home sample collection</p>
          </Link>

          {/* Card 4: Surgeries */}
          <Link
            href="/user/modules/sur/surgeryList"
            className="group flex flex-col items-center p-8 bg-white rounded-lg border border-industrial-200 shadow-sm hover:shadow-md hover:border-primary-600 transition-all duration-200 hidden md:flex"
          >
            <div className="w-14 h-14 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <SurgIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-industrial-900 text-center text-lg">Surgeries</h3>
            <p className="text-[13px] text-industrial-500 mt-1 text-center font-medium">Expert surgical care</p>
          </Link>


        </div>
      </div>

      {/* --- DYNAMIC SPECIALIZATIONS SECTION --- */}
      <div className="container max-w-7xl mx-auto px-6 mb-24 animate-slideUpFade" style={{ animationDelay: "0.2s" }}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-industrial-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-industrial-900 tracking-tight">Explore Top Specialities</h2>
            <p className="text-[15px] font-medium text-industrial-600 mt-1">Consult with verified doctors based on their specialization.</p>
          </div>
          <Link href="/user/modules/hop/specialization" className="text-[14px] font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 group transition-colors">
            View all <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {specializations.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 gap-6">
            {specializations.slice(0, 6).map((spec, i) => (
              <Link
                key={spec.SpecializationID}
                href={`/user/modules/hop/findDoctors?specId=${spec.SpecializationID}`}
                className="bg-white rounded-lg border border-industrial-200 shadow-sm hover:border-primary-600 transition-all duration-200 flex flex-col items-center justify-center group p-6 aspect-square"
              >
                <div className="w-12 h-12 rounded-md bg-industrial-50 border border-industrial-100 text-industrial-500 flex items-center justify-center mb-4 group-hover:bg-primary-50 group-hover:border-primary-100 group-hover:text-primary-600 transition-colors">
                  {getSpecialtyIcon(i)}
                </div>
                <h4 className="text-[14px] font-bold text-industrial-900 text-center leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                  {spec.SpecializationName}
                </h4>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 bg-industrial-50 rounded-lg border border-industrial-200 text-center text-industrial-500 font-medium">
            <Activity className="w-8 h-8 mx-auto mb-3 text-industrial-400" />
            No specializations loaded in database.
          </div>
        )}
      </div>

      {/* --- COMING SOON: TOP ARTICLES SECTION --- */}
      <div className="container max-w-7xl mx-auto px-6 mb-12 animate-slideUpFade" style={{ animationDelay: "0.3s" }}>
        <div className="relative rounded-lg overflow-hidden bg-industrial-900 border border-industrial-800 p-10 md:p-14 shadow-md">
          <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>

          {/* Coming Soon Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-industrial-900/80 z-20 backdrop-blur-[2px]">
            <div className="px-3 py-1 bg-white/10 border border-white/10 rounded-[4px] text-white text-[11px] font-bold tracking-widest uppercase mb-6">
              Coming Soon
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-3">Health Library & Articles</h2>
            <p className="text-industrial-300 text-[15px] text-center max-w-xl font-medium tracking-wide">Stay tuned for expert-curated content, wellness tips, and medical guidelines directly from top doctors.</p>
          </div>

          {/* Fake Background Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-20 select-none z-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-industrial-800 rounded-md p-5 border border-industrial-700">
                <div className="w-full h-32 bg-industrial-700 rounded-[4px] mb-5"></div>
                <div className="h-4 bg-industrial-700 rounded-[2px] w-1/4 mb-4"></div>
                <div className="h-5 bg-industrial-600 rounded-[2px] w-full mb-3"></div>
                <div className="h-5 bg-industrial-600 rounded-[2px] w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
