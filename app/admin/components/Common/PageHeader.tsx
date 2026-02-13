"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Add, ArrowBack, Search as SearchIcon } from "@mui/icons-material";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionUrl?: string;
  backUrl?: string;
}

export function PageHeader({
  title,
  description,
  actionLabel,
  actionUrl,
  backUrl,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { md: "center" },
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {backUrl && (
          <IconButton
            component={Link}
            href={backUrl}
            color="inherit"
            aria-label="Go Back"
            edge="start"
          >
            <ArrowBack />
          </IconButton>
        )}
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="text.primary"
          >
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {actionLabel && actionUrl && (
          <Button
            component={Link}
            href={actionUrl}
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            {actionLabel}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export function SearchBar() {
  return (
    <Box sx={{ maxWidth: 400, width: "100%" }}>
      <TextField
        fullWidth
        placeholder="Search..."
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          sx: { bgcolor: "background.paper" },
        }}
      />
    </Box>
  );
}
