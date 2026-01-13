import React from 'react';

export interface Column {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
      {fields.map((col, index) => {
        const rawValue = col.accessor ? data[col.accessor] : null;
        const isDescription = col.accessor?.toLowerCase().includes('description');

        let displayValue: React.ReactNode = '-';

        if (rawValue !== null && rawValue !== undefined) {
          // Handle Dates
          if (rawValue instanceof Date || (!isNaN(Date.parse(rawValue)) && typeof rawValue === 'string' && rawValue.includes('-'))) {
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
          <div 
            key={index} 
            className={`flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 border-b border-gray-50 pb-3 ${
              isDescription ? 'md:col-span-2' : ''
            }`}
          >
            <dt className="text-sm font-medium text-gray-400 whitespace-nowrap min-w-[160px]">
              {col.header} :
            </dt>
            <dd className="text-sm font-semibold text-gray-900 break-words">
              {displayValue}
            </dd>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        {/* Section 1: Core Information */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gray-100"></div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {data.CityName || data.Name || 'Record'} Information
            </h2>
            <div className="h-px flex-1 bg-gray-100"></div>
          </div>
          {renderGrid(primaryInfo)}
        </div>

        {/* Section 2: Audit/Other Information */}
        {auditInfo.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gray-100"></div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                System Details
              </h2>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            {renderGrid(auditInfo)}
          </div>
        )}
      </div>
    </div>
  );
}