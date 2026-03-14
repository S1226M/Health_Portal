"use client";

import React, { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Button,
    CircularProgress,
    Divider,
    Stack,
    Paper,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Rating,
    Alert,
    Snackbar
} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import HistoryIcon from '@mui/icons-material/History';
import CancelIcon from '@mui/icons-material/Cancel';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StarIcon from '@mui/icons-material/Star';
import Link from "next/link";
import dayjs from "dayjs";
import { getViewBookedAppointments } from "@/app/user/modules/hop/appointment/action/getViewBookedAppointments";
import { submitDoctorReview } from "@/app/user/modules/hop/appointment/action/submitDoctorReview";

interface Appointment {
    AppointmentID: number;
    AppointmentNo: string;
    AppointmentDate: string | Date;
    Status: string;
    Reason: string | null;
    PatientName: string;
    DoctorID: number;
    appointmentStatus: string; // "Upcoming" | "Completed" | "Cancelled"
    hop_doctor: {
        DoctorName: string;
        hop_specialization: {
            SpecializationName: string;
        } | null;
        hop_hospital: {
            HospitalName: string;
            Address: string | null;
        } | null;
    };
    hop_timeslot_master: {
        StartTime: string | Date;
        EndTime: string | Date;
        SlotName: string;
    } | null;
}

export default function ViewBookedAppointment() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    // Review modal state
    const [reviewOpen, setReviewOpen] = useState(false);
    const [reviewAppt, setReviewAppt] = useState<Appointment | null>(null);
    const [reviewRating, setReviewRating] = useState<number | null>(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const result = await getViewBookedAppointments();
                if (result.success && result.data) {
                    setAppointments(result.data as any);
                } else {
                    setError(result.message || "Failed to load appointments");
                }
            } catch (err) {
                console.error("Error loading appointments:", err);
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'scheduled':
            case 'confirmed':
                return 'primary';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const getAppointmentStatusColor = (appointmentStatus: string) => {
        switch (appointmentStatus) {
            case 'Upcoming':
                return { bg: '#e8f5e9', color: '#2e7d32', border: '#4caf50' };
            case 'Completed':
                return { bg: '#fff3e0', color: '#e65100', border: '#ff9800' };
            case 'Cancelled':
                return { bg: '#ffebee', color: '#c62828', border: '#f44336' };
            default:
                return { bg: '#f5f5f5', color: '#616161', border: '#9e9e9e' };
        }
    };

    const getAppointmentStatusIcon = (appointmentStatus: string) => {
        switch (appointmentStatus) {
            case 'Upcoming':
                return <UpcomingIcon sx={{ fontSize: 16 }} />;
            case 'Completed':
                return <HistoryIcon sx={{ fontSize: 16 }} />;
            case 'Cancelled':
                return <CancelIcon sx={{ fontSize: 16 }} />;
            default:
                return null;
        }
    };

    const formatTime = (time?: string | Date) => {
        if (!time) return "";
        if (typeof time === "string" && (time.includes("AM") || time.includes("PM"))) return time;
        return dayjs(time).format("h:mm A");
    };

    const filteredAppointments = appointments.filter((appt) => {
        if (activeTab === 0) return true;
        if (activeTab === 1) return appt.appointmentStatus === "Upcoming";
        if (activeTab === 2) return appt.appointmentStatus === "Completed";
        return true;
    });

    const upcomingCount = appointments.filter(a => a.appointmentStatus === "Upcoming").length;
    const completedCount = appointments.filter(a => a.appointmentStatus === "Completed").length;

    const handleOpenReview = (appt: Appointment) => {
        setReviewAppt(appt);
        setReviewRating(0);
        setReviewText("");
        setReviewOpen(true);
    };

    const handleSubmitReview = async () => {
        if (!reviewAppt || !reviewRating || reviewRating === 0) {
            setSnackbar({ open: true, message: "Please select a rating.", severity: 'error' });
            return;
        }

        setReviewSubmitting(true);
        try {
            const result = await submitDoctorReview({
                doctorId: reviewAppt.DoctorID,
                rating: reviewRating,
                reviewText: reviewText.trim(),
                appointmentId: reviewAppt.AppointmentID,
            });

            if (result.success) {
                setSnackbar({ open: true, message: result.message, severity: 'success' });
                setReviewOpen(false);
                // Refresh appointments
                const refreshResult = await getViewBookedAppointments();
                if (refreshResult.success && refreshResult.data) {
                    setAppointments(refreshResult.data as any);
                }
            } else {
                setSnackbar({ open: true, message: result.message, severity: 'error' });
            }
        } catch (err) {
            setSnackbar({ open: true, message: "Failed to submit review.", severity: 'error' });
        } finally {
            setReviewSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2, bgcolor: '#fff4f4' }}>
                    <Typography color="error" variant="h6">{error}</Typography>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">
                    My Appointments
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    href="/user/modules/hop/appointment/doctorListPage"
                    startIcon={<EventAvailableIcon />}
                    sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                    Book New
                </Button>
            </Box>

            {/* Tabs for filtering */}
            <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    variant="fullWidth"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                        }
                    }}
                >
                    <Tab label={`All (${appointments.length})`} />
                    <Tab
                        label={`Upcoming (${upcomingCount})`}
                        icon={<UpcomingIcon sx={{ fontSize: 18 }} />}
                        iconPosition="start"
                    />
                    <Tab
                        label={`Completed (${completedCount})`}
                        icon={<HistoryIcon sx={{ fontSize: 18 }} />}
                        iconPosition="start"
                    />
                </Tabs>
            </Paper>

            {filteredAppointments.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: '#f9fafb' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {activeTab === 1
                            ? "You have no upcoming appointments."
                            : activeTab === 2
                                ? "You have no completed appointments."
                                : "You have no booked appointments."}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Find a doctor and book your first appointment today.
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        href="/user/modules/hop/appointment/doctorListPage"
                        sx={{ textTransform: 'none' }}
                    >
                        Find Doctors
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {filteredAppointments.map((appt) => {
                        const statusColors = getAppointmentStatusColor(appt.appointmentStatus);
                        const isCompletedOrPast = appt.appointmentStatus === "Completed";
                        return (
                            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={appt.AppointmentID}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 3,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        borderLeft: `4px solid ${statusColors.border}`,
                                        opacity: isCompletedOrPast ? 0.85 : 1,
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ bgcolor: '#f0f4f8', px: 1, py: 0.5, borderRadius: 1 }}>
                                                #{appt.AppointmentNo}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                                <Chip
                                                    icon={getAppointmentStatusIcon(appt.appointmentStatus) as any}
                                                    label={appt.appointmentStatus}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        bgcolor: statusColors.bg,
                                                        color: statusColors.color,
                                                        border: `1px solid ${statusColors.border}`,
                                                        '& .MuiChip-icon': {
                                                            color: statusColors.color,
                                                        }
                                                    }}
                                                />
                                                <Chip
                                                    label={appt.Status}
                                                    color={getStatusColor(appt.Status) as any}
                                                    size="small"
                                                    sx={{ fontWeight: 'bold' }}
                                                />
                                            </Box>
                                        </Box>

                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {appt.hop_doctor.DoctorName}
                                        </Typography>

                                        <Typography variant="body2" color="primary.main" fontWeight="medium" gutterBottom>
                                            {appt.hop_doctor.hop_specialization?.SpecializationName || "Specialist"}
                                        </Typography>

                                        <Divider sx={{ my: 2 }} />

                                        <Stack spacing={1.5}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <CalendarTodayIcon fontSize="small" color="action" />
                                                <Typography variant="body2">
                                                    {dayjs(appt.AppointmentDate).format("ddd, MMM D, YYYY")}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <AccessTimeIcon fontSize="small" color="action" />
                                                <Typography variant="body2">
                                                    {appt.hop_timeslot_master ?
                                                        `${formatTime(appt.hop_timeslot_master.StartTime)} - ${formatTime(appt.hop_timeslot_master.EndTime)}`
                                                        : "Time not specified"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                                <LocationOnIcon fontSize="small" color="action" sx={{ mt: 0.3 }} />
                                                <Box>
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {appt.hop_doctor.hop_hospital?.HospitalName || "Hospital"}
                                                    </Typography>
                                                    {appt.hop_doctor.hop_hospital?.Address && (
                                                        <Typography variant="caption" color="text.secondary" display="block">
                                                            {appt.hop_doctor.hop_hospital.Address}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Stack>

                                        {appt.Reason && (
                                            <Box sx={{ mt: 2, bgcolor: '#f9fafb', p: 1.5, borderRadius: 2 }}>
                                                <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                                    Reason:
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                    &quot;{appt.Reason}&quot;
                                                </Typography>
                                            </Box>
                                        )}

                                        <Box sx={{ mt: 2, bgcolor: '#e3f2fd', p: 1.5, borderRadius: 2 }}>
                                            <Typography variant="caption" color="primary" fontWeight="bold">
                                                Patient:
                                            </Typography>
                                            <Typography variant="body2" color="text.primary">
                                                {appt.PatientName}
                                            </Typography>
                                        </Box>

                                        {/* Review Button for Completed Appointments */}
                                        {isCompletedOrPast && (
                                            <Box sx={{ mt: 2.5 }}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    startIcon={<RateReviewIcon />}
                                                    onClick={() => handleOpenReview(appt)}
                                                    sx={{
                                                        textTransform: 'none',
                                                        fontWeight: 'bold',
                                                        borderRadius: 2,
                                                        borderColor: '#f59e0b',
                                                        color: '#d97706',
                                                        '&:hover': {
                                                            borderColor: '#d97706',
                                                            bgcolor: '#fffbeb',
                                                        }
                                                    }}
                                                >
                                                    Rate & Review Doctor
                                                </Button>
                                            </Box>
                                        )}

                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            {/* Review Dialog */}
            <Dialog
                open={reviewOpen}
                onClose={() => setReviewOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, overflow: 'hidden' }
                }}
            >
                <DialogTitle sx={{ bgcolor: '#fffbeb', borderBottom: '1px solid #fde68a', pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <StarIcon sx={{ color: '#f59e0b' }} />
                        <Typography variant="h6" fontWeight="bold">
                            Review Dr. {reviewAppt?.hop_doctor?.DoctorName}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Share your experience to help other patients
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ pt: 4, mt: 1 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            How was your experience?
                        </Typography>
                        <Rating
                            value={reviewRating}
                            onChange={(_, newValue) => setReviewRating(newValue)}
                            size="large"
                            sx={{
                                '& .MuiRating-iconFilled': { color: '#f59e0b' },
                                '& .MuiRating-iconHover': { color: '#d97706' },
                                fontSize: '3rem'
                            }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {reviewRating === 1 && "Poor"}
                            {reviewRating === 2 && "Below Average"}
                            {reviewRating === 3 && "Average"}
                            {reviewRating === 4 && "Good"}
                            {reviewRating === 5 && "Excellent!"}
                        </Typography>
                    </Box>

                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        label="Write your review (optional)"
                        placeholder="Tell us about your experience with the doctor, treatment quality, waiting time, etc."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            }
                        }}
                    />

                    {reviewAppt && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: '#f0f4f8', borderRadius: 2 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                Appointment Details
                            </Typography>
                            <Typography variant="body2">
                                #{reviewAppt.AppointmentNo} • {dayjs(reviewAppt.AppointmentDate).format("MMM D, YYYY")} • {reviewAppt.hop_doctor?.hop_specialization?.SpecializationName}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid #e5e7eb' }}>
                    <Button onClick={() => setReviewOpen(false)} sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmitReview}
                        disabled={reviewSubmitting || !reviewRating}
                        startIcon={reviewSubmitting ? <CircularProgress size={16} /> : <StarIcon />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: 2,
                            bgcolor: '#f59e0b',
                            '&:hover': { bgcolor: '#d97706' }
                        }}
                    >
                        {reviewSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}