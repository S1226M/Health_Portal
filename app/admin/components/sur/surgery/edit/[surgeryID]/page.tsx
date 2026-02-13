import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editSurgery from "@/app/admin/modules/sur/surgery/action/editSurgery";
import { notFound } from "next/navigation";

export default async function EditSurgeryPage({
  params,
}: {
  params: Promise<{ surgeryID: string }>;
}) {
  const { surgeryID } = await params;
  const data = await prisma.sur_surgery.findUnique({
    where: { SurgeryID: parseInt(surgeryID) },
  });

  if (!data) notFound();

  const columns = await getColumns("sur_surgery");

  const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="Edit Surgery"
        backUrl="/admin/components/sur/surgery"
      />

      <FormContainer
        action={editSurgery}
        onCancelUrl="/admin/components/sur/surgery"
        columns={columns}
        skipFields={["SurgeryID"]}
        initialData={serializedData}
      >
        <input type="hidden" name="SurgeryID" value={data?.SurgeryID} />
      </FormContainer>
    </div>
  );
}
