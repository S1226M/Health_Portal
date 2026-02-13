import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
  params: Promise<{ treatmentTypeID: string }>;
}

export default async function TreatmentTypeDetailPage({ params }: PageProps) {
  const { treatmentTypeID } = await params;
  const id = Number(treatmentTypeID);

  if (isNaN(id)) notFound();

  const [rawColumns, treatmentType] = await Promise.all([
    getColumns("hop_treatmenttype"),
    prisma.hop_treatmenttype.findFirst({
      where: { TreatmentTypeID: id },
    }),
  ]);

  if (!treatmentType) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Treatment Type Details"
        backUrl="/admin/components/hop/treatmenttype"
      />

      <ViewTable columns={formattedColumns} data={treatmentType} />
    </div>
  );
}
