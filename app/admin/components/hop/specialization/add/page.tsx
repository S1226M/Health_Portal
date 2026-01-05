// @/app/admin/components/hop/specialization/add/page.tsx
import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { SaveSpecialization } from '@/app/admin/modules/hop/specialization/action/SaveSpecialization';
import Link from 'next/link';

export default function AddSpecializationPage() {
    return (
        <div className="p-6">
            <PageHeader 
                title="Add Specialization" 
                backUrl="/admin/components/hop/specialization" 
            />
            
            <form action={SaveSpecialization} className="mt-6 space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Cardiology"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea 
                        id="description"
                        name="description"
                        placeholder="Optional description of the department"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t">
                    <Link 
                        href="/admin/components/hop/specialization"
                        className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition"
                    >
                        Cancel
                    </Link>
                    <button 
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition transform active:scale-95"
                    >
                        Save Specialization
                    </button>
                </div>
            </form>
        </div>
    );
}