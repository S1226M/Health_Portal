import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
  params: Promise<{ surgeryItemID: string }>;
}

export default async function ViewSurgeryItemPage({ params }: PageProps) {
  const { surgeryItemID } = await params;
  const id = Number(surgeryItemID);

  if (isNaN(id)) notFound();

  const [rawColumns, data] = await Promise.all([
    getColumns("sur_surgeryitem"),
    prisma.sur_surgeryitem.findFirst({
      where: { SurgeryItemID: id },
    }),
  ]);

  if (!data) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Surgery Item Details"
        backUrl="/admin/components/sur/surgeryitem"
      />

      <ViewTable columns={formattedColumns} data={data} />
    </div>
  );
}
