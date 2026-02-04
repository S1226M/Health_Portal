"use client";

import React from 'react';
import { Box, TextField, Button, Grid, InputAdornment } from '@mui/material';
import { Person, Email, Lock, Badge } from '@mui/icons-material';
import { Phone } from 'lucide-react';

export default function RegisterForm() {
  return (
    <Box component="form" noValidate sx={{ width: '100%' }}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="medium"
            label="User Name"
            placeholder="Enter your User Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: 48,
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="medium"
            label="Full Name"
            placeholder="Enter your Full Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: 48,
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="medium"
            label="Password"
            placeholder="Create a password"
            type="password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: 48,
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="medium"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: 48,
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="medium"
            label="Email Address"
            placeholder="Enter your Email Address"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: 48,
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="medium"
            label="Email Mobile"
            placeholder="Enter your Mobile Number"
            type="email"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: 48,
                borderRadius: 2,
              },
            }}
          />
        </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        sx={{
          height: 48,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          bgcolor: 'primary.main',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
          '&:hover': {
            bgcolor: 'primary.dark',
            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
          },
        }}
      >
        Create Account
      </Button>
    </Box>
  );
}
