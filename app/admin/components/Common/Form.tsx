"use client";

import React from 'react';
import Link from 'next/link';

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto mt-6">
            <form action={action} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
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
                                    <div key={name}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {label}
                                        </label>
                                        <select
                                            name={name}
                                            defaultValue={defaultValue}
                                            required={col.IS_NULLABLE === 'NO'}
                                            suppressHydrationWarning
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm bg-white"
                                        >
                                            <option value="">Select {label}...</option>
                                            {selectOptions[name].map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            }

                            return (
                                <FormInput
                                    key={name}
                                    label={label}
                                    name={name}
                                    defaultValue={defaultValue}
                                    required={col.IS_NULLABLE === 'NO'}
                                    suppressHydrationWarning
                                    isTextArea={name.toLowerCase().includes('description')}
                                    fullWidth={name.toLowerCase().includes('description')}
                                    placeholder={`Enter ${label.toLowerCase()}...`}
                                />
                            );
                        })
                    }
                    {children}
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 mt-6">
                    <Link href={onCancelUrl} className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md active:scale-95 transition duration-200"
                    >
                        {submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}

export function FormInput({ label, fullWidth = false, isTextArea = false, className = '', ...props }: any) {
    const baseClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-400 text-sm";

    return (
        <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            {isTextArea ? (
                <textarea {...props} rows={4} className={`${baseClass} ${className}`} />
            ) : (
                <input {...props} className={`${baseClass} ${className}`} />
            )}
        </div>
    );
}