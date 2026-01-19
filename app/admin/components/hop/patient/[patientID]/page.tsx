import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ patientID: string }>;
}

export default async function PatientDetailPage({ params }: PageProps) {
    const { patientID } = await params;
    const id = Number(patientID);

    if (isNaN(id)) notFound();

    const [rawColumns, patient] = await Promise.all([
        getColumns('hop_patient'),
        prisma.hop_patient.findFirst({
            where: { PatientID: id }
        })
    ]);

    if (!patient) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Patient Details"
                backUrl="/admin/components/hop/patient"
            />

            <ViewTable
                columns={formattedColumns}
                data={patient}
            />
        </div>
    );
}
