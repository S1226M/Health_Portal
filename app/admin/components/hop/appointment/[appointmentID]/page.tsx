import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ appointmentID: string }>;
}

export default async function AppointmentDetailPage({ params }: PageProps) {
    const { appointmentID } = await params;
    const id = Number(appointmentID);

    if (isNaN(id)) notFound();

    const [rawColumns, appointment] = await Promise.all([
        getColumns('hop_appointment'),
        prisma.hop_appointment.findFirst({
            where: { AppointmentID: id }
        })
    ]);

    if (!appointment) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Appointment Details"
                backUrl="/admin/components/hop/appointment"
            />

            <ViewTable
                columns={formattedColumns}
                data={appointment}
            />
        </div>
    );
}
