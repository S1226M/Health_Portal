"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Avatar,
  Box,
  Divider,
  Rating,
  Stack,
  CircularProgress,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { getAllDoctor } from "@/app/user/modules/appointments/action/getAllDoctor";

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctor();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  console.log("Fetched Doctors:", doctors);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* --- Filter Card --- */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1976d2", mb: 2 }}
          >
            Find Your Specialist
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                options={["USA", "India"]}
                renderInput={(params) => (
                  <TextField {...params} label="Country" size="small" />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                options={["Gujarat", "New York"]}
                renderInput={(params) => (
                  <TextField {...params} label="State" size="small" />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                options={["Ahmedabad", "Brooklyn"]}
                renderInput={(params) => (
                  <TextField {...params} label="City" size="small" />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                options={["Cardiology", "Dermatology", "Pediatrics"]}
                renderInput={(params) => (
                  <TextField {...params} label="Specialization" size="small" />
                )}
              />
            </Grid>
          </Grid>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
          >
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* --- Doctor List --- */}
      <Stack spacing={3}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : doctors.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "#f5f5f5",
              borderRadius: 3,
            }}
          >
            <Typography color="text.secondary">No doctors found.</Typography>
          </Box>
        ) : (
          doctors.map((doc) => (
            <Card
              key={doc.DoctorID}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                borderRadius: 3,
                overflow: "hidden",
                width: "100%",
                "&:hover": { boxShadow: 6 },
              }}
            >
              {/* Profile Image Section */}
              <Box
                sx={{
                  bgcolor: "#42a5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  minWidth: { sm: 220 },
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: "2.5rem",
                    bgcolor: "#1565c0",
                    boxShadow: 3,
                  }}
                >
                  {doc.DoctorName ? doc.DoctorName.charAt(0) : "D"}
                </Avatar>
              </Box>

              {/* Information Section - Mapping Real Data */}
              <CardContent sx={{ flex: 1, p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: "#333" }}
                    >
                      {doc.DoctorName}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.5,
                        color: "primary.main",
                      }}
                    >
                      <SchoolIcon fontSize="small" />
                      <Typography variant="body2" fontWeight="600">
                        {/* Correct mapping for hop_specialization */}
                        {doc.hop_specialization?.Name || "General Physician"}
                      </Typography>
                    </Box>
                  </Box>
                  {/* Static Rating as it's likely not in your schema yet */}
                  <Rating value={4.5} precision={0.5} readOnly size="small" />
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <LocalHospitalIcon
                    sx={{ color: "text.secondary", fontSize: 20 }}
                  />
                  <Typography variant="body2" fontWeight="500">
                    {/* Correct mapping for hop_hospital */}
                    {doc.hop_hospital?.HospitalName || "Unknown Hospital"}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, fontStyle: "italic" }}
                >
                  {/* Mapping the Description field from your prisma model */}"
                  {doc.Description || "No description available."}"
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    component={Link}
                    href={`/user/components/hop/appointment/bookAppointment?doctorId=${doc.DoctorID}`}
                    variant="contained"
                    disableElevation
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Book Appointment
                  </Button>
                  <Button
                    component={Link}
                    href={`/user/components/findDoctors/${doc.DoctorID}`}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    View Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
}
