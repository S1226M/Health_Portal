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
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-industrial-900 text-white mt-auto border-t border-industrial-800 font-sans">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5 group">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-primary-600 transition-transform group-hover:scale-110"></span>
              <span className="font-extrabold text-2xl tracking-tight text-white">Health Portal</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 opacity-80"></span>
            </div>
            <p className="text-industrial-400 text-[15px] mb-6 max-w-sm leading-relaxed font-medium">
              Your trusted enterprise healthcare partner. Connecting patients with premium quality healthcare services through a secure infrastructure.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-industrial-800 text-industrial-400 rounded-md hover:bg-primary-600 hover:text-white transition-colors border border-industrial-700 hover:border-primary-600" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-industrial-800 text-industrial-400 rounded-md hover:bg-primary-600 hover:text-white transition-colors border border-industrial-700 hover:border-primary-600" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-industrial-800 text-industrial-400 rounded-md hover:bg-primary-600 hover:text-white transition-colors border border-industrial-700 hover:border-primary-600" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-industrial-800 text-industrial-400 rounded-md hover:bg-primary-600 hover:text-white transition-colors border border-industrial-700 hover:border-primary-600" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-lg mb-6 text-industrial-100">Quick Links</h5>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Find Doctors
                </a>
              </li>
              <li>
                <a href="#" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Video Consult
                </a>
              </li>
              <li>
                <a href="#" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Lab Tests
                </a>
              </li>
            </ul>
          </div>

          {/* For Patients */}
          <div>
            <h5 className="font-bold text-lg mb-6 text-industrial-100">For Patients</h5>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Search for Doctors
                </a>
              </li>
              <li>
                <a href="#" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Book Appointments
                </a>
              </li>
              <li>
                <a href="#" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Order Medicines
                </a>
              </li>
              <li>
                <a href="#" className="text-industrial-400 hover:text-primary-400 transition-colors text-[14px] font-medium block no-underline">
                  Health Records
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-bold text-lg mb-6 text-industrial-100">Contact</h5>
            <ul className="space-y-4 text-industrial-400 text-[14px] font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 mt-0.5 shrink-0" />
                <span>
                  123 Healthcare Avenue,<br />
                  Medical District, Enterprise Box 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary-400 transition-colors no-underline">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <a href="mailto:enterprise@healthportal.com" className="hover:text-primary-400 transition-colors break-all no-underline">
                  enterprise@healthportal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-industrial-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-industrial-500 text-[13px] font-medium mb-0 text-center md:text-left">
              &copy; {new Date().getFullYear()} Health Portal. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-industrial-500 hover:text-white transition-colors text-[13px] font-medium no-underline">
                Privacy Policy
              </a>
              <a href="#" className="text-industrial-500 hover:text-white transition-colors text-[13px] font-medium no-underline">
                Terms of Service
              </a>
              <a href="#" className="text-industrial-500 hover:text-white transition-colors text-[13px] font-medium no-underline">
                Security & Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
