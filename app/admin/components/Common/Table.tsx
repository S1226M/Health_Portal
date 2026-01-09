import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import deleteSpecialization from '@/app/admin/modules/hop/specialization/action/deleteSpecialization';
import DeleteBtn from './ui/deleteBtn';
import ViewBtn from './ui/viewBtn';
import EditBtn from './ui/editBtn';

export interface Column {
  header: string;
  accessor?: string;
  isAction?: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  basePath: string;
  idKey: string;
}

export function Table({ columns, data, basePath, idKey }: TableProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.isAction ? 'text-right' : ''
                    }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data
            .filter(row => row.IsDeleted !== true)
            .map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-gray-50/80 transition-colors duration-150"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`py-4 px-6 text-sm ${col.isAction ? 'text-right' : 'text-gray-700'
                      }`}
                  >
                    {col.isAction ? (
                      <div className="flex items-center justify-end gap-3">
                        <ViewBtn id={row[idKey]} viewUrl={basePath} />
                        <EditBtn id={row[idKey]} viewUrl={`${basePath}/edit`} />
                        <DeleteBtn id={row[idKey]} deleteFn={deleteSpecialization} />
                      </div>
                    ) : (
                      row[col.accessor as string]
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-400 text-sm"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
}