import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editLabTestType from "@/app/admin/modules/lab/labtesttype/action/editLabTestType";
import { notFound } from "next/navigation";

export default async function EditLabTestTypePage({ params }: { params: Promise<{ labTestTypeID: string }> }) {
    const { labTestTypeID } = await params;
    const data = await prisma.lab_labtesttype.findUnique({
        where: { LabTestTypeID: parseInt(labTestTypeID) }
    });

    if (!data) notFound();

    const columns = await getColumns('lab_labtesttype');

    const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Edit Lab Test Type"
                backUrl="/admin/components/lab/labtesttype"
            />

            <FormContainer
                action={editLabTestType}
                onCancelUrl="/admin/components/lab/labtesttype"
                columns={columns}
                skipFields={['LabTestTypeID']}
                initialData={serializedData}
            >
                <input type="hidden" name="LabTestTypeID" value={data?.LabTestTypeID} />
            </FormContainer>
        </div>
    )
}
