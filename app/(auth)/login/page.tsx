"use client";

import React, { Suspense } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import LoginForm from "./login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center p-4">
      {/* Decorative floating shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-float" />

      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 animate-float"
        style={{ animationDelay: "2s" }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
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
          {/* Logo */}
          <Box
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
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

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.5px",
              }}
            >
              Health
              <span style={{ color: "#0d9488" }}>Hub</span>
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: "#1e293b",
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 4,
            }}
          >
            Sign in to access your dashboard
          </Typography>

          {/* Login Form */}
          <Suspense
            fallback={
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 4,
                }}
              >
                <Typography color="text.secondary">
                  Loading login form...
                </Typography>
              </Box>
            }
          >
            <LoginForm />
          </Suspense>

          {/* Register Link */}
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              width: "100%",
              pt: 3,
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <Typography
              variant="body2"
              color="#64748b"
              sx={{
                fontWeight: 500,
              }}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary-600 hover:text-primary-700 transition-colors"
                style={{
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </main>
  );
}