"use client";

import React, { useEffect, useState } from "react";
import { getPatientHistory } from "@/app/doctor/actions/getPatientHistory";
import dayjs from "dayjs";

interface PatientAppointment {
  AppointmentID: number;
  AppointmentNo: string;
  AppointmentDate: string;
  Status: string;
  Reason: string | null;
  MessageFromDoctor: string | null;
  SlotName: string;
  StartTime: string;
  EndTime: string;
  Created: string;
  IsVideoConsultant: boolean;
  Address: string | null;
  City: string | null;
  PatientAge: number | null;
}

interface PatientGroup {
  patientName: string;
  totalVisits: number;
  lastVisit: string;
  appointments: PatientAppointment[];
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPatientHistory();
      if (result.success) setPatients(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending": return { bg: "#fef9c3", color: "#a16207", border: "#fde68a" };
      case "Approved": return { bg: "#dcfce7", color: "#166534", border: "#a7f3d0" };
      case "Rejected": return { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" };
      case "Completed": return { bg: "#ecfeff", color: "#155e75", border: "#a5f3fc" };
      default: return { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" };
    }
  };

  const formatTime = (time: string) => (time ? dayjs(time).format("h:mm A") : "");

  const filteredPatients = patients.filter((p) =>
    p.patientName.toLowerCase().includes(search.toLowerCase())
  );

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e293b", marginBottom: 4 }}>My Patients</h1>
          <p style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>
            Patient follow-up list and appointment history
          </p>
        </div>
        <span style={{ background: "#ecfdf5", color: "#059669", fontSize: 14, fontWeight: 700, padding: "6px 14px", borderRadius: 20, border: "1px solid #a7f3d0" }}>
          {patients.length} patients
        </span>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="🔍  Search patient by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            fontSize: 14,
            outline: "none",
            background: "white",
          }}
        />
      </div>

      {/* Patient List */}
      {filteredPatients.length === 0 ? (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", padding: "48px 32px", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontWeight: 600, fontSize: 15 }}>No patients found.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredPatients.map((patient) => {
            const isExpanded = expanded === patient.patientName;
            const latestAppt = patient.appointments[0];
            return (
              <div
                key={patient.patientName}
                style={{
                  background: "white",
                  borderRadius: 14,
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  transition: "all 0.2s",
                }}
              >
                {/* Patient Header */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : patient.patientName)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    background: isExpanded ? "#f8fafc" : "white",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, #059669, #34d399)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: 17,
                        flexShrink: 0,
                      }}
                    >
                      {patient.patientName.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>
                        {patient.patientName}
                      </div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                        {patient.totalVisits} visit{patient.totalVisits > 1 ? "s" : ""} •
                        Last: {patient.lastVisit ? dayjs(patient.lastVisit).format("MMM D, YYYY") : "N/A"}
                        {latestAppt?.PatientAge ? ` • ${latestAppt.PatientAge} yrs` : ""}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {(() => {
                      const s = getStatusStyle(latestAppt?.Status || "");
                      return (
                        <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                          {latestAppt?.Status}
                        </span>
                      );
                    })()}
                    <span style={{ fontSize: 18, color: "#94a3b8", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
                      ▾
                    </span>
                  </div>
                </button>

                {/* Expanded History */}
                {isExpanded && (
                  <div style={{ borderTop: "1px solid #e2e8f0", padding: "16px 20px", background: "#fafbfc" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                      Appointment History
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {patient.appointments.map((appt) => {
                        const s = getStatusStyle(appt.Status);
                        return (
                          <div
                            key={appt.AppointmentID}
                            style={{
                              background: "white",
                              borderRadius: 10,
                              border: "1px solid #e2e8f0",
                              padding: "12px 16px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 16,
                              flexWrap: "wrap",
                            }}
                          >
                            <div style={{ flex: 1, minWidth: 200 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>
                                  #{appt.AppointmentNo}
                                </span>
                                <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, padding: "2px 8px", borderRadius: 5, fontSize: 11, fontWeight: 700 }}>
                                  {appt.Status}
                                </span>
                                {appt.IsVideoConsultant && (
                                  <span style={{ background: "#dbeafe", color: "#1e40af", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
                                    📹 Video
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                                📅 {dayjs(appt.AppointmentDate).format("ddd, MMM D, YYYY")}
                                {appt.StartTime && ` • ${formatTime(appt.StartTime)} - ${formatTime(appt.EndTime)}`}
                              </div>
                              {appt.Reason && (
                                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, fontStyle: "italic" }}>
                                  Reason: &quot;{appt.Reason}&quot;
                                </div>
                              )}
                              {appt.MessageFromDoctor && (
                                <div style={{ fontSize: 12, color: "#059669", marginTop: 4, fontWeight: 600 }}>
                                  💬 Dr. Message: &quot;{appt.MessageFromDoctor}&quot;
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
