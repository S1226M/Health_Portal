"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Dashboard,
  LocalHospital,
  People,
  Receipt,
  Category,
  Science,
  Medication,
  Healing,
  Security,
  Payment,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  Event,
  Assignment,
  Person,
  Star,
  Hotel,
  Description,
  AttachMoney,
  MedicalServices,
  Biotech,
  Inventory,
  ShoppingCart,
  LocalPharmacy,
  ContentCut,
  LocationCity,
  Map,
  Public,
  AdminPanelSettings,
  Group
} from '@mui/icons-material';

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
          <Link href="/admin" className="text-xl font-bold text-black truncate px-4 no-underline">
            {isSidebarOpen ? 'Health Admin' : 'HA'}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
          <ul className="space-y-1 px-2">
            <SidebarItem title="Dashboard" href="/admin" icon={<Dashboard />} isOpen={isSidebarOpen} />
            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="HOSPITAL (HOP)" isOpen={isSidebarOpen} />
            <SidebarItem title="Appointments" href="/admin/components/hop/appointment" icon={<Event />} isOpen={isSidebarOpen} />
            <SidebarItem title="Diagnosis Types" href="/admin/components/hop/diagnosistype" icon={<Assignment />} isOpen={isSidebarOpen} />
            <SidebarItem title="Doctors" href="/admin/components/hop/doctor" icon={<LocalHospital />} isOpen={isSidebarOpen} />
            <SidebarItem title="Doctor Reviews" href="/admin/components/hop/doctorreview" icon={<Star />} isOpen={isSidebarOpen} />
            <SidebarItem title="Hospitals" href="/admin/components/hop/hospital" icon={<LocalHospital />} isOpen={isSidebarOpen} />
            <SidebarItem title="Hosp. Treatments" href="/admin/components/hop/hospitaltreatment" icon={<Healing />} isOpen={isSidebarOpen} />
            <SidebarItem title="OPD" href="/admin/components/hop/opd" icon={<Hotel />} isOpen={isSidebarOpen} />
            <SidebarItem title="OPD Diag. Types" href="/admin/components/hop/opddiagnosistype" icon={<Description />} isOpen={isSidebarOpen} />
            <SidebarItem title="Patients" href="/admin/components/hop/patient" icon={<Person />} isOpen={isSidebarOpen} />
            <SidebarItem title="Receipts" href="/admin/components/hop/receipt" icon={<Receipt />} isOpen={isSidebarOpen} />
            <SidebarItem title="Receipt Transactions" href="/admin/components/hop/receipttran" icon={<AttachMoney />} isOpen={isSidebarOpen} />
            <SidebarItem title="Specializations" href="/admin/components/hop/specialization" icon={<MedicalServices />} isOpen={isSidebarOpen} />
            <SidebarItem title="Sub Treat. Types" href="/admin/components/hop/subtreatmenttype" icon={<Category />} isOpen={isSidebarOpen} />
            <SidebarItem title="Treatment Types" href="/admin/components/hop/treatmenttype" icon={<Medication />} isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="LABORATORY (LAB)" isOpen={isSidebarOpen} />
            <SidebarItem title="Lab Tests" href="/admin/components/lab/labtest" icon={<Science />} isOpen={isSidebarOpen} />
            <SidebarItem title="Lab Test Orders" href="/admin/components/lab/labtestorder" icon={<Assignment />} isOpen={isSidebarOpen} />
            <SidebarItem title="Lab Test Types" href="/admin/components/lab/labtesttype" icon={<Biotech />} isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="PHARMACY (PHM)" isOpen={isSidebarOpen} />
            <SidebarItem title="Medicines" href="/admin/components/phm/medicine" icon={<LocalPharmacy />} isOpen={isSidebarOpen} />
            <SidebarItem title="Med. Categories" href="/admin/components/phm/medicinecategory" icon={<Inventory />} isOpen={isSidebarOpen} />
            <SidebarItem title="Medicine Orders" href="/admin/components/phm/orderofmedicine" icon={<ShoppingCart />} isOpen={isSidebarOpen} />
            <SidebarItem title="Payment Type" href="/admin/components/phm/medicineorderpaymenttype" icon={<Payment />} isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="SURGERY (SUR)" isOpen={isSidebarOpen} />
            <SidebarItem title="Surgeries" href="/admin/components/sur/surgery" icon={<ContentCut />} isOpen={isSidebarOpen} />
            <SidebarItem title="Surgery Bookings" href="/admin/components/sur/surgerybooking" icon={<Event />} isOpen={isSidebarOpen} />
            <SidebarItem title="Surgery Items" href="/admin/components/sur/surgeryitem" icon={<MedicalServices />} isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="LOCATION (LOC)" isOpen={isSidebarOpen} />
            <SidebarItem title="Cities" href="/admin/components/loc/city" icon={<LocationCity />} isOpen={isSidebarOpen} />
            <SidebarItem title="States" href="/admin/components/loc/state" icon={<Map />} isOpen={isSidebarOpen} />
            <SidebarItem title="Countries" href="/admin/components/loc/country" icon={<Public />} isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="PAYMENTMODE (PAY)" isOpen={isSidebarOpen} />
            <SidebarItem title="Payment Mode" href="/admin/components/pay/paymentmode" icon={<Payment />} isOpen={isSidebarOpen} />

            <div className="my-2 border-t border-gray-100"></div>
            <SidebarLabel title="SECURITY (SEC)" isOpen={isSidebarOpen} />
            <SidebarItem title="Roles" href="/admin/components/sec/role" icon={<AdminPanelSettings />} isOpen={isSidebarOpen} />
            <SidebarItem title="Users" href="/admin/components/sec/user" icon={<Group />} isOpen={isSidebarOpen} />

          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-md hover:bg-gray-50 text-gray-500"
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
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

function SidebarItem({ title, href, icon, isOpen }: { title: string, href: string, icon: React.ReactNode, isOpen: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-black hover:bg-gray-100 hover:text-black transition-colors no-underline"
        title={title}
      >
        <span className="flex items-center justify-center w-6 text-2xl">{typeof icon === 'string' ? icon : icon}</span>
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