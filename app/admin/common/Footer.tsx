"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="rounded-circle bg-primary" style={{ width: '8px', height: '8px' }}></span>
              <span className="fw-bold fs-4 text-white">practo</span>
              <span className="rounded-circle bg-success" style={{ width: '8px', height: '8px' }}></span>
            </div>
            <p className="text-secondary small mb-3">
              Your trusted healthcare partner. Connecting patients with quality healthcare services.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-secondary text-decoration-none" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary text-decoration-none" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary text-decoration-none" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary text-decoration-none" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-sm-6">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/" className="text-secondary text-decoration-none small">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contact" className="text-secondary text-decoration-none small">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Find Doctors
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Video Consult
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Lab Tests
                </a>
              </li>
            </ul>
          </div>

          {/* For Patients */}
          <div className="col-md-2 col-sm-6">
            <h5 className="fw-bold mb-3">For Patients</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Search for Doctors
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Book Appointments
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Order Medicines
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Health Records
                </a>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div className="col-md-2 col-sm-6">
            <h5 className="fw-bold mb-3">For Providers</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Doctor Registration
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Partner with us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Business Support
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none small">
                  Provider Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-sm-6">
            <h5 className="fw-bold mb-3">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start gap-2">
                <MapPin size={18} className="text-primary mt-1" />
                <span className="text-secondary small">
                  123 Healthcare Street,<br />
                  Medical District, City 12345
                </span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Phone size={18} className="text-primary" />
                <a href="tel:+1234567890" className="text-secondary text-decoration-none small">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Mail size={18} className="text-primary" />
                <a href="mailto:contact@practo.com" className="text-secondary text-decoration-none small">
                  contact@practo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        {/* Copyright */}
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
              <p className="text-secondary small mb-0">
                © {new Date().getFullYear()} Practo. All rights reserved.
              </p>
              <div className="d-flex gap-4">
                <a href="#" className="text-secondary text-decoration-none small">
                  Privacy Policy
                </a>
                <a href="#" className="text-secondary text-decoration-none small">
                  Terms of Service
                </a>
                <a href="#" className="text-secondary text-decoration-none small">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

