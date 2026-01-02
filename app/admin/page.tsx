import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Welcome back, Administrator.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Doctors" value="124" icon="👨‍⚕️" color="bg-blue-50 text-blue-600" />
        <StatCard title="Total Patients" value="8,432" icon="🤕" color="bg-green-50 text-green-600" />
        <StatCard title="Appointments Today" value="45" icon="📅" color="bg-purple-50 text-purple-600" />
        <StatCard title="Pending Lab Orders" value="12" icon="🧪" color="bg-orange-50 text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/components/hop/doctor/add" className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all group">
              <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">👨‍⚕️</span>
              <span className="text-sm font-medium text-gray-600">Add Doctor</span>
            </Link>
            <Link href="/admin/components/hop/patient/add" className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-green-300 transition-all group">
              <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🤕</span>
              <span className="text-sm font-medium text-gray-600">Register Patient</span>
            </Link>
            <Link href="/admin/components/lab/labtest/add" className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-orange-300 transition-all group">
              <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🧪</span>
              <span className="text-sm font-medium text-gray-600">Add Lab Test</span>
            </Link>
            <Link href="/admin/components/hop/appointment" className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-300 transition-all group">
              <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📅</span>
              <span className="text-sm font-medium text-gray-600">View Appointments</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity Mock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h3>
          <ul className="divide-y divide-gray-100">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                    P{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Patient Name {i}</p>
                    <p className="text-xs text-gray-500">Dr. Smith • Cardio</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">10:30 AM</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${color}`}>
        {icon}
      </div>
    </div>
  )
}