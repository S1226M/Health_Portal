import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ surgeryBookingID: string }>;
}

export default async function ViewSurgeryBookingPage({ params }: PageProps) {
    const { surgeryBookingID } = await params;
    const id = Number(surgeryBookingID);

    if (isNaN(id)) notFound();

    const [rawColumns, data] = await Promise.all([
        getColumns('sur_surgerybooking'),
        prisma.sur_surgerybooking.findFirst({
            where: { SurgeryBookingID: id }
        })
    ]);

    if (!data) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Booking Details"
                backUrl="/admin/components/sur/surgerybooking"
            />

            <ViewTable
                columns={formattedColumns}
                data={data}
            />
        </div>
    );
}
