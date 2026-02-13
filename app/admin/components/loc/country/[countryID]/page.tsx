import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ViewTable } from "../../../Common/commonViewTable";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ countryID: string }>;
}) {
  const { countryID } = await params;
  const id = Number(countryID);

  if (Number.isNaN(id)) notFound();

  const [rawColumns, country] = await Promise.all([
    getColumns("loc_country"),
    prisma.loc_country.findFirst({ where: { CountryID: id } }),
  ]);

  if (!country) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Country Details"
        backUrl="/admin/components/loc/country"
      />

      <ViewTable columns={formattedColumns} data={country} />
    </div>
  );
}
