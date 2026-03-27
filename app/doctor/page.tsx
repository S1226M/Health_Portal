import React from "react";
import Link from "next/link";
import { getDoctorDashboardStats } from "./actions/getDoctorDashboardStats";
import { getDoctorByUserId } from "./actions/getDoctorByUserId";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

export default async function DoctorDashboard() {
  const doctor = await getDoctorByUserId();
  if (!doctor) {
    redirect("/login");
  }

  const stats = await getDoctorDashboardStats();

  const statCards = [
    {
      label: "Total Appointments",
      value: stats.totalAppointments,
      color: "#3b82f6",
      bg: "#eff6ff",
      border: "#bfdbfe",
    },
    {
      label: "Today",
      value: stats.todayCount,
      color: "#8b5cf6",
      bg: "#f5f3ff",
      border: "#ddd6fe",
    },
    {
      label: "Pending",
      value: stats.pendingCount,
      color: "#f59e0b",
      bg: "#fffbeb",
      border: "#fde68a",
    },
    {
      label: "Approved",
      value: stats.approvedCount,
      color: "#10b981",
      bg: "#ecfdf5",
      border: "#a7f3d0",
    },
    {
      label: "Rejected",
      value: stats.rejectedCount,
      color: "#ef4444",
      bg: "#fef2f2",
      border: "#fecaca",
    },
    {
      label: "Completed",
      value: stats.completedCount,
      color: "#06b6d4",
      bg: "#ecfeff",
      border: "#a5f3fc",
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Welcome Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
          borderRadius: 16,
          padding: "32px 40px",
          marginBottom: 32,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: 100,
            width: 160,
            height: 160,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
          }}
        />
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, position: "relative", zIndex: 1 }}>
          Welcome back, Dr. {doctor.DoctorName}!
        </h1>
        <p style={{ fontSize: 15, opacity: 0.9, fontWeight: 500, position: "relative", zIndex: 1 }}>
          {doctor.SpecializationName} • {doctor.HospitalName}
        </p>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 4, position: "relative", zIndex: 1 }}>
          {dayjs().format("dddd, MMMM D, YYYY")}
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: card.bg,
              border: `1px solid ${card.border}`,
              borderRadius: 14,
              padding: "20px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 800, color: card.color, lineHeight: 1.1 }}>
              {card.value}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b", marginTop: 6 }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Pending + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Pending Notifications */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>
              🔔 New Pending Appointments
            </h3>
            {stats.pendingCount > 0 && (
              <span
                style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 20,
                  border: "1px solid #fde68a",
                }}
              >
                {stats.pendingCount} pending
              </span>
            )}
          </div>
          <div style={{ padding: "12px 24px 24px" }}>
            {stats.recentPending.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8" }}>
                <p style={{ fontSize: 14, fontWeight: 600 }}>No pending appointments</p>
                <p style={{ fontSize: 13, marginTop: 4 }}>All caught up! 🎉</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {stats.recentPending.map((appt) => (
                  <div
                    key={appt.AppointmentID}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 16px",
                      background: "#fffbeb",
                      border: "1px solid #fde68a",
                      borderRadius: 10,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>
                        {appt.PatientName}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                        {dayjs(appt.AppointmentDate).format("MMM D")} • {appt.SlotName}
                      </div>
                    </div>
                    <span
                      style={{
                        background: "#fef9c3",
                        color: "#a16207",
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 6,
                        border: "1px solid #fde68a",
                      }}
                    >
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <div
            style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>
              ⚡ Quick Actions
            </h3>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="/doctor/modules/appointments"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: 10,
                textDecoration: "none",
                color: "#92400e",
                fontWeight: 600,
                fontSize: 14,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 20 }}>📋</span>
              Review Pending Appointments ({stats.pendingCount})
            </Link>
            <Link
              href="/doctor/modules/all-appointments"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 10,
                textDecoration: "none",
                color: "#1e40af",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <span style={{ fontSize: 20 }}>📅</span>
              View All Appointments
            </Link>
            <Link
              href="/doctor/modules/patients"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                borderRadius: 10,
                textDecoration: "none",
                color: "#047857",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <span style={{ fontSize: 20 }}>👥</span>
              My Patients
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
