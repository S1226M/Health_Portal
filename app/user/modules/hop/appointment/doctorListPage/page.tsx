"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Activity,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  FilterX
} from "lucide-react";
import Link from "next/link";
import { getAllDoctor } from "@/app/user/modules/hop/appointment/action/getAllDoctor";

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    doctorName: '',
    specialization: '',
    city: '',
  });
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctor();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const specializationOptions = [...new Set(doctors.map(doc => doc.hop_specialization?.Name).filter(Boolean))];
  const cityOptions = [...new Set(doctors.map(doc => doc.hop_hospital?.loc_city?.CityName).filter(Boolean))];

  const applyFilters = () => {
    let filtered = doctors;
    if (filters.doctorName) {
      filtered = filtered.filter(doc => doc.DoctorName.toLowerCase().includes(filters.doctorName.toLowerCase()));
    }
    if (filters.specialization) {
      filtered = filtered.filter(doc => doc.hop_specialization?.Name === filters.specialization);
    }
    if (filters.city) {
      filtered = filtered.filter(doc => doc.hop_hospital?.loc_city?.CityName === filters.city);
    }
    setFilteredDoctors(filtered);
  };

  const resetFilters = () => {
    setFilters({
      doctorName: '',
      specialization: '',
      city: '',
    });
    setFilteredDoctors(doctors);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-900">
      {/* Hero */}
      <div className="relative overflow-hidden mb-10">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-float" />
        
        <div className="container mx-auto px-6 relative z-10 pt-16 pb-20 text-center animate-slideUpFade">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[13px] font-bold text-primary-200 bg-white/10 rounded-full border border-white/10 uppercase tracking-widest backdrop-blur-sm">
            <HeartPulse className="w-4 h-4" />
            Book Your Consultation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Find Your Specialist
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto font-medium text-[15px]">
            Filter by name, specialization, or location to find the right healthcare professional for your needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl -mt-16 relative z-20 animate-slideUpFade" style={{ animationDelay: "0.1s" }}>
        {/* Filters Box */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 mb-10 glass">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Search Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Doctor Name..."
                  value={filters.doctorName}
                  onChange={(e) => setFilters({ ...filters, doctorName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Specialization</label>
              <select
                value={filters.specialization}
                onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-700"
              >
                <option value="">All Specializations</option>
                {specializationOptions.map((opt: any) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[14px] focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-700"
              >
                <option value="">All Cities</option>
                {cityOptions.map((opt: any) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2 h-full pt-6 md:pt-0">
              <button
                onClick={resetFilters}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-all text-[14px]"
              >
                <FilterX className="w-4 h-4" /> Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 gradient-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-[14px]"
              >
                <Search className="w-4 h-4" /> Apply
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm">
            <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Doctors Found</h3>
            <p className="text-slate-500 font-medium text-[15px]">Try adjusting your filters to find available specialists.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDoctors.map((doc) => (
              <div key={doc.DoctorID} className="card-premium gradient-card-hover flex flex-col sm:flex-row items-center sm:items-stretch overflow-hidden group">
                {/* Image Section */}
                <div className="w-full sm:w-48 bg-slate-100 flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-slate-200 shrink-0 group-hover:bg-primary-50 transition-colors">
                  <div className="w-24 h-24 rounded-2xl gradient-primary text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-4xl font-extrabold">{doc.DoctorName?.charAt(0) || "D"}</span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-primary-700 transition-colors mb-1">
                        {doc.DoctorName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-[14px] font-bold text-primary-600">
                        <Stethoscope className="w-4 h-4" />
                        {doc.hop_specialization?.Name || "General Physician"}
                      </div>
                    </div>
                    <div className="flex gap-1.5 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200 items-center">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="text-amber-700 font-bold text-[13px]">4.5 Avg</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[14px] text-slate-600 font-medium mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {doc.hop_hospital?.HospitalName || "Unknown Hospital"}
                    </div>
                  </div>

                  <p className="text-slate-500 text-[14px] italic line-clamp-2 mb-6 font-medium">
                    "{doc.Description || "No detailed description available."}"
                  </p>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    <Link
                      href={`/user/modules/hop/appointment/bookAppointment?doctorId=${doc.DoctorID}`}
                      className="flex-1 sm:flex-none flex items-center justify-center px-6 py-2.5 gradient-primary text-white rounded-xl font-bold text-[14px] shadow-sm hover:shadow-md transition-all no-underline"
                    >
                      Book Appointment
                    </Link>
                    <Link
                      href={`/user/modules/hop/findDoctors/${doc.DoctorID}`}
                      className="flex-1 sm:flex-none flex items-center justify-center px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-[14px] transition-all no-underline"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
