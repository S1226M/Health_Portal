import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function OPDListPage() {
    const data = [
        { id: 1, patient: 'Smit M', doctor: 'Dr. John Doe', diagnosis: 'Fever', fee: '500' },
    ];

    const columns = [
        { header: 'Patient', accessor: 'patient' },
        { header: 'Doctor', accessor: 'doctor' },
        { header: 'Diagnosis', accessor: 'diagnosis' },
        { header: 'Fee', accessor: 'fee' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="OPD Records"
                description="Outpatient Department records."
                actionLabel="New OPD Entry"
                actionUrl="/admin/components/hop/opd/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/hop/opd" />
        </div>
    );
}
