"use client";

import React from 'react';
import Link from 'next/link';
import {
    Box,
    Paper,
    TextField,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';

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

const DEFAULT_SKIP_FIELDS = ['Created', 'Modified', 'IsDeleted', 'CreatedByUserID', 'ModifiedByUserID'];

interface FormProps {
    children?: React.ReactNode;
    onCancelUrl: string;
    action?: ((formData: FormData) => Promise<void> | void);
    submitLabel?: string;
    columns?: DBColumn[];
    skipFields?: string[];
    selectOptions?: Record<string, SelectOption[]>;
    initialData?: any;
}

export function FormContainer({
    children,
    onCancelUrl,
    action,
    submitLabel = "Save Details",
    columns,
    skipFields = [],
    selectOptions = {},
    initialData = {}
}: FormProps) {
    const allSkipFields = [...DEFAULT_SKIP_FIELDS, ...skipFields];

    return (
        <Paper elevation={3} sx={{ p: 4, mt: 6, borderRadius: 2, maxWidth: '900px', mx: 'auto' }}>
            <form action={action}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    {columns && columns
                        .filter(col => !allSkipFields.includes(col.COLUMN_NAME))
                        .map((col) => {
                            const name = col.COLUMN_NAME;
                            const label = name.replace(/([A-Z])/g, ' $1').trim();
                            const isForeignKey = col.REFERENCED_TABLE_NAME !== null;
                            const hasOptions = selectOptions[name] && selectOptions[name].length > 0;
                            const defaultValue = initialData?.[name] ?? "";

                            if (isForeignKey && hasOptions) {
                                return (
                                    <Box key={name}>
                                        <FormControl fullWidth size="medium" variant="outlined">
                                            <InputLabel id={`${name}-label`}>{label}</InputLabel>
                                            <Select
                                                labelId={`${name}-label`}
                                                name={name}
                                                defaultValue={defaultValue}
                                                required={col.IS_NULLABLE === 'NO'}
                                                label={label}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {selectOptions[name].map((opt) => (
                                                    <MenuItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                );
                            }

                            return (
                                <FormInput
                                    key={name}
                                    label={label}
                                    name={name}
                                    defaultValue={defaultValue}
                                    required={col.IS_NULLABLE === 'NO'}
                                    isTextArea={name.toLowerCase().includes('description')}
                                    fullWidth={name.toLowerCase().includes('description')}
                                    placeholder={`Enter ${label.toLowerCase()}...`}
                                />
                            );
                        })
                    }
                    {children}

                    <Box sx={{ gridColumn: '1 / -1' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3, pt: 3, borderTop: '1px solid #f0f0f0' }}>
                            <Button
                                component={Link}
                                href={onCancelUrl}
                                variant="outlined"
                                color="inherit"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                {submitLabel}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
}

export function FormInput({ label, fullWidth = false, isTextArea = false, className = '', ...props }: any) {
    return (
        <Box sx={{ gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
            <TextField
                {...props}
                label={label}
                variant="outlined"
                fullWidth
                multiline={isTextArea}
                rows={isTextArea ? 4 : 1}
                InputLabelProps={{ shrink: true }}
            />
        </Box>
    );
}