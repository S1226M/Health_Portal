import React from 'react';
import { PageHeader, SearchBar } from '@/app/admin/components/Common/PageHeader';
import { Table } from '@/app/admin/components/Common/Table';

export default function SurgeryBookingListPage() {
    const data = [
        { id: 1, patient: 'Smit M', bookingNo: 'BK2025001', date: '2025-12-30', status: 'Scheduled' },
    ];

    const columns = [
        { header: 'Patient', accessor: 'patient' },
        { header: 'Booking No', accessor: 'bookingNo' },
        { header: 'Date', accessor: 'date' },
        { header: 'Status', accessor: 'status' },
        { header: 'Actions', accessor: 'actions', isAction: true },
    ];

    return (
        <div className="p-6">
            <PageHeader title="Surgery Bookings" actionLabel="New Booking" actionUrl="/admin/components/sur/surgerybooking/add" />
            <div className="mb-6"><SearchBar /></div>
            <Table columns={columns} data={data} basePath="/admin/components/sur/surgerybooking" />
        </div>
    );
}
