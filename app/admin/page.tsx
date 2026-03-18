import React from "react";
import Link from "next/link";
import {
  Group,
  PersonAdd,
  Event,
  Science,
  LocalHospital,
  People,
  ContentCut,
  Assignment,
} from "@mui/icons-material";
import {
  getDashboardStats,
  getRecentAppointments,
  getUpcomingSurgeries
} from "@/app/actions/dashboard";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const recentAppointments = await getRecentAppointments();
  const upcomingSurgeries = await getUpcomingSurgeries();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500">Welcome back, Administrator.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Doctors"
          value={stats.doctorCount.toString()}
          icon={<LocalHospital />}
          color="text-blue-600 bg-blue-50"
        />
        <StatCard
          title="Patients"
          value={stats.patientCount.toLocaleString()}
          icon={<People />}
          color="text-green-600 bg-green-50"
        />
        <StatCard
          title="Today's Appt."
          value={stats.appointmentTodayCount.toString()}
          icon={<Event />}
          color="text-purple-600 bg-purple-50"
        />
        <StatCard
          title="Lab Orders"
          value={stats.labOrderCount.toString()}
          icon={<Science />}
          color="text-orange-600 bg-orange-50"
        />
        <StatCard
          title="Surgeries"
          value={stats.surgeryCount.toString()}
          icon={<ContentCut />}
          color="text-rose-600 bg-rose-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Assignment className="text-gray-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3 flex-grow">
            <QuickActionLink
              href="/admin/components/hop/doctor/add"
              icon={<PersonAdd />}
              label="Add Doctor"
              color="blue"
            />
            <QuickActionLink
              href="/admin/components/hop/patient/add"
              icon={<Group />}
              label="Register Patient"
              color="green"
            />
            <QuickActionLink
              href="/admin/components/lab/labtest/add"
              icon={<Science />}
              label="Add Lab Test"
              color="orange"
            />
            <QuickActionLink
              href="/admin/components/hop/appointment"
              icon={<Event />}
              label="Appointments"
              color="purple"
            />
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Appointments
          </h3>
          <ul className="divide-y divide-gray-100">
            {recentAppointments.length > 0 ? (
              recentAppointments.map((appt) => (
                <li key={`appt-${appt.id}`} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {appt.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {appt.patientName}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">Dr. {appt.doctorName}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {appt.time}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No recent appointments.</p>
            )}
          </ul>
          <Link href="/admin/components/hop/appointment" className="text-xs text-blue-600 mt-4 block hover:underline no-underline">View all appointments &rarr;</Link>
        </div>

        {/* Upcoming Surgeries */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Surgeries
          </h3>
          <ul className="divide-y divide-gray-100">
            {upcomingSurgeries.length > 0 ? (
              upcomingSurgeries.map((s) => (
                <li key={`sur-${s.id}`} className="py-3">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-gray-800">{s.surgeryName}</p>
                    <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                      Scheduled
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Patient: {s.patientName}</span>
                    <span className="flex items-center gap-1">
                      <Event sx={{ fontSize: 12 }} />
                      {s.dateTime}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No upcoming surgeries.</p>
            )}
          </ul>
          <Link href="/admin/components/sur/surgerybooking" className="text-xs text-blue-600 mt-4 block hover:underline no-underline">View all surgery bookings &rarr;</Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
      >
        {React.cloneElement(icon as React.ReactElement<any>, { style: { fontSize: 20 } })}
      </div>
    </div>
  );
}

function QuickActionLink({ href, icon, label, color }: { href: string, icon: React.ReactNode, label: string, color: string }) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-600 hover:border-blue-300",
    green: "text-green-600 hover:border-green-300",
    orange: "text-orange-600 hover:border-orange-300",
    purple: "text-purple-600 hover:border-purple-300",
  };

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-3 border border-dashed border-gray-200 rounded-lg hover:bg-gray-50 transition-all group no-underline ${colorMap[color] || ""}`}
    >
      <span className="mb-1 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement<any>, { fontSize: "medium" })}
      </span>
      <span className="text-[11px] font-medium text-gray-600 text-center">
        {label}
      </span>
    </Link>
  );
}
