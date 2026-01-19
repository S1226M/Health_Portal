import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ hospitalTreatmentID: string }>;
}

export default async function HospitalTreatmentDetailPage({ params }: PageProps) {
    const { hospitalTreatmentID } = await params;
    const id = Number(hospitalTreatmentID);

    if (isNaN(id)) notFound();

    const [rawColumns, hospitalTreatment] = await Promise.all([
        getColumns('hop_hospitaltreatment'),
        prisma.hop_hospitaltreatment.findFirst({
            where: { HospitalTreatmentID: id },
            include: {
                hop_hospital: { select: { HospitalName: true } },
                hop_treatmenttype: { select: { TreatmentTypeName: true } }
            }
        })
    ]);

    if (!hospitalTreatment) notFound();

    // Flatten for view if needed, but ViewTable handles standard scalar fields. 
    // To show related names, we might need to adjust or rely on updated FormattedColumns/ViewTable if they support relations.
    // For now, I'll flatten it manually for the ViewTable to show names.
    const flattenedData = {
        ...hospitalTreatment,
        HospitalName: hospitalTreatment.hop_hospital.HospitalName,
        TreatmentTypeName: hospitalTreatment.hop_treatmenttype.TreatmentTypeName,
    };
    // Remove the object fields to prevent display issues
    delete (flattenedData as any).hop_hospital;
    delete (flattenedData as any).hop_treatmenttype;

    const formattedColumns = FormattedColumns(rawColumns);
    // Probably need to add manually columns for HospitalName and TreatmentTypeName?
    // FormattedColumns usually takes prisma definition. It won't know about HospitalName.
    // I'll trust standard ViewTable behavior or just show IDs if names are not easily injected without modifying `FormattedColumns`.
    // Actually, `ViewTable` iterates keys of `data`. So if I pass `flattenedData`, it shows provided keys.
    // But `FormattedColumns` filters columns based on `rawColumns` (schema).
    // If I want to show names, I should probably stick to showing IDs or modify basic components.
    // Given the strict instruction "strictly follow the existing code syntax", I will stick to what `ViewTable` expects.
    // `ViewTable` usually takes `columns` and `data`.
    // If I pass flattenedData, I need corresponding columns.
    // I will stick to basic implementation first (showing IDs) to be safe on "Code Syntax Adherence".
    // Or, I can check how `City` displays StateName.
    // `City/[cityID]/page.tsx` uses `prisma.loc_city.findFirst`. It doesn't include State relation.
    // So it likely shows StateID. I will follow that pattern.

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Hospital Treatment Details"
                backUrl="/admin/components/hop/hospitaltreatment"
            />

            <ViewTable
                columns={formattedColumns}
                data={hospitalTreatment}
            />
        </div>
    );
}
