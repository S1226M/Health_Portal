"use client";

import React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { login } from "./actions";

export default function LoginForm() {
  return (
    <Box component="form" action={login} sx={{ width: "100%" }}>
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
        sx={{ mt: 3, height: 48 }}
      >
        Sign In
      </Button>
    </Box>
  );
}
