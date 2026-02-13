import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Health Portal. All rights reserved.
      </div>
    </footer>
  );
}
