"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
          } flex flex-col`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <Link href="/admin" className="text-xl font-bold text-blue-600 truncate px-4">
            {isSidebarOpen ? 'Health Admin' : 'HA'}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            <SidebarItem title="Dashboard" href="/admin" icon="📊" isOpen={isSidebarOpen} />
            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="HOSPITAL (HOP)" isOpen={isSidebarOpen} />
            <SidebarItem title="Doctors" href="/admin/components/hop/doctor" icon="👨‍⚕️" isOpen={isSidebarOpen} />
            <SidebarItem title="Hospitals" href="/admin/components/hop/hospital" icon="🏥" isOpen={isSidebarOpen} />
            <SidebarItem title="Patients" href="/admin/components/hop/patient" icon="🤕" isOpen={isSidebarOpen} />
            <SidebarItem title="Appointments" href="/admin/components/hop/appointment" icon="📅" isOpen={isSidebarOpen} />
            <SidebarItem title="Specializations" href="/admin/components/hop/specialization" icon="🩺" isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="LABORATORY (LAB)" isOpen={isSidebarOpen} />
            <SidebarItem title="Lab Tests" href="/admin/components/lab/labtest" icon="🧪" isOpen={isSidebarOpen} />
            <SidebarItem title="Test Orders" href="/admin/components/lab/labtestorder" icon="📝" isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="PHARMACY (PHM)" isOpen={isSidebarOpen} />
            <SidebarItem title="Medicines" href="/admin/components/phm/medicine" icon="💊" isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="LOCATION (LOC)" isOpen={isSidebarOpen} />
            <SidebarItem title="Cities" href="/admin/components/loc/city" icon="🏙️" isOpen={isSidebarOpen} />
            <SidebarItem title="States" href="/admin/components/loc/state" icon="🗺️" isOpen={isSidebarOpen} />
            <SidebarItem title="Countries" href="/admin/components/loc/country" icon="🌍" isOpen={isSidebarOpen} />
            
            <SidebarItem title="Paymentmode" href="/admin/components/pay/paymentmode" icon="🌍" isOpen={isSidebarOpen} />
            
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-md hover:bg-gray-50 text-gray-500"
          >
            {isSidebarOpen ? '<< Collapse' : '>>'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-gray-800">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ title, href, icon, isOpen }: { title: string, href: string, icon: string, isOpen: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        title={title}
      >
        <span className="text-xl w-6 text-center">{icon}</span>
        {isOpen && <span className="text-sm font-medium whitespace-nowrap">{title}</span>}
      </Link>
    </li>
  )
}

function SidebarLabel({ title, isOpen }: { title: string, isOpen: boolean }) {
  if (!isOpen) return null;
  return (
    <li className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {title}
    </li>
  )
}