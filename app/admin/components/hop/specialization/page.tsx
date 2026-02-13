import {
  PageHeader,
  SearchBar,
} from "@/app/admin/components/Common/PageHeader";
import { Table, Column } from "@/app/admin/components/Common/Table";
import { prisma } from "@/lib/prisma";
import { generateColumns } from "@/app/admin/utils/generateColumns";

export default async function SpecializationListPage() {
  const data = await prisma.hop_specialization.findMany({
    where: { IsDeleted: false },
  });

  const autoColumns = generateColumns(data, [
    "Created",
    "Modified",
    "CreatedByUserID",
    "ModifiedByUserID",
    "IsDeleted",
  ]);

  const columns: Column<(typeof data)[number]>[] = [
    ...autoColumns,
    {
      header: "Actions",
      isAction: true,
    },
  ];

  return (
    <div className="p-6">
      <PageHeader
        title="Specializations"
        actionLabel="Add Specialization"
        actionUrl="/admin/components/hop/specialization/add"
      />

      <div className="mb-6">
        <SearchBar />
      </div>

      <Table
        columns={columns}
        data={data}
        idKey="SpecializationID"
        basePath="/admin/components/hop/specialization"
        moduleName="Specialization"
      />
    </div>
  );
}
