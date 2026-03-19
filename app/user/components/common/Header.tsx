"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BellIcon, Menu, X, HeartPulse, ChevronDown } from "lucide-react";
import { logout } from "@/app/actions/logout";
import { getFutureAppointments } from "../../modules/hop/appointment/getFutureAppointments";

/* ---------- Date Formatting Helper ---------- */
const formatDate = (date: Date | string | null): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = days[d.getUTCDay()];
  const month = months[d.getUTCMonth()];
  const dateNum = d.getUTCDate();
  const year = d.getUTCFullYear();

  return `${day}, ${month} ${dateNum}, ${year}`;
};

const formatTime = (date: Date | string | null): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  let hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
};

/* ---------- Types ---------- */
interface NavItem {
  label: string;
  href: string;
}

interface UserProfile {
  profileUrl?: string | null;
  fullName?: string | null;
}

interface AppointmentNotification {
  AppointmentID: number;
  AppointmentNo: string;
  AppointmentDate: Date | string | null;
  Status: string;
  Reason: string | null;
  PatientName: string;
  hop_doctor: {
    DoctorName: string;
    hop_specialization: {
      SpecializationName: string;
    } | null;
    hop_hospital: {
      HospitalName: string;
      Address: string | null;
    } | null;
  } | null;
  hop_timeslot_master: {
    StartTime: string | Date;
    EndTime: string | Date;
    SlotName: string;
  } | null;
}

interface LabOrderNotification {
  LabTestOrderID: number;
  OrderDateTime: Date | string | null;
  lab_labtest: {
    LabTestName: string;
  } | null;
  hop_patient: {
    PatientName: string;
  } | null;
}

interface SurgeryBookingNotification {
  SurgeryBookingID: number;
  BookingDateTime: Date | string | null;
  SurgeryDateTime: Date | string | null;
  Status: string;
  sur_surgery: {
    SurgeryName: string;
  } | null;
  hop_patient: {
    PatientName: string;
  } | null;
  hop_doctor: {
    DoctorName: string;
  } | null;
}

export default function Header({
  isLogin,
  userProfile,
}: {
  isLogin: boolean;
  userProfile?: UserProfile;
}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* 🔔 Notification states */
  const [totalCount, setTotalCount] = useState(0);
  const [apptNotifications, setApptNotifications] = useState<AppointmentNotification[]>([]);
  const [labNotifications, setLabNotifications] = useState<LabOrderNotification[]>([]);
  const [surNotifications, setSurNotifications] = useState<SurgeryBookingNotification[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileImageSrc = userProfile?.profileUrl || "/profile.svg";
  const userName = userProfile?.fullName || "User";

  const navItems: NavItem[] = [
    { label: "Home", href: "/user" },
    { label: "Book Appointment", href: "/user/modules/hop/appointment/doctorListPage" },
    { label: "Find Doctors", href: "/user/modules/hop/findDoctors" },
    { label: "Order Medicines", href: "/user/modules/phm/medicines" },
  ];

  /* Scroll detection for glassmorphism */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔔 Fetch future appointments */
  useEffect(() => {
    let isMounted = true;

    const fetchAppts = () => {
      if (!isLogin) {
        if (isMounted) {
          setTotalCount(0);
          setApptNotifications([]);
          setLabNotifications([]);
          setSurNotifications([]);
        }
        return;
      }
      getFutureAppointments()
        .then((res: any) => {
          if (!isMounted) return;
          setTotalCount(res.count);
          setApptNotifications(res.appointments || []);
          setLabNotifications(res.labOrders || []);
          setSurNotifications(res.surgeryBookings || []);
        })
        .catch(() => {
          if (!isMounted) return;
          setTotalCount(0);
          setApptNotifications([]);
          setLabNotifications([]);
          setSurNotifications([]);
        });
    };

    fetchAppts();

    const handleBookingUpdate = () => {
      fetchAppts();
    };

    window.addEventListener("bookingSuccess", handleBookingUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("bookingSuccess", handleBookingUpdate);
    };
  }, [isLogin]);

  /* 🔔 Close notification panel when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotification(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (showNotification || open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotification, open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)] border-b border-slate-200/60"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <nav className="container mx-auto px-6 h-[68px]">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Health<span className="gradient-text">Portal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-primary-700 transition-colors duration-200 no-underline rounded-lg hover:bg-primary-50/60"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3 relative">
            {!isLogin ? (
              <Link
                href="/login"
                className="gradient-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-sm hover:shadow-md no-underline active:scale-[0.97]"
              >
                Login / Signup
              </Link>
            ) : (
              <>
                {/* 🔔 Bell Icon */}
                <div ref={notificationRef} className="relative">
                  <button
                    onClick={() => setShowNotification(!showNotification)}
                    className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                      showNotification
                        ? "bg-primary-50 text-primary-700"
                        : "hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                    }`}
                    aria-label="Notifications"
                  >
                    <BellIcon className="w-5 h-5" />
                    {totalCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
                    )}
                  </button>

                  {/* 🔔 Notification Panel */}
                  {showNotification && (
                    <div className="absolute right-0 top-14 w-[400px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-200 z-50 max-h-[440px] overflow-hidden animate-slideDownFade">
                      {/* Header */}
                      <div className="gradient-hero px-5 py-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-white text-[15px]">
                            Upcoming Bookings
                          </h3>
                          {totalCount > 0 && (
                            <span className="px-2.5 py-1 text-xs font-bold bg-white/20 text-white rounded-lg backdrop-blur-sm">
                              {totalCount} Active
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="overflow-y-auto max-h-[340px] divide-y divide-slate-100">
                        {/* Appointments */}
                        {apptNotifications.length > 0 && (
                          <div className="p-3">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
                              Appointments
                            </p>
                            {apptNotifications.map((appt) => (
                              <div
                                key={`appt-${appt.AppointmentID}`}
                                className="px-3 py-3 hover:bg-primary-50/60 rounded-xl transition-colors cursor-pointer group"
                                onClick={() => {
                                  setShowNotification(false);
                                  router.push("/user/modules/hop/appointment/viewBookedAppointment");
                                }}
                              >
                                <div className="flex justify-between items-start mb-1.5">
                                  <div className="font-semibold text-slate-800 text-sm group-hover:text-primary-700 transition-colors">
                                    {appt.hop_doctor?.DoctorName || "Doctor Appointment"}
                                  </div>
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg">
                                    APPT
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500">
                                  {formatDate(appt.AppointmentDate)} at {formatTime(appt.AppointmentDate)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Lab Tests */}
                        {labNotifications.length > 0 && (
                          <div className="p-3">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
                              Lab Tests
                            </p>
                            {labNotifications.map((lab) => (
                              <div
                                key={`lab-${lab.LabTestOrderID}`}
                                className="px-3 py-3 hover:bg-primary-50/60 rounded-xl transition-colors cursor-pointer group"
                                onClick={() => {
                                  setShowNotification(false);
                                  router.push("/user");
                                }}
                              >
                                <div className="flex justify-between items-start mb-1.5">
                                  <div className="font-semibold text-slate-800 text-sm group-hover:text-primary-700 transition-colors">
                                    {lab.lab_labtest?.LabTestName || "Diagnostic Test"}
                                  </div>
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-violet-50 text-violet-600 rounded-lg">
                                    LAB
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500">
                                  Ordered for: {lab.hop_patient?.PatientName || "Self"}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Surgeries */}
                        {surNotifications.length > 0 && (
                          <div className="p-3">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
                              Surgeries
                            </p>
                            {surNotifications.map((sur) => (
                              <div
                                key={`sur-${sur.SurgeryBookingID}`}
                                className="px-3 py-3 hover:bg-primary-50/60 rounded-xl transition-colors cursor-pointer group"
                                onClick={() => {
                                  setShowNotification(false);
                                  router.push("/user");
                                }}
                              >
                                <div className="flex justify-between items-start mb-1.5">
                                  <div className="font-semibold text-slate-800 text-sm group-hover:text-primary-700 transition-colors">
                                    {sur.sur_surgery?.SurgeryName || "Surgery"}
                                  </div>
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-600 rounded-lg">
                                    SURG
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500">
                                  {sur.Status} – {formatDate(sur.SurgeryDateTime)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {totalCount === 0 && (
                          <div className="px-6 py-12 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                              <BellIcon className="w-6 h-6 text-slate-300" />
                            </div>
                            <p className="text-sm text-slate-500 font-medium">No upcoming bookings</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-200 ${
                      open ? "bg-primary-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative">
                      <Image
                        src={profileImageSrc}
                        alt={userName}
                        width={36}
                        height={36}
                        className="rounded-xl ring-2 ring-primary-200 object-cover"
                        unoptimized
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
                    </div>
                    <span className="hidden lg:inline text-sm font-semibold text-slate-700">
                      {userName}
                    </span>
                    <ChevronDown
                      className={`hidden lg:inline w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {open && (
                    <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-200 py-2 animate-slideDownFade">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900">{userName}</p>
                        <p className="text-xs text-slate-500">Manage your account</p>
                      </div>
                      <Link
                        href="/user/modules/sec/userProfile/myProfile"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors no-underline"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/user/modules/hop/appointment/viewBookedAppointment"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors no-underline"
                      >
                        My Appointments
                      </Link>
                      <Link
                        href="/user/modules/phm/medicines/orders"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors no-underline"
                      >
                        Medicine Orders
                      </Link>
                      <div className="h-px bg-slate-100 my-1" />
                      <form action={logout}>
                        <button className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors rounded-b-2xl">
                          Logout
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {isLogin && (
              <button
                onClick={() => setShowNotification(!showNotification)}
                className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <BellIcon
                  className={`w-5 h-5 ${totalCount > 0 ? "text-primary-600" : "text-slate-500"}`}
                />
                {totalCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[68px] left-0 right-0 bg-white border-b border-slate-200 shadow-lg animate-slideDownFade z-50">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!isLogin && (
                <Link
                  href="/login"
                  className="block gradient-primary text-center text-white px-4 py-3 rounded-xl text-sm font-bold no-underline mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Signup
                </Link>
              )}
              {isLogin && (
                <>
                  <div className="h-px bg-slate-100 my-2" />
                  <Link
                    href="/user/modules/sec/userProfile/myProfile"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 rounded-xl no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Image
                      src={profileImageSrc}
                      alt={userName}
                      width={28}
                      height={28}
                      className="rounded-lg ring-1 ring-slate-200 object-cover"
                      unoptimized
                    />
                    {userName}
                  </Link>
                  <Link
                    href="/user/modules/hop/appointment/viewBookedAppointment"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 rounded-xl no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Appointments
                  </Link>
                  <Link
                    href="/user/modules/phm/medicines/orders"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 rounded-xl no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Medicine Orders
                  </Link>
                  <form action={logout}>
                    <button className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      Logout
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile Notification Panel */}
        {isLogin && showNotification && (
          <div
            ref={notificationRef}
            className="md:hidden absolute top-[68px] left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50 max-h-96 overflow-y-auto animate-slideDownFade"
          >
            <div className="gradient-hero px-5 py-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-sm">Upcoming Bookings</h3>
                {totalCount > 0 && (
                  <span className="px-2.5 py-1 text-xs font-bold bg-white/20 text-white rounded-lg">
                    {totalCount}
                  </span>
                )}
              </div>
            </div>

            {totalCount > 0 ? (
              <div className="divide-y divide-slate-100 p-2">
                {apptNotifications.map((appt) => (
                  <div key={`m-appt-${appt.AppointmentID}`} className="p-3 text-sm">
                    <p className="font-bold text-slate-800">{appt.hop_doctor?.DoctorName}</p>
                    <p className="text-xs text-slate-500 mt-1">{formatDate(appt.AppointmentDate)}</p>
                  </div>
                ))}
                {labNotifications.map((lab) => (
                  <div key={`m-lab-${lab.LabTestOrderID}`} className="p-3 text-sm">
                    <p className="font-bold text-slate-800">{lab.lab_labtest?.LabTestName}</p>
                    <p className="text-xs text-slate-500 mt-1">Lab Test ordered</p>
                  </div>
                ))}
                {surNotifications.map((sur) => (
                  <div key={`m-sur-${sur.SurgeryBookingID}`} className="p-3 text-sm">
                    <p className="font-bold text-slate-800">{sur.sur_surgery?.SurgeryName}</p>
                    <p className="text-xs text-slate-500 mt-1">{sur.Status}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-10 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <BellIcon className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-sm text-slate-500">No upcoming appointments</p>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}