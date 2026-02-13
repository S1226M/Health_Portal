import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getColumns } from "../../../Common/columns";
import { FormattedColumns } from "../../../Common/formatedColumns";
import { ViewTable } from "../../../Common/commonViewTable";

interface PageProps {
  params: Promise<{ roleID: string }>;
}

export default async function RoleDetailPage({ params }: PageProps) {
  const { roleID } = await params;
  const id = Number(roleID);

  if (isNaN(id)) notFound();

  const [rawColumns, role] = await Promise.all([
    getColumns("sec_role"),
    prisma.sec_role.findFirst({
      where: { RoleID: id },
    }),
  ]);

  if (!role) notFound();

  const formattedColumns = FormattedColumns(rawColumns);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader title="Role Details" backUrl="/admin/components/sec/role" />

      <ViewTable columns={formattedColumns} data={role} />
    </div>
  );
}
