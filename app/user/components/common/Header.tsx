"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BellIcon, Menu, X } from "lucide-react";
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

  /* 🔔 Notification states */
  const [totalCount, setTotalCount] = useState(0);
  const [apptNotifications, setApptNotifications] = useState<AppointmentNotification[]>([]);
  const [labNotifications, setLabNotifications] = useState<LabOrderNotification[]>([]);
  const [surNotifications, setSurNotifications] = useState<SurgeryBookingNotification[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileImageSrc = userProfile?.profileUrl || "/profile.svg";
  const userName = userProfile?.fullName || "User";

  const navItems: NavItem[] = [
    { label: "Home", href: "/user" },
    { label: "Book Appointment", href: "/user/modules/hop/appointment/doctorListPage" },
    { label: "Find Doctors", href: "/user/modules/hop/findDoctors" },
    { label: "Order Medicines", href: "/user/modules/phm/medicines" },
  ];

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
                    className={`w-5 h-5 ${totalCount > 0 ? "text-primary-600" : "text-industrial-500"
                      }`}
                  />
                  {totalCount > 0 && (
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
                          Upcoming Tasks & Bookings
                        </h3>
                        {totalCount > 0 && (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-primary-50 text-primary-700 rounded-md border border-primary-100">
                            {totalCount}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {/* Appointments */}
                      {apptNotifications.length > 0 && (
                        <div className="p-2 bg-gray-50/30">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">Appointments</p>
                          {apptNotifications.map((appt) => (
                            <div
                              key={`appt-${appt.AppointmentID}`}
                              className="px-2 py-3 hover:bg-white rounded-md transition-colors cursor-pointer group"
                              onClick={() => {
                                setShowNotification(false);
                                router.push("/user/modules/hop/appointment/viewBookedAppointment");
                              }}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <div className="font-semibold text-industrial-900 text-sm group-hover:text-primary-600">
                                  {appt.hop_doctor?.DoctorName || "Doctor Appointment"}
                                </div>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">APPT</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {formatDate(appt.AppointmentDate)} at {formatTime(appt.AppointmentDate)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Lab Tests */}
                      {labNotifications.length > 0 && (
                        <div className="p-2 bg-gray-50/30">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">Lab Tests</p>
                          {labNotifications.map((lab) => (
                            <div
                              key={`lab-${lab.LabTestOrderID}`}
                              className="px-2 py-3 hover:bg-white rounded-md transition-colors cursor-pointer group"
                              onClick={() => {
                                setShowNotification(false);
                                router.push("/user");
                              }}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <div className="font-semibold text-industrial-900 text-sm group-hover:text-primary-600">
                                  {lab.lab_labtest?.LabTestName || "Diagnostic Test"}
                                </div>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded">LAB</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                Ordered for: {lab.hop_patient?.PatientName || "Self"}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Surgeries */}
                      {surNotifications.length > 0 && (
                        <div className="p-2 bg-gray-50/30">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">Surgeries</p>
                          {surNotifications.map((sur) => (
                            <div
                              key={`sur-${sur.SurgeryBookingID}`}
                              className="px-2 py-3 hover:bg-white rounded-md transition-colors cursor-pointer group"
                              onClick={() => {
                                setShowNotification(false);
                                router.push("/user");
                              }}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <div className="font-semibold text-industrial-900 text-sm group-hover:text-primary-600">
                                  {sur.sur_surgery?.SurgeryName || "Surgery"}
                                </div>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded">SURG</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {sur.Status} - {formatDate(sur.SurgeryDateTime)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {totalCount === 0 && (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <BellIcon className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No upcoming bookings</p>
                        </div>
                      )}
                    </div>
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
                    <Link href="/user/modules/sec/userProfile/myProfile" className="block px-4 py-2.5 text-sm font-medium text-industrial-700 hover:bg-industrial-50 hover:text-primary-600 transition-colors no-underline">
                      My Profile
                    </Link>
                    <Link href="/user/modules/hop/appointment/viewBookedAppointment" className="block px-4 py-2.5 text-sm font-medium text-industrial-700 hover:bg-industrial-50 hover:text-primary-600 transition-colors no-underline">
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
                  className={`w-6 h-6 ${totalCount > 0 ? "text-red-500" : "text-gray-500"
                    }`}
                />
                {totalCount > 0 && (
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
                  Upcoming Bookings
                </h3>
                {totalCount > 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                    {totalCount}
                  </span>
                )}
              </div>
            </div>

            {totalCount > 0 ? (
              <div className="divide-y divide-gray-100 p-2">
                {/* Simplified Mobile View */}
                {apptNotifications.map((appt) => (
                  <div key={`m-appt-${appt.AppointmentID}`} className="p-3 text-sm">
                    <p className="font-bold">{appt.hop_doctor?.DoctorName}</p>
                    <p className="text-xs text-gray-500">{formatDate(appt.AppointmentDate)}</p>
                  </div>
                ))}
                {labNotifications.map((lab) => (
                  <div key={`m-lab-${lab.LabTestOrderID}`} className="p-3 text-sm">
                    <p className="font-bold">{lab.lab_labtest?.LabTestName}</p>
                    <p className="text-xs text-gray-500">Lab Test ordered</p>
                  </div>
                ))}
                {surNotifications.map((sur) => (
                  <div key={`m-sur-${sur.SurgeryBookingID}`} className="p-3 text-sm">
                    <p className="font-bold">{sur.sur_surgery?.SurgeryName}</p>
                    <p className="text-xs text-gray-500">{sur.Status}</p>
                  </div>
                ))}
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