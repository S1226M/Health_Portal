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
}

export function FormContainer({
    children,
    onCancelUrl,
    action,
    submitLabel = "Save Details",
    columns,
    skipFields = [],
    selectOptions = {}
}: FormProps) {
    const allSkipFields = [...DEFAULT_SKIP_FIELDS, ...skipFields];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto mt-6">
            <form action={action} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {columns ? (
                        columns
                            .filter(col => !allSkipFields.includes(col.COLUMN_NAME))
                            .map((col) => {
                                const name = col.COLUMN_NAME;
                                const label = name.replace(/([A-Z])/g, ' $1').trim();

                                // Check if this is a Foreign Key
                                const isForeignKey = col.REFERENCED_TABLE_NAME !== null;
                                // Check if we actually have data to show in the dropdown
                                const hasOptions = selectOptions[name] && selectOptions[name].length > 0;

                                // Condition: If it's a Foreign Key and we have data, show Select.
                                // If it's a Foreign Key but NO data is passed, we fall back to FormInput 
                                // so the form remains functional.
                                if (isForeignKey && hasOptions) {
                                    return (
                                        <div key={name}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {label}
                                            </label>
                                            <select
                                                name={name}
                                                required={col.IS_NULLABLE === 'NO'}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm bg-white"
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

                                // Default fallback to your FormInput function
                                return (
                                    <FormInput
                                        key={name}
                                        label={label}
                                        name={name}
                                        required={col.IS_NULLABLE === 'NO'}
                                        isTextArea={name.toLowerCase().includes('description')}
                                        fullWidth={name.toLowerCase().includes('description')}
                                        placeholder={`Enter ${label.toLowerCase()}...`}
                                    />
                                );
                            })
                    ) : (
                        children
                    )}
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 mt-6">
                    <Link
                        href={onCancelUrl}
                        className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-200"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition transform active:scale-95 duration-200"
                    >
                        {submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    fullWidth?: boolean;
    isTextArea?: boolean;
}

export function FormInput({ label, fullWidth = false, isTextArea = false, className = '', ...props }: InputProps) {
    const baseClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-gray-400 text-sm";

    return (
        <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            {isTextArea ? (
                <textarea
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    rows={4}
                    className={`${baseClass} ${className}`}
                />
            ) : (
                <input
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                    className={`${baseClass} ${className}`}
                />
            )}
        </div>
    );
}