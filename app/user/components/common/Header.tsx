"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BellIcon, Menu, X } from "lucide-react";

/* ---------- Types ---------- */
interface NavItem {
  label: string;
  href: string;
}

/* ---------- Component ---------- */
export default function Header({ isLogin }: { isLogin: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      label: "Book Appointment",
      href: "/user/components/hop/appointment/doctorListPage",
    },
  ];

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm">
      <nav className="container py-3">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link href="/" className="fw-bold fs-4 text-dark text-decoration-none">
            practo
          </Link>

          {/* Desktop Nav */}
          <div className="d-none d-md-flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-secondary text-decoration-none fw-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="d-none d-md-flex align-items-center gap-3">
            {!isLogin ? (
              <Link href="/login" className="btn btn-primary btn-sm px-3">
                Login / Signup
              </Link>
            ) : (
              <div style={{ position: "relative" }}>
                <Image
                  src="/profile.svg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-circle"
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpen(!open)}
                />
                {/* notification icon */}
                <BellIcon className="w-6 h-6" />

                {open && (
                  <div
                  className="shadow-sm"
                  style={{
                    position: "absolute",
                      top: "50px",
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      width: "150px",
                    }}
                    >
                    <Link href="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link href="/settings" className="dropdown-item">
                      Settings
                    </Link>
                    <Link href="/logout" className="dropdown-item text-danger">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="btn d-md-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="d-md-none p-3 border-top">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="d-block py-2 text-secondary text-decoration-none"
            >
              {item.label}
            </Link>
          ))}

          {!isLogin && (
            <Link href="/login" className="btn btn-primary w-100 mt-3">
              Login / Signup
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
