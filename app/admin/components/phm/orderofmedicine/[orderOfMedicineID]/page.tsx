import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
  params: Promise<{ orderOfMedicineID: string }>;
}

export default async function ViewOrderOfMedicinePage({ params }: PageProps) {
  const { orderOfMedicineID } = await params;
  const id = Number(orderOfMedicineID);

  if (isNaN(id)) notFound();

  const [rawColumns, data] = await Promise.all([
    getColumns("phm_orderofmedicine"),
    prisma.phm_orderofmedicine.findFirst({
      where: { OrderOfMedicineID: id },
    }),
  ]);

  if (!data) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Order Details"
        backUrl="/admin/components/phm/orderofmedicine"
      />

      <ViewTable columns={formattedColumns} data={data} />
    </div>
  );
}
