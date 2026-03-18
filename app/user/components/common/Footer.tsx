"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  HeartPulse,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white mt-auto overflow-hidden font-sans">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Health<span className="text-primary-400">Portal</span>
              </span>
            </div>
            <p className="text-slate-400 text-[15px] mb-6 max-w-sm leading-relaxed font-medium">
              Your trusted healthcare partner. Connecting patients with premium
              quality healthcare services through a modern, secure platform.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300 border border-white/5 hover:border-primary-600 hover:shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-lg mb-6 text-white">Quick Links</h5>
            <ul className="space-y-3.5">
              {[
                { label: "Home", href: "/" },
                { label: "Contact Us", href: "/contact" },
                { label: "Find Doctors", href: "/user/modules/hop/findDoctors" },
                { label: "Video Consult", href: "#" },
                { label: "Lab Tests", href: "/user/modules/lab/testList" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Patients */}
          <div>
            <h5 className="font-bold text-lg mb-6 text-white">For Patients</h5>
            <ul className="space-y-3.5">
              {[
                { label: "Search for Doctors", href: "/user/modules/hop/findDoctors" },
                { label: "Book Appointments", href: "/user/modules/hop/appointment/doctorListPage" },
                { label: "Order Medicines", href: "/user/modules/phm/medicines" },
                { label: "Health Records", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-bold text-lg mb-6 text-white">Contact</h5>
            <ul className="space-y-4 text-slate-400 text-[14px] font-medium">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} className="text-primary-400" />
                </div>
                <span>
                  123 Healthcare Avenue,
                  <br />
                  Medical District, Enterprise Box 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-primary-400" />
                </div>
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary-400 transition-colors no-underline text-slate-400"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-600/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-primary-400" />
                </div>
                <a
                  href="mailto:enterprise@healthportal.com"
                  className="hover:text-primary-400 transition-colors break-all no-underline text-slate-400"
                >
                  enterprise@healthportal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-[13px] font-medium mb-0 text-center md:text-left">
              &copy; {new Date().getFullYear()} Health Portal. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Privacy Policy", "Terms of Service", "Security & Compliance"].map(
                (text) => (
                  <a
                    key={text}
                    href="#"
                    className="text-slate-500 hover:text-primary-400 transition-colors text-[13px] font-medium no-underline"
                  >
                    {text}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
