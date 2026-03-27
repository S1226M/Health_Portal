"use client";

import React, { useEffect, useState } from "react";
import { getAllDoctorAppointments } from "@/app/doctor/actions/getPendingAppointments";
import { updateAppointmentStatus } from "@/app/doctor/actions/updateAppointmentStatus";
import dayjs from "dayjs";

interface Appointment {
  AppointmentID: number;
  AppointmentNo: string;
  PatientName: string;
  PatientAge: number | null;
  AppointmentDate: string;
  Reason: string | null;
  Status: string;
  MessageFromDoctor: string | null;
  SlotName: string;
  StartTime: string;
  EndTime: string;
  Created: string;
  IsVideoConsultant: boolean;
}

export default function AllAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: "success" | "error" }>({
    open: false, message: "", type: "success",
  });

  const fetchData = async () => {
    setLoading(true);
    const result = await getAllDoctorAppointments();
    if (result.success) setAppointments(result.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    if (toast.open) {
      const t = setTimeout(() => setToast((p) => ({ ...p, open: false })), 4000);
      return () => clearTimeout(t);
    }
  }, [toast.open]);

  const tabs = ["All", "Pending", "Approved", "Rejected", "Completed"];
  const filtered = appointments.filter((a) => activeTab === "All" || a.Status === activeTab);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return { bg: "#fef9c3", color: "#a16207", border: "#fde68a" };
      case "Approved":
        return { bg: "#dcfce7", color: "#166534", border: "#a7f3d0" };
      case "Rejected":
        return { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" };
      case "Completed":
        return { bg: "#ecfeff", color: "#155e75", border: "#a5f3fc" };
      default:
        return { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" };
    }
  };

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    const result = await updateAppointmentStatus({ appointmentId: id, newStatus: "Approved" });
    setActionLoading(null);
    setToast({ open: true, message: result.message, type: result.success ? "success" : "error" });
    if (result.success) fetchData();
  };

  const formatTime = (time: string) => (time ? dayjs(time).format("h:mm A") : "");

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ width: 40, height: 40, border: "4px solid #a7f3d0", borderTop: "4px solid #059669", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e293b", marginBottom: 4 }}>All Appointments</h1>
      <p style={{ fontSize: 14, color: "#64748b", fontWeight: 500, marginBottom: 24 }}>
        Complete overview of all your appointments
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map((tab) => {
          const count = tab === "All" ? appointments.length : appointments.filter((a) => a.Status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                border: isActive ? "2px solid #059669" : "1px solid #e2e8f0",
                background: isActive ? "#ecfdf5" : "white",
                color: isActive ? "#059669" : "#64748b",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: "48px 32px", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontWeight: 600, fontSize: 15 }}>No {activeTab.toLowerCase()} appointments found.</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  {["#", "Patient", "Date & Time", "Reason", "Status", "Message", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#64748b", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt) => {
                  const s = getStatusStyle(appt.Status);
                  return (
                    <tr key={appt.AppointmentID} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#94a3b8", fontSize: 13 }}>
                        {appt.AppointmentNo}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 700, color: "#1e293b" }}>{appt.PatientName}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8" }}>{appt.PatientAge ? `${appt.PatientAge} yrs` : ""}</div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b", fontSize: 13 }}>
                          {dayjs(appt.AppointmentDate).format("MMM D, YYYY")}
                        </div>
                        <div style={{ fontSize: 12, color: "#94a3b8" }}>
                          {appt.StartTime && appt.EndTime ? `${formatTime(appt.StartTime)} - ${formatTime(appt.EndTime)}` : appt.SlotName}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#475569", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {appt.Reason || "—"}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                          {appt.Status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: "#64748b", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {appt.MessageFromDoctor || "—"}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {appt.Status === "Pending" && (
                          <button
                            onClick={() => handleApprove(appt.AppointmentID)}
                            disabled={actionLoading === appt.AppointmentID}
                            style={{
                              padding: "6px 14px",
                              background: "#059669",
                              color: "white",
                              borderRadius: 8,
                              border: "none",
                              fontWeight: 700,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            {actionLoading === appt.AppointmentID ? "..." : "Approve"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.open && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", fontWeight: 700, fontSize: 14, background: toast.type === "success" ? "#065f46" : "#991b1b", color: "white" }}>
            {toast.type === "success" ? "✓" : "✗"} {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
