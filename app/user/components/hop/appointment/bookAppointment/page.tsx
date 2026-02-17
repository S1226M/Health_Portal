"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Box, Typography, TextField, Button, Paper, Container,
    Checkbox, FormControlLabel, Snackbar, Alert, CircularProgress, MenuItem, Select, FormControl, InputLabel, Grid
} from "@mui/material";
import dayjs from "dayjs";
import { getDoctorSlots } from "@/app/user/modules/appointments/action/getDoctorSlots";
import SaveAppointment from "@/app/user/modules/appointments/action/bookAppointment";

// Component to wrap in Suspense because of useSearchParams
function BookAppointmentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const doctorId = searchParams.get("doctorId") || "";

    const [loading, setLoading] = useState(false);
    const [isSelf, setIsSelf] = useState(true);
    const [availableSlots, setAvailableSlots] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

    // Fetch slots when date changes
    useEffect(() => {
        if (doctorId && selectedDate) {
            setLoading(true);
            getDoctorSlots(parseInt(doctorId), selectedDate)
                .then(res => {
                    if (res.success) {
                        setAvailableSlots(res.slots || []);
                    } else {
                        setSnackbar({ open: true, message: res.message || "Failed to fetch slots", severity: "error" });
                    }
                })
                .catch(() => {
                    setSnackbar({ open: true, message: "Error fetching slots", severity: "error" });
                })
                .finally(() => setLoading(false));
        }
    }, [selectedDate, doctorId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedSlot) return setSnackbar({ open: true, message: "Please select a time slot", severity: "error" });

        setLoading(true);
        const formData = new FormData(e.currentTarget);

        // Explicitly append missing fields or override values if needed
        // Note: fields with 'name' attribute are automatically in FormData
        formData.append("DoctorID", doctorId);
        formData.append("SlotID", selectedSlot.slotId.toString());
        formData.append("AppointmentDate", selectedSlot.fullDateTime);
        formData.append("IsSelf", isSelf ? "true" : "false");

        try {
            const result = await SaveAppointment(formData);

            if (result.success) {
                setSnackbar({ open: true, message: result.message || "Appointment booked!", severity: "success" });
                setTimeout(() => router.push("/user"), 1500);
            } else {
                setSnackbar({ open: true, message: result.message || "Failed to book appointment", severity: "error" });
            }
        } catch (error) {
            setSnackbar({ open: true, message: "An unexpected error occurred.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    Book Appointment
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                            <TextField
                                name="AppointmentNo"
                                label="Appt No"
                                defaultValue={`APT-${Math.floor(1000 + Math.random() * 9000)}`}
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                label="Select Date"
                                type="date"
                                fullWidth
                                value={selectedDate}
                                onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setSelectedSlot(null); // Reset slot ensuring user re-selects
                                }}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: dayjs().format("YYYY-MM-DD") }} // Disable past dates
                                required
                            />
                        </Box>

                        <FormControl fullWidth required disabled={!selectedDate || availableSlots.length === 0}>
                            <InputLabel>Available Time Slots</InputLabel>
                            <Select
                                value={selectedSlot?.slotId || ""}
                                label="Available Time Slots"
                                onChange={(e) => setSelectedSlot(availableSlots.find(s => s.slotId === e.target.value))}
                            >
                                {availableSlots.length > 0 ? (
                                    availableSlots.map((slot) => (
                                        <MenuItem key={slot.slotId} value={slot.slotId} disabled={slot.isBooked}>
                                            {slot.displayTime} {slot.isBooked ? "(Booked)" : ""}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled value="">
                                        {selectedDate ? "No slots available" : "Select a date first"}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={<Checkbox checked={isSelf} onChange={(e) => setIsSelf(e.target.checked)} />}
                            label="Book for myself"
                        />

                        {!isSelf && (
                            <Box display="flex" flexDirection="column" gap={2} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary">Patient Details</Typography>
                                <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                                    <TextField name="PatientName" label="Patient Name" fullWidth required />
                                    <TextField name="PatientAge" label="Age" type="number" sx={{ width: { xs: '100%', sm: 120 } }} required />
                                </Box>
                                <TextField name="Address" label="Full Address" fullWidth required />
                                <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                                    <TextField name="City" label="City" fullWidth required />
                                    <TextField name="State" label="State" fullWidth required />
                                    <TextField name="Country" label="Country" fullWidth required />
                                </Box>
                            </Box>
                        )}

                        <TextField
                            name="Reason"
                            label="Reason for Appointment"
                            multiline
                            rows={3}
                            required
                            placeholder="Describe your symptoms or reason for visiting..."
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || !selectedSlot}
                            size="large"
                            sx={{ py: 1.5, mt: 2 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm Appointment"}
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default function BookAppointmentPage() {
    return (
        <Box sx={{ bgcolor: "#f4f7f9", minHeight: "100vh" }}>
            <Suspense fallback={<Box sx={{ p: 5, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}>
                <BookAppointmentContent />
            </Suspense>
        </Box>
    );
}