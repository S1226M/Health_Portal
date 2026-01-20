import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editLabTestOrder from "@/app/admin/modules/lab/labtestorder/action/editLabTestOrder";
import { notFound } from "next/navigation";

export default async function EditLabTestOrderPage({ params }: { params: Promise<{ labTestOrderID: string }> }) {
    const { labTestOrderID } = await params;
    const data = await prisma.lab_labtestorder.findUnique({
        where: { LabTestOrderID: parseInt(labTestOrderID) }
    });

    if (!data) notFound();

    const columns = await getColumns('lab_labtestorder');

    // Fetch relations for dropdowns
    const types = await prisma.lab_labtesttype.findMany({ where: { IsDeleted: false } });
    const patients = await prisma.hop_patient.findMany({ where: { IsDeleted: false } });

    const selectOptions = {
        LabTestTypeID: types.map(t => ({ label: t.LabTestTypeName, value: t.LabTestTypeID })),
        PatientID: patients.map(p => ({ label: p.PatientName, value: p.PatientID }))
    };

    const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Edit Lab Test Order"
                backUrl="/admin/components/lab/labtestorder"
            />

            <FormContainer
                action={editLabTestOrder}
                onCancelUrl="/admin/components/lab/labtestorder"
                columns={columns}
                skipFields={['LabTestOrderID']}
                selectOptions={selectOptions}
                initialData={serializedData}
            >
                <input type="hidden" name="LabTestOrderID" value={data?.LabTestOrderID} />
            </FormContainer>
        </div>
    )
}
