"use client";

import React from "react";
import { Box, TextField, Button, Grid, InputAdornment } from "@mui/material";
import { Person, Email, Lock, Badge } from "@mui/icons-material";
import { Phone } from "lucide-react";
import { registerUser } from "./actions";

export default function RegisterForm() {
  return (
    <Box component="form" action={registerUser} sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="UserName"
            fullWidth
            label="User Name"
            placeholder="Enter your User Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="FullName"
            fullWidth
            label="Full Name"
            placeholder="Enter your Full Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="Password"
            type="password"
            fullWidth
            label="Password"
            placeholder="Create a password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="ConfirmPassword"
            type="password"
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="Email"
            fullWidth
            label="Email Address"
            placeholder="Enter your Email Address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="MobileNumber"
            fullWidth
            label="Mobile Number"
            placeholder="Enter your Mobile Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" size="large">
            Create Account
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
