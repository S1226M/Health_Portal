import React from 'react';
import Link from 'next/link';
import { Plus, ArrowLeft, Search, Filter } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description?: string;
    actionLabel?: string;
    actionUrl?: string;
    backUrl?: string;
}

export function PageHeader({ title, description, actionLabel, actionUrl, backUrl }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
                {backUrl && (
                    <Link
                        href={backUrl}
                        className="p-2 -ml-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
                        title="Go Back"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
                    {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {actionLabel && actionUrl && (
                    <Link
                        href={actionUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#28328c] text-white text-sm font-medium rounded-lg hover:bg-[#1e266d] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28328c]"
                    >
                        <Plus size={18} />
                        {actionLabel}
                    </Link>
                )}
            </div>
        </div>
    );
}

export function SearchBar() {
    return (
        <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28328c] focus:border-transparent bg-white shadow-sm"
            />
        </div>
    );
}
