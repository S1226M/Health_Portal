import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#28328c]">
          Health Portal
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/admin"
            className="text-gray-600 hover:text-[#28328c] font-medium"
          >
            Admin
          </Link>
          <Link
            href="/user"
            className="text-gray-600 hover:text-[#28328c] font-medium"
          >
            User
          </Link>
        </nav>
      </div>
    </header>
  );
}
