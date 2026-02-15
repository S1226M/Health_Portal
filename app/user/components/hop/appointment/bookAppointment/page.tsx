"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box, Typography, TextField, Button, Paper, Container,
    InputAdornment, Checkbox, FormControlLabel,
    Snackbar, Alert, CircularProgress
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import SaveAppointment from "@/app/user/modules/appointments/action/bookAppointment";

import AssignmentIcon from "@mui/icons-material/Assignment";

function BookAppointmentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialDoctorId = searchParams.get("doctorId") || "";
    const [loading, setLoading] = useState(false);
    const [isSelf, setIsSelf] = useState(false);

    // Add snackbar state
    const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success"
    });

    const [formData, setFormData] = useState({
        appointmentNo: "APT-" + Math.floor(1000 + Math.random() * 9000),
        doctorId: initialDoctorId,
        appointmentDateTime: null as Dayjs | null,
        reason: "",
    });

    const [patientData, setPatientData] = useState({
        patientName: "",
        patientAge: "",
        address: "",
        city: "",
        state: "",
        country: ""
    });

    useEffect(() => {
        if (initialDoctorId) {
            setFormData((prev) => ({ ...prev, doctorId: initialDoctorId }));
        }
    }, [initialDoctorId]);

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.appointmentDateTime) {
            setSnackbar({ open: true, message: "Please select a date and time", severity: "error" });
            return;
        }

        if (!isSelf && !patientData.patientName) {
            setSnackbar({ open: true, message: "Please enter patient name", severity: "error" });
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append("AppointmentNo", formData.appointmentNo);
            data.append("DoctorID", formData.doctorId);
            data.append("Reason", formData.reason);
            data.append("AppointmentDate", formData.appointmentDateTime.toISOString());
            data.append("IsSelf", isSelf ? "true" : "false");

            if (!isSelf) {
                data.append("PatientName", patientData.patientName);
                if (patientData.patientAge) data.append("PatientAge", patientData.patientAge);
                data.append("Address", patientData.address);
                data.append("City", patientData.city);
                data.append("State", patientData.state);
                data.append("Country", patientData.country);
            }

            const result = await SaveAppointment(data);

            if (result.success) {
                setSnackbar({ open: true, message: result.message, severity: "success" });
                setTimeout(() => {
                    router.push("/user");
                }, 1500);
            } else {
                setSnackbar({ open: true, message: result.message || "Failed to book appointment", severity: "error" });
            }
        } catch (error) {
            console.error("Booking Error:", error);
            setSnackbar({ open: true, message: "An unexpected error occurred.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: "1px solid", borderColor: "divider", boxShadow: "0px 15px 35px rgba(0,0,0,0.05)" }}>
                <Box sx={{ mb: 4, textAlign: "center" }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "#1565c0", mb: 1 }}>
                        Book Appointment
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                            <Box flex={1}>
                                <TextField
                                    fullWidth
                                    label="Appointment Number"
                                    value={formData.appointmentNo}
                                    InputProps={{ readOnly: true, startAdornment: <InputAdornment position="start"><AssignmentIcon color="primary" /></InputAdornment> }}
                                />
                            </Box>
                            <Box flex={1}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Date & Time"
                                        value={formData.appointmentDateTime}
                                        onChange={(val) => setFormData((p) => ({ ...p, appointmentDateTime: val }))}
                                        slotProps={{ textField: { fullWidth: true, required: true } }}
                                        disablePast
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>

                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isSelf}
                                        onChange={(e) => setIsSelf(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Book for myself"
                            />
                        </Box>

                        {!isSelf && (
                            <>
                                <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                                    <Box flex={1}>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Patient Name"
                                            value={patientData.patientName}
                                            onChange={(e) => setPatientData({ ...patientData, patientName: e.target.value })}
                                        />
                                    </Box>
                                    <Box flex={1}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Patient Age"
                                            value={patientData.patientAge}
                                            onChange={(e) => setPatientData({ ...patientData, patientAge: e.target.value })}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        value={patientData.address}
                                        onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                                    />
                                </Box>

                                <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                                    <Box flex={1}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            value={patientData.city}
                                            onChange={(e) => setPatientData({ ...patientData, city: e.target.value })}
                                        />
                                    </Box>
                                    <Box flex={1}>
                                        <TextField
                                            fullWidth
                                            label="State"
                                            value={patientData.state}
                                            onChange={(e) => setPatientData({ ...patientData, state: e.target.value })}
                                        />
                                    </Box>
                                    <Box flex={1}>
                                        <TextField
                                            fullWidth
                                            label="Country"
                                            value={patientData.country}
                                            onChange={(e) => setPatientData({ ...patientData, country: e.target.value })}
                                        />
                                    </Box>
                                </Box>
                            </>
                        )}

                        <Box>
                            <TextField
                                fullWidth
                                required
                                multiline
                                rows={3}
                                label="Reason for Appointment"
                                value={formData.reason}
                                onChange={(e) => setFormData(p => ({ ...p, reason: e.target.value }))}
                                placeholder="Briefly describe your symptoms..."
                            />
                        </Box>

                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading}
                                sx={{ py: 1.5, fontWeight: "bold", textTransform: "none" }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm Appointment"}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default function BookAppointmentPage() {
    return (
        <Box sx={{ bgcolor: "#f4f7f9", minHeight: "100vh" }}>
            <Suspense fallback={<Box sx={{ p: 5 }}>Loading form...</Box>}>
                <BookAppointmentContent />
            </Suspense>
        </Box>
    );
}