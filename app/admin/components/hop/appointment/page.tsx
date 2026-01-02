import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function AppointmentListPage() {
    const data = [
        { id: 1, patient: 'Smit M', doctor: 'Dr. John Doe', date: '2025-12-30', status: 'Confirmed' },
        { id: 2, patient: 'Alice Brown', doctor: 'Dr. Jane Smith', date: '2025-12-31', status: 'Pending' },
    ];

    const columns = [
        { header: 'Patient', accessor: 'patient' },
        { header: 'Doctor', accessor: 'doctor' },
        { header: 'Date', accessor: 'date' },
        { header: 'Status', accessor: 'status' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader
                title="Appointments"
                description="Manage patient appointments."
                actionLabel="New Appointment"
                actionUrl="/admin/components/hop/appointment/add"
            />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/hop/appointment" />
        </div>
    );
}
