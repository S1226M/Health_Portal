import { notFound } from "next/navigation";
import { getColumns } from "../../../Common/columns";
import { prisma } from "@/lib/prisma";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { PageHeader } from "../../../Common/PageHeader";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
    params: Promise<{ labtestID: string }>;
}

export default async function ViewLabTestPage({ params }: PageProps) {
    const { labtestID } = await params;
    const id = Number(labtestID);

    if (isNaN(id)) notFound();

    const [rawColumns, data] = await Promise.all([
        getColumns('lab_labtest'),
        prisma.lab_labtest.findFirst({
            where: { LabTestID: id }
        })
    ]);

    if (!data) notFound();

    const formattedColumns = FormattedColumns(rawColumns);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Lab Test Details"
                backUrl="/admin/components/lab/labtest"
            />
            <ViewTable
                columns={formattedColumns}
                data={data}
            />
        </div>
    );
}