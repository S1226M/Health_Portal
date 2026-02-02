import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import deleteSpecialization from '@/app/admin/modules/hop/specialization/action/deleteSpecialization';
import DeleteBtn from './ui/deleteBtn';
import ViewBtn from './ui/viewBtn';
import EditBtn from './ui/editBtn';
import { deleteCountry } from '../../modules/loc/country/action/deleteCountry';

import { deleteState } from '../../modules/loc/state/action/deleteState';
import { deleteCity } from '../../modules/loc/city/action/deleteCity';
import { deletePaymentMode } from '../../modules/pay/paymentmode/action/deletePaymentMode';
import { deleteTreatmentType } from '../../modules/hop/treatmenttype/action/deleteTreatmentType';
import { deleteDiagnosisType } from '../../modules/hop/diagnosistype/action/deleteDiagnosisType';
import deleteLabTest from '../../modules/lab/labtest/action/deleteLabTest';
import deleteLabTestOrder from '../../modules/lab/labtestorder/action/deleteLabTestOrder';
import deleteLabTestType from '../../modules/lab/labtesttype/action/deleteLabTestType';
import deleteMedicine from '../../modules/phm/medicine/action/deleteMedicine';
import deleteMedicineCategory from '../../modules/phm/medicinecategory/action/deleteMedicineCategory';
import deleteOrderOfMedicine from '../../modules/phm/orderofmedicine/action/deleteOrderOfMedicine';
import deleteSurgery from '../../modules/sur/surgery/action/deleteSurgery';
import deleteSurgeryBooking from '../../modules/sur/surgerybooking/action/deleteSurgeryBooking';
import deleteSurgeryItem from '../../modules/sur/surgeryitem/action/deleteSurgeryItem';

export interface Column<T = any> {
  header: string;
  accessor?: string;
  isAction?: boolean;
  key?: string;
}

const actionsMap: Record<string, (id: any) => Promise<void>> = {
  "deleteCountry": deleteCountry,
  "deleteSpecialization": deleteSpecialization,
  "deleteState": deleteState,
  "deleteCity": deleteCity,
  "deletePaymentMode": deletePaymentMode,
  "deleteTreatmenttype": deleteTreatmentType,
  "deleteDiagnosisType": deleteDiagnosisType,
  "deleteLabTest": deleteLabTest,
  "deleteLabTestOrder": deleteLabTestOrder,
  "deleteLabTestType": deleteLabTestType,
  "deleteMedicine": deleteMedicine,
  "deleteMedicineCategory": deleteMedicineCategory,
  "deleteOrderOfMedicine": deleteOrderOfMedicine,
  "deleteSurgery": deleteSurgery,
  "deleteSurgeryBooking": deleteSurgeryBooking,
  "deleteSurgeryItem": deleteSurgeryItem,
  // Add other functions here as you create them
};

interface TableProps {
  columns: Column[];
  data: any[];
  basePath: string;
  idKey: string;
  moduleName: string;
}

export function Table({ columns, data, basePath, idKey, moduleName }: TableProps) {
  const generatedFnName = `delete${moduleName.charAt(0).toUpperCase()}${moduleName.slice(1)}`;
  const activeDeleteFn = actionsMap[generatedFnName];

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
                          <DeleteBtn id={row[idKey]} deleteFn={activeDeleteFn} />
                        </div>
                      ) : (
                        (() => {
                          const value = row[(col.accessor || col.key) as string];
                          if (value instanceof Date) return value.toLocaleString();
                          if (value === null || value === undefined) return '';
                          if (typeof value === 'object') return JSON.stringify(value);
                          return value;
                        })()
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