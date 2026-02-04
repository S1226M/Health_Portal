"use client";

import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import RegisterForm from './register-form';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                bgcolor: '#f0f2f5', // Matches admin background
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Logo or Brand Element */}
                    <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 30,
                                height: 30,
                                bgcolor: 'primary.main',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.3rem',
                            }}
                        >
                            H
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                            Health<span style={{ color: '#0ea5e9' }}>Hub</span>
                        </Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b', mb: 2}}>
                        Create an Account   
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Join us to manage your health portal journey
                    </Typography> */}

                    <RegisterForm />

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link href="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
