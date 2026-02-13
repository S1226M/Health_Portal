import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
  params: Promise<{ medicineorderpaymenttypeID: string }>;
}

export default async function ViewMedicineOrderPaymentTypePage({
  params,
}: PageProps) {
  const { medicineorderpaymenttypeID } = await params;
  const id = Number(medicineorderpaymenttypeID);

  if (isNaN(id)) notFound();

  const [rawColumns, data] = await Promise.all([
    getColumns("phm_medicineorderpaymenttype"),
    prisma.phm_medicineorderpaymenttype.findFirst({
      where: { MedicineOrderPaymentTypeID: id },
    }),
  ]);

  if (!data) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Medicine Order Payment Type Details"
        backUrl="/admin/components/phm/medicineorderpaymenttype"
      />

      <ViewTable columns={formattedColumns} data={data} />
    </div>
  );
}
