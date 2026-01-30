import React from 'react';
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';

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

  // Keys used for the "Other Info" section
  const auditKeys = ['Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'CreatedAt', 'UpdatedAt'];

  const primaryInfo = columns.filter(col => col.accessor && !auditKeys.includes(col.accessor));
  const auditInfo = columns.filter(col => col.accessor && auditKeys.includes(col.accessor));

  // Helper function to render a group of fields in a responsive grid
  const renderGrid = (fields: Column[]) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
      {fields.map((col, index) => {
        const rawValue = col.accessor ? data[col.accessor] : null;
        const isDescription = col.accessor?.toLowerCase().includes('description'); // could check for long text

        let displayValue: React.ReactNode = '-';

        if (rawValue !== null && rawValue !== undefined) {
          // Handle Dates
          if (rawValue instanceof Date || (!isNaN(Date.parse(rawValue)) && typeof rawValue === 'string' && rawValue.includes('-') && rawValue.length > 10)) {
            const dateObj = rawValue instanceof Date ? rawValue : new Date(rawValue);
            displayValue = dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric'
            });
          } else if (typeof rawValue === 'boolean') {
            displayValue = rawValue ? 'Yes' : 'No';
          } else {
            displayValue = String(rawValue);
          }
        }

        return (
          <Box
            key={index}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              pb: 1,
              gridColumn: isDescription ? { md: '1 / -1' } : 'auto'
            }}
          >
            <Typography variant="caption" display="block" color="text.secondary" gutterBottom sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {col.header}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
              {displayValue}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4, px: 2 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>

        {/* Section 1: Core Information */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.100' }} />
            <Typography variant="subtitle2" sx={{ px: 2, textTransform: 'uppercase', letterSpacing: 1.5, color: 'primary.main', fontWeight: 700 }}>
              {data.CityName || data.Name || 'Record'} Information
            </Typography>
            <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.100' }} />
          </Box>
          {renderGrid(primaryInfo)}
        </Box>

        {/* Section 2: Audit/Other Information */}
        {auditInfo.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.100' }} />
              <Typography variant="subtitle2" sx={{ px: 2, textTransform: 'uppercase', letterSpacing: 1.5, color: 'text.secondary', fontWeight: 700 }}>
                System Details
              </Typography>
              <Box sx={{ flex: 1, height: '1px', bgcolor: 'grey.100' }} />
            </Box>
            {renderGrid(auditInfo)}
          </Box>
        )}
      </Paper>
    </Box>
  );
}