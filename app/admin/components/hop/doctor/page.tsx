import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function DoctorListPage() {
    const data = [
        { id: 1, name: 'Dr. John Doe', spec: 'Cardiologist', hosp: 'General Hospital' },
        { id: 2, name: 'Dr. Jane Smith', spec: 'Dentist', hosp: 'Apollo Clinic' },
    ];

    const columns = [
        { header: 'Doctor Name', accessor: 'name' },
        { header: 'Specialization', accessor: 'spec' },
        { header: 'Hospital', accessor: 'hosp' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Doctors"
                description="Manage doctors and their assignments."
                actionLabel="Add Doctor"
                actionUrl="/admin/components/hop/doctor/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/hop/doctor" />
        </div>
    );
}
