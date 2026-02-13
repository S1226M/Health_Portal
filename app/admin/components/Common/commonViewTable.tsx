import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import { EventNote, Info, AccessTime } from "@mui/icons-material";

export interface Column<T = any> {
  header: string;
  accessor?: string;
  isAction?: boolean;
}

interface DetailViewTableProps {
  columns: Column[];
  data: any;
}

export function ViewTable({ columns, data }: DetailViewTableProps) {
  if (!data) return null;

  // Keys used for the "System Info" section
  const auditKeys = [
    "Created",
    "Modified",
    "CreatedByUserID",
    "ModifiedByUserID",
    "CreatedAt",
    "UpdatedAt",
    "IsDeleted",
  ];
  // Keys usually used for headers/titles
  const titleKeys = [
    "Name",
    "Title",
    "Subject",
    "PatientName",
    "DoctorName",
    "CityName",
  ];

  const primaryInfo = columns.filter(
    (col) => col.accessor && !auditKeys.includes(col.accessor),
  );
  const auditInfo = columns.filter(
    (col) => col.accessor && auditKeys.includes(col.accessor),
  );

  // Find a suitable title for the card
  const titleField = columns.find(
    (col) => col.accessor && titleKeys.includes(col.accessor),
  );
  const cardTitle =
    titleField && data[titleField.accessor!]
      ? data[titleField.accessor!]
      : "Record Details";

  // Helper to formatting values
  const formatValue = (rawValue: any) => {
    if (rawValue === null || rawValue === undefined)
      return <span className="text-gray-400 italic">N/A</span>;

    if (
      rawValue instanceof Date ||
      (!isNaN(Date.parse(rawValue)) &&
        typeof rawValue === "string" &&
        rawValue.includes("-") &&
        rawValue.length > 10)
    ) {
      const dateObj = rawValue instanceof Date ? rawValue : new Date(rawValue);
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (typeof rawValue === "boolean") {
      return (
        <Chip
          label={rawValue ? "Yes" : "No"}
          size="small"
          color={rawValue ? "success" : "default"}
          variant="outlined"
        />
      );
    }

    return rawValue;
  };

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", mt: 2, px: { xs: 0, md: 2 } }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            p: 4,
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          }}
        >
          <Typography
            variant="overline"
            sx={{ opacity: 0.8, letterSpacing: 2 }}
          >
            Detailed View
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {cardTitle}
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Primary Information */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
              <Info color="primary" fontSize="small" />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Core Information
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {primaryInfo.map((col, index) => {
                const rawValue = col.accessor ? data[col.accessor] : null;
                const isLongText = String(rawValue).length > 60;

                return (
                  <Grid size={{ xs: 12, md: isLongText ? 12 : 6 }} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "background.default",
                        border: "1px solid",
                        borderColor: "transparent",
                        "&:hover": {
                          borderColor: "divider",
                          bgcolor: "action.hover",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight="bold"
                        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                      >
                        {col.header}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          mt: 1,
                          wordBreak: "break-word",
                          color: "text.primary",
                        }}
                      >
                        {formatValue(rawValue)}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          <Divider sx={{ my: 4, borderStyle: "dashed" }} />

          {/* System Information */}
          {auditInfo.length > 0 && (
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}
              >
                <AccessTime color="action" fontSize="small" />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  System Audit
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {auditInfo.map((col, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <Box sx={{ p: 1.5 }}>
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                      >
                        {col.header}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {formatValue(col.accessor ? data[col.accessor] : "")}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
