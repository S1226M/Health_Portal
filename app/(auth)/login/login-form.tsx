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
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import { Email, Lock, Person, LocalHospital } from "@mui/icons-material";
import { login } from "./actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import sendOTP from "../actions/sendOTP";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sendingOTP, setSendingOTP] = useState(false);
  const [loginType, setLoginType] = useState("user");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUnauthorized = searchParams.get("unauthorized") === "true";

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
      {isUnauthorized && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, fontWeight: 600 }}>
          Unauthorized access! You do not have permission to view that page. Please login with the correct account.
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontWeight: 600 }}>
          {error}
        </Alert>
      )}

      {/* Hidden input to pass login type to the server action */}
      <input type="hidden" name="loginType" value={loginType} />

      <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
        <RadioGroup
          row
          name="loginTypeGroup"
          value={loginType}
          onChange={(e) => setLoginType(e.target.value)}
          sx={{ display: 'flex', gap: 2 }}
        >
          <FormControlLabel
            value="user"
            control={<Radio color="primary" />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person fontSize="small" />
                <span style={{ fontWeight: loginType === 'user' ? 700 : 500 }}>Patient / Admin</span>
              </Box>
            }
            sx={{
              margin: 0,
              flex: 1,
              border: '1px solid',
              borderColor: loginType === 'user' ? 'primary.main' : 'divider',
              borderRadius: 2,
              padding: '8px 16px',
              bgcolor: loginType === 'user' ? 'primary.50' : 'transparent',
              transition: 'all 0.2s',
            }}
          />
          <FormControlLabel
            value="doctor"
            control={<Radio color="primary" />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalHospital fontSize="small" />
                <span style={{ fontWeight: loginType === 'doctor' ? 700 : 500 }}>Doctor</span>
              </Box>
            }
            sx={{
              margin: 0,
              flex: 1,
              border: '1px solid',
              borderColor: loginType === 'doctor' ? '#059669' : 'divider',
              borderRadius: 2,
              padding: '8px 16px',
              bgcolor: loginType === 'doctor' ? '#ecfdf5' : 'transparent',
              transition: 'all 0.2s',
            }}
          />
        </RadioGroup>
      </FormControl>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            name="Email"
            fullWidth
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Button
          variant="text"
          onClick={async () => {
            if (!email) {
              setError("Please enter your email address first to reset your password.");
              return;
            }
            setError("");
            setSendingOTP(true);
            try {
              const res = await sendOTP({ email });
              if (res.success) {
                router.push(`/forgot-password?email=${encodeURIComponent(email)}`);
              } else {
                setError(res.message || "Failed to send OTP.");
              }
            } catch (err) {
              setError("An error occurred. Please try again.");
            } finally {
              setSendingOTP(false);
            }
          }}
          disabled={loading || sendingOTP}
          sx={{ textTransform: "none" }}
        >
          {sendingOTP ? "Sending OTP..." : "Forgot Password?"}
        </Button>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        className="gradient-primary"
        sx={{
          mt: 3,
          height: 48,
          boxShadow: "0 4px 14px 0 rgba(13, 148, 136, 0.39)",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem"
        }}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>
    </Box>
  );
}
