import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
  params: Promise<{ hospitalID: string }>;
}

export default async function HospitalDetailPage({ params }: PageProps) {
  const { hospitalID } = await params;
  const id = Number(hospitalID);

  if (isNaN(id)) notFound();

  const [rawColumns, hospital] = await Promise.all([
    getColumns("hop_hospital"),
    prisma.hop_hospital.findFirst({
      where: { HospitalID: id },
    }),
  ]);

  if (!hospital) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Hospital Details"
        backUrl="/admin/components/hop/hospital"
      />

      <ViewTable columns={formattedColumns} data={hospital} />
    </div>
  );
}
