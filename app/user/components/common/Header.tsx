"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BellIcon, Menu, X } from "lucide-react";
import { logout } from "@/app/actions/logout";
import { getFutureAppointments } from "../../modules/appointments/getFutureAppointments";

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

  /* 🔔 Notification states */
  const [hasFutureAppt, setHasFutureAppt] = useState(false);
  const [notifications, setNotifications] = useState<AppointmentNotification[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileImageSrc = userProfile?.profileUrl || "/profile.svg";
  const userName = userProfile?.fullName || "User";

  const navItems: NavItem[] = [
    { label: "Home", href: "/user" },
    { label: "Book Appointment", href: "/user/components/hop/appointment/doctorListPage" },
    { label: "Find Doctors", href: "/user/components/findDoctors" },
    // { label: "Video Consult", href: "/videoconsult" },
    // { label: "Medicines", href: "/phm/medicine" },
    // { label: "Lab Tests", href: "/lab/labtest" },
    // { label: "Surgeries", href: "/sur/surgery" },
  ];

  /* 🔔 Fetch future appointments */
  useEffect(() => {
    let isMounted = true;

    if (!isLogin) {
      if (isMounted) {
        setHasFutureAppt(false);
        setNotifications([]);
      }
      return;
    }

    getFutureAppointments()
      .then((res) => {
        if (!isMounted) return;

        setHasFutureAppt(res.count > 0);
        setNotifications(res.count > 0 ? res.appointments : []);
      })
      .catch(() => {
        if (!isMounted) return;
        setHasFutureAppt(false);
        setNotifications([]);
      });

    return () => {
      isMounted = false;
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
    };

    if (showNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotification]);

  return (
    <header className="sticky top-0 bg-white border-b border-industrial-200 z-50 shadow-[0_1px_3px_rgb(0,0,0,0.05)]">
      <nav className="container mx-auto px-4 h-16">
        <div className="flex justify-between items-center h-full">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-industrial-900 tracking-tight no-underline">
            Health Portal
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-[15px] font-medium text-industrial-600 hover:text-primary-600 transition-colors duration-200 no-underline">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5 relative">
            {!isLogin ? (
              <Link href="/login" className="bg-industrial-900 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-industrial-800 transition-colors shadow-sm no-underline active:scale-[0.98]">
                Login / Signup
              </Link>
            ) : (
              <>
                {/* 🔔 Bell Icon */}
                <button
                  onClick={() => setShowNotification(!showNotification)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Notifications"
                >
                  <BellIcon
                    className={`w-5 h-5 ${hasFutureAppt ? "text-primary-600" : "text-industrial-500"
                      }`}
                  />
                  {hasFutureAppt && (
                    <>
                      <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
                    </>
                  )}
                </button>

                {/* 🔔 Notification Panel */}
                {showNotification && (
                  <div
                    ref={notificationRef}
                    className="absolute right-0 top-12 w-96 bg-white border border-industrial-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto animate-slideUpFade"
                  >
                    <div className="p-4 border-b border-industrial-100 bg-industrial-50/50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-industrial-900 text-sm">
                          Upcoming Appointments
                        </h3>
                        {hasFutureAppt && (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-primary-50 text-primary-700 rounded-md border border-primary-100">
                            {notifications.length}
                          </span>
                        )}
                      </div>
                    </div>

                    {notifications.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((appt) => {
                          if (!appt.AppointmentDate) return null;
                          const formattedDate = formatDate(appt.AppointmentDate);
                          const formattedTime = formatTime(appt.AppointmentDate);

                          return (
                            <div
                              key={appt.AppointmentID}
                              className="px-4 py-3 hover:bg-industrial-50 border-b border-industrial-50 last:border-0 transition-colors cursor-pointer group"
                              onClick={() => {
                                setShowNotification(false);
                                router.push("/user/components/hop/appointment/viewBookedAppointment");
                              }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <div className="font-semibold text-industrial-900 mb-0.5 text-sm group-hover:text-primary-600 transition-colors">
                                    {appt.hop_doctor?.DoctorName || "Doctor"}
                                  </div>
                                  {appt.hop_doctor?.hop_specialization?.SpecializationName && (
                                    <div className="text-xs text-industrial-500 mb-2">
                                      {appt.hop_doctor.hop_specialization.SpecializationName}
                                    </div>
                                  )}
                                </div>
                                <span
                                  className={`px-2 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-md border ${appt.Status === "Confirmed"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                    : appt.Status === "Pending"
                                      ? "bg-amber-50 text-amber-700 border-amber-100"
                                      : "bg-industrial-50 text-industrial-700 border-industrial-200"
                                    }`}
                                >
                                  {appt.Status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-700 mb-1">
                                <span className="font-medium">Date:</span> {formattedDate}
                              </div>
                              <div className="text-sm text-gray-700 mb-1">
                                <span className="font-medium">Time:</span> {formattedTime}
                                {appt.hop_timeslot_master?.SlotName && (
                                  <span className="text-gray-500 ml-1">
                                    ({appt.hop_timeslot_master.SlotName})
                                  </span>
                                )}
                              </div>
                              {appt.hop_doctor?.hop_hospital?.HospitalName && (
                                <div className="text-xs text-gray-500 mt-1">
                                  <span className="mr-1">📍</span>
                                  {appt.hop_doctor.hop_hospital.HospitalName}
                                </div>
                              )}
                              <div className="text-xs text-gray-400 mt-2">
                                Appt No: {appt.AppointmentNo}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <BellIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No upcoming appointments</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Profile */}
                <div onClick={() => setOpen(!open)} className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Image
                    src={profileImageSrc}
                    alt={userName}
                    width={36}
                    height={36}
                    className="rounded-md ring-1 ring-industrial-200 object-cover"
                    unoptimized
                  />
                  <span className="hidden lg:inline text-sm font-medium text-industrial-700">{userName}</span>
                </div>

                {open && (
                  <div className="absolute right-0 top-14 w-48 bg-white border border-industrial-200 rounded-md shadow-lg py-1 animate-slideUpFade">
                    <Link href="/user/components/userProfile/myProfile" className="block px-4 py-2.5 text-sm font-medium text-industrial-700 hover:bg-industrial-50 hover:text-primary-600 transition-colors no-underline">
                      My Profile
                    </Link>
                    <Link href="/user/components/hop/appointment/viewBookedAppointment" className="block px-4 py-2.5 text-sm font-medium text-industrial-700 hover:bg-industrial-50 hover:text-primary-600 transition-colors no-underline">
                      My Appointments
                    </Link>
                    <div className="h-px bg-industrial-100 my-1"></div>
                    <form action={logout}>
                      <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        Logout
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {isLogin && (
              <button
                onClick={() => setShowNotification(!showNotification)}
                className="relative p-2"
                aria-label="Notifications"
              >
                <BellIcon
                  className={`w-6 h-6 ${hasFutureAppt ? "text-red-500" : "text-gray-500"
                    }`}
                />
                {hasFutureAppt && (
                  <>
                    <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
                  </>
                )}
              </button>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Notification Panel */}
        {isLogin && showNotification && (
          <div
            ref={notificationRef}
            className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  Upcoming Appointments
                </h3>
                {hasFutureAppt && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </div>
            </div>

            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((appt) => {
                  if (!appt.AppointmentDate) return null;
                  const formattedDate = formatDate(appt.AppointmentDate);
                  const formattedTime = formatTime(appt.AppointmentDate);

                  return (
                    <div
                      key={appt.AppointmentID}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setShowNotification(false);
                        router.push("/user/components/hop/appointment/viewBookedAppointment");
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">
                            {appt.hop_doctor?.DoctorName || "Doctor"}
                          </div>
                          {appt.hop_doctor?.hop_specialization?.SpecializationName && (
                            <div className="text-xs text-gray-500 mb-1">
                              {appt.hop_doctor.hop_specialization.SpecializationName}
                            </div>
                          )}
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${appt.Status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : appt.Status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {appt.Status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-medium">Date:</span> {formattedDate}
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-medium">Time:</span> {formattedTime}
                        {appt.hop_timeslot_master?.SlotName && (
                          <span className="text-gray-500 ml-1">
                            ({appt.hop_timeslot_master.SlotName})
                          </span>
                        )}
                      </div>
                      {appt.hop_doctor?.hop_hospital?.HospitalName && (
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="mr-1">📍</span>
                          {appt.hop_doctor.hop_hospital.HospitalName}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-2">
                        Appt No: {appt.AppointmentNo}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <BellIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}