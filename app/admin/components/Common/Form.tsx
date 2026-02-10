"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

/* ================= TYPES ================= */

export interface DBColumn {
  COLUMN_NAME: string;
  IS_NULLABLE: string;
  DATA_TYPE: string;
  REFERENCED_TABLE_NAME: string | null;
  REFERENCED_COLUMN_NAME: string | null;
}

interface SelectOption {
  label: string;
  value: string | number;
}

const DEFAULT_SKIP_FIELDS = [
  "Created",
  "Modified",
  "IsDeleted",
  "CreatedByUserID",
  "ModifiedByUserID",
  "UserID",
];

/* ================= DATE PICKER ================= */

function FormDateTimePicker({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: any;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        defaultValue={defaultValue ? dayjs(defaultValue) : null}
        slotProps={{
          textField: {
            name,
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
}

/* ================= MAIN FORM ================= */

export function FormContainer({
  children,
  onCancelUrl,
  action,
  submitLabel = "Save Details",
  columns,
  skipFields = [],
  selectOptions = {},
  initialData = {},
}: any) {
  const allSkipFields = [...DEFAULT_SKIP_FIELDS, ...skipFields];

  return (
    <Paper sx={{ p: 4, mt: 6, maxWidth: 900, mx: "auto" }}>
      <form action={action}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {columns
            ?.filter(
              (col: DBColumn) =>
                !allSkipFields.includes(col.COLUMN_NAME)
            )
            .map((col: DBColumn) => {
              const name = col.COLUMN_NAME;

              /* ===== FRIENDLY LABEL ===== */
              const label = name.endsWith("ID")
                ? name.replace("ID", " Name").replace(/([A-Z])/g, " $1").trim()
                : name.replace(/([A-Z])/g, " $1").trim();

              const dataType = String(col.DATA_TYPE || "").toLowerCase();

              const defaultValue = initialData?.[name] ?? "";

              const isDate =
                dataType === "datetime" ||
                dataType === "timestamp" ||
                dataType === "date";

              const isBoolean =
                dataType === "boolean" ||
                dataType === "tinyint" ||
                name.toLowerCase().startsWith("is");

              const hasOptions =
                selectOptions[name] &&
                selectOptions[name].length > 0;

              /* ===== BOOLEAN ===== */
              if (isBoolean) {
                return (
                  <FormControl fullWidth key={name}>
                    <InputLabel>{label}</InputLabel>
                    <Select
                      name={name}
                      label={label}
                      defaultValue={defaultValue}
                    >
                      <MenuItem value="" disabled>
                        Select {label}
                      </MenuItem>
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </FormControl>
                );
              }

              /* ===== FOREIGN KEY / SELECT ===== */
              if (hasOptions) {
                return (
                  <FormControl fullWidth key={name}>
                    <InputLabel>{label}</InputLabel>
                    <Select
                      name={name}
                      label={label}
                      defaultValue={defaultValue}
                    >
                      <MenuItem value="" disabled>
                        Select {label}
                      </MenuItem>

                      {selectOptions[name].map((opt: SelectOption) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              /* ===== DATE ===== */
              if (isDate) {
                return (
                  <FormDateTimePicker
                    key={name}
                    name={name}
                    label={label}
                    defaultValue={defaultValue}
                  />
                );
              }

              /* ===== TEXT ===== */
              return (
                <TextField
                  key={name}
                  name={name}
                  label={label}
                  defaultValue={defaultValue}
                  fullWidth
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              );
            })}

          {children}

          {/* ===== ACTION BUTTONS ===== */}
          <Box sx={{ gridColumn: "1 / -1", textAlign: "right", mt: 3 }}>
            <Button
              component={Link}
              href={onCancelUrl}
              variant="outlined"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {submitLabel}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
