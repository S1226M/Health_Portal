"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BellIcon, Menu, X } from "lucide-react";
import { logout } from "@/app/actions/logout";

/* ---------- Types ---------- */
interface NavItem {
  label: string;
  href: string;
}

interface UserProfile {
  profileUrl?: string | null;
  fullName?: string | null;
}

/* ---------- Component ---------- */
export default function Header({
  isLogin,
  userProfile
}: {
  isLogin: boolean;
  userProfile?: UserProfile;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Default image fallback if userProfile has no image
  const profileImageSrc = userProfile?.profileUrl || "/profile.svg";
  const userName = userProfile?.fullName || "User";

  const navItems: NavItem[] = [
    {
      label: "Book Appointment",
      href: "/user/components/hop/appointment/doctorListPage",
    },
    {
      label: "Find Doctors",
      href: "/hop/doctor",
    },
    {
      label: "Video Consult",
      href: "/videoconsult",
    },
    {
      label: "Medicines",
      href: "/phm/medicine",
    },
    {
      label: "Lab Tests",
      href: "/lab/labtest",
    },
    {
      label: "Surgeries",
      href: "/sur/surgery",
    },
  ];

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900 no-underline">
            <span className="text-[#2d2d32]">practo</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors no-underline"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {!isLogin ? (
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 no-underline"
              >
                Login / Signup
              </Link>
            ) : (
              <div className="flex items-center gap-4 relative">
                {/* Notification Bell */}
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <BellIcon className="w-5 h-5" />
                </button>

                {/* Profile Dropdown Trigger */}
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => setOpen(!open)}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 relative">
                    <Image
                      src={profileImageSrc}
                      alt={userName}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                      unoptimized // Adding unoptimized to bypass next/image strict optimization potentially causing issues with some external URLs
                    />
                  </div>
                  {/* Optional: Show name on desktop or a chevron */}
                  <span className="text-xs font-medium text-gray-700 max-w-[100px] truncate hidden lg:block">
                    {userName}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute top-10 right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                    </div>
                    <Link
                      href="/user/components/userProfile/myProfile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline"
                      onClick={() => setOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/user/components/hop/appointment/viewBookedAppointment"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline"
                      onClick={() => setOpen(false)}
                    >
                      My Appointments
                    </Link>
                    <Link
                      href="/user/components/userProfile/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline"
                      onClick={() => setOpen(false)}
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    {/* <Link
                      href="/logout"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 no-underline"
                    >
                      Logout  
                    </Link>
                    <form action={logout}>
                      <button
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 no-underline"
                        type="submit"
                      >
                        Logout
                      </button>
                    </form> */}
                    <form action={logout}>
                      <button
                        type="submit"
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 no-underline"
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-4 space-y-1 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {!isLogin ? (
            <Link
              href="/login"
              className="block w-full text-center mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Signup
            </Link>
          ) : (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex items-center px-3 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 relative">
                    <Image
                      src={profileImageSrc}
                      alt={userName}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{userName}</div>
                </div>
              </div>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>
              <Link
                href="/user/components/hop/appointment/viewBookedAppointment"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                My Appointments
              </Link>
              <Link
                href="/logout"
                className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}