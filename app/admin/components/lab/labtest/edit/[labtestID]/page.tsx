import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import editLabTest from "@/app/admin/modules/lab/labtest/action/editLabTest";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditLabTestPage({ params }: { params: { labtestID: string } }) {
    const { labtestID } = await params;
    const data = await prisma.lab_labtest.findUnique({
        where: { LabTestID: parseInt(labtestID) }
    });

    if (!data) notFound();

    const columns = await getColumns('lab_labtest');

    const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Edit Lab Test"
                backUrl="/admin/components/lab/labtest"
            />

            <FormContainer
                action={editLabTest}
                onCancelUrl="/admin/components/lab/labtest"
                columns={columns}
                skipFields={['LabTestID']}
                initialData={serializedData}
            >
                <input type="hidden" name="LabTestID" value={data?.LabTestID} />
            </FormContainer>
        </div>
    )
}
