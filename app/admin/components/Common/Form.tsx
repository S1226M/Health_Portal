import React from 'react';
import Link from 'next/link';
interface FormProps {
    children: React.ReactNode;
    onCancelUrl: string;
    action?: ((formData: FormData) => Promise<void>);
    submitLabel?: string;
}
export function FormContainer({ children, onCancelUrl, action, submitLabel = "Save Details" }: FormProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto mt-6">
            <form action={action} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {children}
                </div>
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 mt-6">
                    <Link
                        href={onCancelUrl}
                        className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-200"
                    >
                        Cancel
                    </Link>
                    <button onClick={onCancelUrl? undefined : (e) => e.preventDefault()}
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