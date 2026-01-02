import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function PatientListPage() {
    const data = [
        { id: 1, name: 'Smit M', mobile: '9876543210', gender: 'Male', city: 'Pune' },
        { id: 2, name: 'Alice Brown', mobile: '1234567890', gender: 'Female', city: 'Mumbai' },
    ];

    const columns = [
        { header: 'Patient Name', accessor: 'name' },
        { header: 'Mobile', accessor: 'mobile' },
        { header: 'Gender', accessor: 'gender' },
        { header: 'City', accessor: 'city' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Patients"
                description="Manage patient records."
                actionLabel="Add Patient"
                actionUrl="/admin/components/hop/patient/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/hop/patient" />
        </div>
    );
}
