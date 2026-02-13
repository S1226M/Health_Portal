"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    Container,
    InputAdornment,
    Divider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import bookAppointment from "@/app/user/modules/appointments/action/bookAppointment";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InfoIcon from "@mui/icons-material/Info";
import { prisma } from "@/lib/prisma";

function BookAppointmentContent() {
    const searchParams = useSearchParams();
    const initialDoctorId = searchParams.get("doctorId") || "";

    const [formData, setFormData] = useState({
        appointmentNo: "APT-" + Math.floor(1000 + Math.random() * 9000),
        patientId: "1",
        doctorId: initialDoctorId,
        appointmentDateTime: null as Dayjs | null,
        reason: "",
    });

    useEffect(() => {
        if (initialDoctorId) {
            setFormData((prev) => ({ ...prev, doctorId: initialDoctorId }));
        }
    }, [initialDoctorId]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            appointmentDateTime: formData.appointmentDateTime
                ? formData.appointmentDateTime.toISOString()
                : null,
        };

        try {
            const result = await bookAppointment(payload);
            if (result && result.success) {
                alert(result.message);
            } else {
                alert(result.message || "Failed to book appointment.");
            }
        } catch (error) {
            console.error("Booking Error:", error);
            alert("An error occurred while booking the appointment.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 6 },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "#ffffff",
                    boxShadow: "0px 15px 35px rgba(0,0,0,0.05)",
                }}
            >
                <Box sx={{ mb: 4, textAlign: "center" }}>
                    <Typography
                        variant="h3"
                        sx={{ fontWeight: 800, color: "#1565c0", mb: 1 }}
                    >
                        Book Appointment
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Provide your details below to secure your consultation slot.
                    </Typography>
                </Box>

                <Divider sx={{ mb: 5 }} />

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Appointment Number"
                                value={formData.appointmentNo}
                                disabled
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AssignmentIcon color="primary" fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                required
                                label="Patient ID"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleChange}
                                placeholder="e.g. P-1002"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon color="primary" fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Date & Time"
                                    value={formData.appointmentDateTime}
                                    onChange={(val) =>
                                        setFormData((p) => ({ ...p, appointmentDateTime: val }))
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true,
                                            InputProps: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarMonthIcon
                                                            color="primary"
                                                            fontSize="small"
                                                        />
                                                    </InputAdornment>
                                                ),
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                required
                                multiline
                                rows={3}
                                label="Reason for Appointment"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Briefly describe your symptoms..."
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{ alignSelf: "flex-start", mt: 1.5 }}
                                        >
                                            <InfoIcon color="primary" fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    py: 2,
                                    bgcolor: "#1976d2",
                                    fontSize: "1.1rem",
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#1565c0" },
                                }}
                            >
                                Confirm Appointment
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default function BookAppointmentPage() {
    return (
        <Box sx={{ bgcolor: "#f4f7f9", minHeight: "100vh" }}>
            <Suspense fallback={null}>
                <BookAppointmentContent />
            </Suspense>
        </Box>
    );
}
