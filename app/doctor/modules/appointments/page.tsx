"use client";

import React, { useEffect, useState } from "react";
import { getPendingAppointments } from "@/app/doctor/actions/getPendingAppointments";
import { updateAppointmentStatus } from "@/app/doctor/actions/updateAppointmentStatus";
import dayjs from "dayjs";

interface PendingAppointment {
  AppointmentID: number;
  AppointmentNo: string;
  PatientName: string;
  PatientAge: number | null;
  AppointmentDate: string;
  Reason: string | null;
  Address: string | null;
  City: string | null;
  State: string | null;
  Country: string | null;
  Status: string;
  SlotID: number | null;
  SlotName: string;
  StartTime: string;
  EndTime: string;
  Created: string;
  IsVideoConsultant: boolean;
}

export default function PendingAppointmentsPage() {
  const [appointments, setAppointments] = useState<PendingAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [rejectModal, setRejectModal] = useState<PendingAppointment | null>(null);
  const [rejectMessage, setRejectMessage] = useState("");
  const [toast, setToast] = useState<{ open: boolean; message: string; type: "success" | "error" }>({
    open: false,
    message: "",
    type: "success",
  });

  const fetchData = async () => {
    setLoading(true);
    const result = await getPendingAppointments();
    if (result.success) {
      setAppointments(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => setToast((t) => ({ ...t, open: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.open]);

  const handleApprove = async (appointmentId: number) => {
    setActionLoading(appointmentId);
    const result = await updateAppointmentStatus({
      appointmentId,
      newStatus: "Approved",
    });
    setActionLoading(null);
    setToast({ open: true, message: result.message, type: result.success ? "success" : "error" });
    if (result.success) {
      fetchData();
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    setActionLoading(rejectModal.AppointmentID);
    const result = await updateAppointmentStatus({
      appointmentId: rejectModal.AppointmentID,
      newStatus: "Rejected",
      messageFromDoctor: rejectMessage.trim() || undefined,
    });
    setActionLoading(null);
    setRejectModal(null);
    setRejectMessage("");
    setToast({ open: true, message: result.message, type: result.success ? "success" : "error" });
    if (result.success) {
      fetchData();
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    return dayjs(time).format("h:mm A");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "4px solid #a7f3d0",
            borderTop: "4px solid #059669",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e293b", marginBottom: 4 }}>
            Pending Appointments
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>
            Review and manage appointment requests from patients
          </p>
        </div>
        <span
          style={{
            background: "#fef3c7",
            color: "#92400e",
            fontSize: 14,
            fontWeight: 700,
            padding: "6px 14px",
            borderRadius: 20,
            border: "1px solid #fde68a",
          }}
        >
          {appointments.length} pending
        </span>
      </div>

      {/* Appointments Grid */}
      {appointments.length === 0 ? (
        <div
          style={{
            background: "white",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            padding: "60px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>
            No Pending Appointments
          </h3>
          <p style={{ color: "#64748b", fontSize: 14 }}>All appointment requests have been reviewed.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 20 }}>
          {appointments.map((appt) => (
            <div
              key={appt.AppointmentID}
              style={{
                background: "white",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                transition: "all 0.2s",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  background: "#fffbeb",
                  padding: "14px 20px",
                  borderBottom: "1px solid #fde68a",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 13, color: "#92400e" }}>
                  #{appt.AppointmentNo}
                </span>
                <span
                  style={{
                    background: "#fef9c3",
                    color: "#a16207",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 6,
                    border: "1px solid #fde68a",
                  }}
                >
                  ⏳ Pending Review
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: 20 }}>
                {/* Patient Info */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #059669, #34d399)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    {appt.PatientName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#1e293b" }}>
                      {appt.PatientName}
                    </div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>
                      {appt.PatientAge ? `${appt.PatientAge} years` : "Age not specified"}
                      {appt.IsVideoConsultant && (
                        <span
                          style={{
                            marginLeft: 8,
                            background: "#dbeafe",
                            color: "#1e40af",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: 4,
                          }}
                        >
                          📹 Video
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569" }}>
                    <span>📅</span>
                    <span style={{ fontWeight: 600 }}>{dayjs(appt.AppointmentDate).format("ddd, MMM D, YYYY")}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569" }}>
                    <span>🕐</span>
                    <span style={{ fontWeight: 600 }}>
                      {appt.StartTime && appt.EndTime
                        ? `${formatTime(appt.StartTime)} - ${formatTime(appt.EndTime)}`
                        : appt.SlotName}
                    </span>
                  </div>
                  {appt.Address && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569" }}>
                      <span>📍</span>
                      <span style={{ fontWeight: 500 }}>
                        {[appt.Address, appt.City, appt.State].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Reason */}
                {appt.Reason && (
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 10,
                      padding: "10px 14px",
                      marginBottom: 16,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                      Reason for visit
                    </div>
                    <div style={{ fontSize: 13, color: "#475569", fontStyle: "italic", fontWeight: 500 }}>
                      &quot;{appt.Reason}&quot;
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => handleApprove(appt.AppointmentID)}
                    disabled={actionLoading === appt.AppointmentID}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      background: actionLoading === appt.AppointmentID ? "#86efac" : "#059669",
                      color: "white",
                      borderRadius: 10,
                      border: "none",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: actionLoading === appt.AppointmentID ? "wait" : "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {actionLoading === appt.AppointmentID ? "Processing..." : "✓ Approve"}
                  </button>
                  <button
                    onClick={() => setRejectModal(appt)}
                    disabled={actionLoading === appt.AppointmentID}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      background: "#fef2f2",
                      color: "#dc2626",
                      borderRadius: 10,
                      border: "1px solid #fecaca",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setRejectModal(null)}
          />
          <div
            style={{
              background: "white",
              borderRadius: 20,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              width: "100%",
              maxWidth: 440,
              position: "relative",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "#fef2f2",
                padding: "16px 24px",
                borderBottom: "1px solid #fecaca",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#991b1b" }}>
                Reject Appointment
              </h3>
              <button
                onClick={() => setRejectModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#991b1b",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: 24 }}>
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 10,
                  padding: 14,
                  border: "1px solid #e2e8f0",
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>
                  {rejectModal.PatientName}
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                  #{rejectModal.AppointmentNo} • {dayjs(rejectModal.AppointmentDate).format("MMM D, YYYY")}
                </div>
              </div>
              <label
                style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 8 }}
              >
                Rejection Reason (optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g., Schedule conflict, requires different specialist..."
                value={rejectMessage}
                onChange={(e) => setRejectMessage(e.target.value)}
                style={{
                  width: "100%",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 14,
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                padding: "12px 24px 20px",
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setRejectModal(null)}
                style={{
                  padding: "10px 20px",
                  background: "none",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading === rejectModal.AppointmentID}
                style={{
                  padding: "10px 20px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {actionLoading === rejectModal.AppointmentID ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 20px",
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              fontWeight: 700,
              fontSize: 14,
              background: toast.type === "success" ? "#065f46" : "#991b1b",
              color: "white",
            }}
          >
            {toast.type === "success" ? "✓" : "✗"} {toast.message}
            <button
              onClick={() => setToast((prev) => ({ ...prev, open: false }))}
              style={{ background: "none", border: "none", color: "white", cursor: "pointer", marginLeft: 8, fontSize: 16 }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
