"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { login } from "./actions";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setLoading(true);
    try {
      const result = await login(formData);
      // If login returns (didn't redirect), it means there was an error
      if (result && !result.success) {
        setError(result.message);
      }
    } catch (err: any) {
      // Next.js redirect throws a special error — that's expected
      // Only show error for real failures
      if (err?.message && !err.message.includes("NEXT_REDIRECT")) {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" action={handleSubmit} sx={{ width: "100%" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontWeight: 600 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            name="Email"
            fullWidth
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            name="Password"
            fullWidth
            label="Password"
            placeholder="Enter your password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <FormControlLabel control={<Checkbox />} label="Remember me" />

        <Button variant="text" sx={{ textTransform: "none" }}>
          Forgot Password?
        </Button>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ mt: 3, height: 48 }}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </Box>
  );
}
