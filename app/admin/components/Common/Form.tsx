import React from 'react';
import Link from 'next/link';

interface FormProps {
    children: React.ReactNode;
    onCancelUrl: string;
}

export function FormContainer({ children, onCancelUrl }: FormProps) {
    return (
        <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {children}
                </div>

                <div className="pt-6 flex items-center justify-end gap-3 border-t border-gray-50 mt-8">
                    <Link
                        href={onCancelUrl}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="button"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-[#28328c] rounded-lg hover:bg-[#1e266d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28328c] transition-colors shadow-sm"
                    >
                        Save Details
                    </button>
                </div>
            </form>
        </div>
    );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    fullWidth?: boolean;
}

export function FormInput({ label, fullWidth = false, className = '', ...props }: InputProps) {
    return (
        <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
            </label>
            <input
                className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:border-[#28328c] focus:ring-1 focus:ring-[#28328c] focus:outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 ${className}`}
                {...props}
            />
        </div>
    );
}

export function FormSelect({ label, options, fullWidth = false }: { label: string, options: string[], fullWidth?: boolean }) {
    return (
        <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
            </label>
            <div className="relative">
                <select
                    className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:border-[#28328c] focus:ring-1 focus:ring-[#28328c] focus:outline-none transition-all cursor-pointer hover:border-gray-300 bg-white"
                >
                    <option value="">Select {label}</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
