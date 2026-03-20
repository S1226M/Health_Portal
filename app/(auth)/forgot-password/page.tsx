"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Container, Box, Typography, Paper, TextField, Button, InputAdornment, Alert } from "@mui/material";
import { Email, VpnKey, ArrowBack, Lock, Badge } from "@mui/icons-material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import resetPassword from "../actions/resetPassword";

function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !otp || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword({ email, otp, newPassword });
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      className="card-premium animate-scaleIn"
      sx={{
        p: { xs: 4, md: 5 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          className="gradient-primary shadow-lg"
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          H
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>
          Health<span style={{ color: "#0d9488" }}>Hub</span>
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#1e293b" }}>
        Reset Password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
        Enter your email and the OTP we sent you, then choose a new password.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ width: "100%", mb: 3, borderRadius: 2 }}>
          Password reset successfully! Redirecting to login...
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            name="Email"
            fullWidth
            label="Email Address"
            placeholder="Enter your registered email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="OTP"
            fullWidth
            label="One Time Password (OTP)"
            placeholder="Enter the OTP from your email"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={success || loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="NewPassword"
            fullWidth
            label="New Password"
            placeholder="Enter new password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={success || loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="ConfirmPassword"
            fullWidth
            label="Confirm Password"
            placeholder="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={success || loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          className="gradient-primary"
          disabled={success || loading}
          sx={{ 
            mt: 4, 
            height: 48, 
            boxShadow: "0 4px 14px 0 rgba(13, 148, 136, 0.39)",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem"
          }}
        >
          {loading ? "Resetting..." : "Verify OTP \\& Reset"}
        </Button>
      </Box>

      <Box sx={{ mt: 4, textAlign: "center", width: "100%", pt: 3, borderTop: "1px solid #e2e8f0" }}>
        <Link
          href="/login"
          className="text-primary-600 hover:text-primary-700 transition-colors flex items-center justify-center gap-1"
          style={{
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "0.875rem"
          }}
        >
          <ArrowBack fontSize="small" /> Back to Sign In
        </Link>
      </Box>
    </Paper>
  );
}

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center p-4">
      {/* Decorative floating shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 animate-float" style={{ animationDelay: "2s" }} />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Suspense fallback={<div>Loading form...</div>}>
          <ForgotPasswordForm />
        </Suspense>
      </Container>
    </main>
  );
}
