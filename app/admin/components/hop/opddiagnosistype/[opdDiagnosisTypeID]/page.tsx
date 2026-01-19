import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ opdDiagnosisTypeID: string }>;
}

export default async function OPDDiagnosisTypeDetailPage({ params }: PageProps) {
    const { opdDiagnosisTypeID } = await params;
    const id = Number(opdDiagnosisTypeID);

    if (isNaN(id)) notFound();

    const [rawColumns, opdDiagnosisType] = await Promise.all([
        getColumns('hop_opddiagnosistype'),
        prisma.hop_opddiagnosistype.findFirst({
            where: { OPDDiagnosisTypeID: id }
        })
    ]);

    if (!opdDiagnosisType) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="OPD Diagnosis Type Details"
                backUrl="/admin/components/hop/opddiagnosistype"
            />

            <ViewTable
                columns={formattedColumns}
                data={opdDiagnosisType}
            />
        </div>
    );
}
