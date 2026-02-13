import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
  params: Promise<{ doctorID: string }>;
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { doctorID } = await params;
  const id = Number(doctorID);

  if (isNaN(id)) notFound();

  const [rawColumns, doctor] = await Promise.all([
    getColumns("hop_doctor"),
    prisma.hop_doctor.findFirst({
      where: { DoctorID: id },
    }),
  ]);

  if (!doctor) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Doctor Details"
        backUrl="/admin/components/hop/doctor"
      />

      <ViewTable columns={formattedColumns} data={doctor} />
    </div>
  );
}
