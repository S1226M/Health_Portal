import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ medicineCategoryID: string }>;
}

export default async function ViewMedicineCategoryPage({ params }: PageProps) {
    const { medicineCategoryID } = await params;
    const id = Number(medicineCategoryID);

    if (isNaN(id)) notFound();

    const [rawColumns, data] = await Promise.all([
        getColumns('phm_medicinecategory'),
        prisma.phm_medicinecategory.findFirst({
            where: { MedicineCategoryID: id }
        })
    ]);

    if (!data) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Medicine Category Details"
                backUrl="/admin/components/phm/medicinecategory"
            />

            <ViewTable
                columns={formattedColumns}
                data={data}
            />
        </div>
    );
}
