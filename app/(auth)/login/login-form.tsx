"use client";

import React from 'react';
import { Box, TextField, Button, Grid, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';

export default function LoginForm() {
    return (
        <Box component="form" noValidate sx={{ width: '100%' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        placeholder="Enter your email address"
                        type="email"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label={<span style={{ fontSize: '0.9rem', color: '#64748b' }}>Remember me</span>}
                />
                <Button
                    variant="text"
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                    }}
                >
                    Forgot Password?
                </Button>
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    mt: 3,
                    mb: 2,
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
                Sign In
            </Button>
        </Box>
    );
}
