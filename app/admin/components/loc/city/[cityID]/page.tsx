import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
  params: Promise<{ cityID: string }>;
}

export default async function CityDetailPage({ params }: PageProps) {
  // Await params as per Next.js 15 requirements
  const { cityID } = await params;
  const id = Number(cityID);

  // Guard: invalid ID
  if (isNaN(id)) notFound();

  // Fetch data and column definitions in parallel
  const [rawColumns, city] = await Promise.all([
    getColumns("loc_city"),
    prisma.loc_city.findFirst({
      where: { CityID: id },
    }),
  ]);

  // Guard: Record not found
  if (!city) notFound();

  // Format columns for the view (filtering out actions/unwanted fields)
  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader title="City Details" backUrl="/admin/components/loc/city" />

      <ViewTable columns={formattedColumns} data={city} />
    </div>
  );
}
