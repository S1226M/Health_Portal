"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

// 1. Define the shape of your static data items
interface NavItem {
  label: string;
  href: string;
}

// 2. Define the props for the Dropdown component
interface NavDropdownProps {
  label: string;
  items: NavItem[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // These arrays are your "Static Data"
  // TypeScript will now infer they match the NavItem structure
  const navItems: NavItem[] = [
    { label: "Find Doctors", href: "/" },
    { label: "Video Consult", href: "/videoConsult/viewConsult" },
    { label: "Lab Tests", href: "/lab/labTest" },
    { label: "Surgeries", href: "/sur/surgery" },
  ];

  const corporateItems: NavItem[] = [
    { label: "Corporate Health", href: "#" },
    { label: "Employee Wellness", href: "#" },
    { label: "Bulk Tests", href: "#" },
  ];

  const providerItems: NavItem[] = [
    { label: "Doctor Registration", href: "#" },
    { label: "Partner with us", href: "#" },
    { label: "Business Support", href: "#" },
  ];

  const securityItems: NavItem[] = [
    { label: "Security & Privacy", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "/contact" },
  ];

  // 3. Apply the type to the component props here: ({ label, items }: NavDropdownProps)
  const NavDropdown = ({ label, items }: NavDropdownProps) => (
    <div className="dropdown d-inline-block">
      <button
        className="btn btn-link text-decoration-none text-secondary fw-medium d-flex align-items-center gap-1 p-0 border-0 bg-transparent"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {label}
        <ChevronDown size={16} />
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        {items.map((item) => (
          <li key={item.label}>
            {item.href.startsWith("/") ? (
              <Link className="dropdown-item" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <a className="dropdown-item" href={item.href}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm">
      <nav className="container py-3">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link href="/" className="text-decoration-none">
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center gap-1">
                <span
                  className="rounded-circle bg-primary"
                  style={{ width: "8px", height: "8px" }}
                ></span>
                <span className="fw-bold fs-4 text-dark">practo</span>
                <span
                  className="rounded-circle bg-success"
                  style={{ width: "8px", height: "8px" }}
                ></span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="d-none d-md-flex align-items-center gap-4">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-decoration-none text-secondary fw-medium small hover-primary"
                  style={{ fontSize: "0.9rem" }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-decoration-none text-secondary fw-medium small hover-primary"
                  style={{ fontSize: "0.9rem" }}
                >
                  {item.label}
                </a>
              ),
            )}
          </div>

          {/* Right Section - Desktop */}
          <div className="d-none d-md-flex align-items-center gap-3">
            <NavDropdown label="For Corporates" items={corporateItems} />
            <NavDropdown label="For Providers" items={providerItems} />
            <NavDropdown label="Security & help" items={securityItems} />

            <span
              className="badge rounded-pill bg-primary text-white"
              style={{ fontSize: "0.7rem" }}
            >
              NEW
            </span>

            <Link
              href="/login"
              className="btn btn-primary btn-sm fw-medium px-3 text-decoration-none"
            >
              Login / Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn btn-light d-md-none border-0 bg-transparent p-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="text-dark" />
            ) : (
              <Menu className="text-dark" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="d-md-none border-top bg-white">
          <div className="p-3 d-flex flex-column gap-2">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-decoration-none text-secondary fw-medium py-2 px-2 rounded hover-bg-light"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-decoration-none text-secondary fw-medium py-2 px-2 rounded hover-bg-light"
                >
                  {item.label}
                </a>
              ),
            )}
            <hr className="my-2" />

            {/* We can also reuse static data here for cleaner code */}
            {[...corporateItems, ...providerItems, ...securityItems].map(
              (item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-decoration-none text-secondary fw-medium py-2 px-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-decoration-none text-secondary fw-medium py-2 px-2"
                  >
                    {item.label}
                  </a>
                ),
            )}

            <hr className="my-2" />
            <Link
              href="/login"
              className="btn btn-primary w-100 fw-medium text-decoration-none"
            >
              Login / Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
