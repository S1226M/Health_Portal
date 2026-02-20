"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import dayjs from "dayjs";
import { getDoctorSlots } from "@/app/user/modules/appointments/action/getDoctorSlots";
import SaveAppointment from "@/app/user/modules/appointments/action/bookAppointment";

function BookAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId") || "";

  const [loading, setLoading] = useState(false);
  const [isSelf, setIsSelf] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Fetch slots
  useEffect(() => {
    if (doctorId && selectedDate) {
      setLoading(true);
      getDoctorSlots(Number(doctorId), selectedDate)
        .then((res) => {
          if (res.success) {
            setAvailableSlots(res.slots || []);
          } else {
            setSnackbar({
              open: true,
              message: res.message || "Failed to fetch slots",
              severity: "error",
            });
          }
        })
        .catch(() => {
          setSnackbar({
            open: true,
            message: "Error fetching slots",
            severity: "error",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [selectedDate, doctorId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSlot) {
      setSnackbar({
        open: true,
        message: "Please select a time slot",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    formData.append("DoctorID", doctorId);
    formData.append("SlotID", selectedSlot.slotId.toString());
    formData.append("AppointmentDate", selectedSlot.fullDateTime);
    formData.append("IsSelf", isSelf ? "true" : "false");

    try {
      const result = await SaveAppointment(formData);

      if (result.success) {
        setSnackbar({
          open: true,
          message: result.message || "Appointment booked!",
          severity: "success",
        });
        setTimeout(() => router.push("/user"), 1500);
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Failed to book appointment",
          severity: "error",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Unexpected error occurred",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Book Appointment
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" gap={2}>
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
                  setSelectedSlot(null);
                }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
                required
              />
            </Box>

            {/* ✅ FIXED SLOT DROPDOWN */}
            <FormControl fullWidth required disabled={!selectedDate}>
              <InputLabel>Available Time Slots</InputLabel>
              <Select
                label="Available Time Slots"
                value={selectedSlot?.slotId ?? ""}
                onChange={(e) =>
                  setSelectedSlot(
                    availableSlots.find(
                      (s) => s.slotId === Number(e.target.value)
                    )
                  )
                }
              >
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <MenuItem
                      key={slot.slotId}
                      value={slot.slotId}
                      disabled={slot.isBooked}
                    >
                      {slot.displayTime} {slot.isBooked ? "(Booked)" : ""}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No slots available</MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isSelf}
                  onChange={(e) => setIsSelf(e.target.checked)}
                />
              }
              label="Book for myself"
            />

            {!isSelf && (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField name="PatientName" label="Patient Name" required />
                <TextField name="PatientAge" label="Age" type="number" required />
                <TextField name="Address" label="Address" required />
                <TextField name="City" label="City" required />
                <TextField name="State" label="State" required />
                <TextField name="Country" label="Country" required />
              </Box>
            )}

            <TextField
              name="Reason"
              label="Reason"
              multiline
              rows={3}
              required
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading || !selectedSlot}
            >
              {loading ? <CircularProgress size={22} /> : "Confirm Appointment"}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BookAppointmentContent />
    </Suspense>
  );
}