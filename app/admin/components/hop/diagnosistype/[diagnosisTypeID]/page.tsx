import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ diagnosisTypeID: string }>;
}

export default async function DiagnosisTypeDetailPage({ params }: PageProps) {
    const { diagnosisTypeID } = await params;
    const id = Number(diagnosisTypeID);

    if (isNaN(id)) notFound();

    const [rawColumns, diagnosisType] = await Promise.all([
        getColumns('hop_diagnosistype'),
        prisma.hop_diagnosistype.findFirst({
            where: { DiagnosisTypeID: id }
        })
    ]);

    if (!diagnosisType) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Diagnosis Type Details"
                backUrl="/admin/components/hop/diagnosistype"
            />

            <ViewTable
                columns={formattedColumns}
                data={diagnosisType}
            />
        </div>
    );
}
