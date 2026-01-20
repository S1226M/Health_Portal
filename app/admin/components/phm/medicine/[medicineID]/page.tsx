import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ medicineID: string }>;
}

export default async function ViewMedicinePage({ params }: PageProps) {
    const { medicineID } = await params;
    const id = Number(medicineID);

    if (isNaN(id)) notFound();

    const [rawColumns, data] = await Promise.all([
        getColumns('phm_medicine'),
        prisma.phm_medicine.findFirst({
            where: { MedicineID: id }
        })
    ]);

    if (!data) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Medicine Details"
                backUrl="/admin/components/phm/medicine"
            />

            <ViewTable
                columns={formattedColumns}
                data={data}
            />
        </div>
    );
}
