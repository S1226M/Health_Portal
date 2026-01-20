import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editSurgeryItem from "@/app/admin/modules/sur/surgeryitem/action/editSurgeryItem";
import { notFound } from "next/navigation";

export default async function EditSurgeryItemPage({ params }: { params: Promise<{ surgeryItemID: string }> }) {
    const { surgeryItemID } = await params;
    const data = await prisma.sur_surgeryitem.findUnique({
        where: { SurgeryItemID: parseInt(surgeryItemID) }
    });

    if (!data) notFound();

    const columns = await getColumns('sur_surgeryitem');

    const labTests = await prisma.lab_labtest.findMany({ where: { IsDeleted: false } });
    const surgeries = await prisma.sur_surgery.findMany({ where: { IsDeleted: false } });

    const selectOptions = {
        LabTestID: labTests.map(l => ({ label: l.TestName, value: l.LabTestID })),
        SurgeryID: surgeries.map(s => ({ label: s.SurgeryName, value: s.SurgeryID }))
    };

    const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Edit Item"
                backUrl="/admin/components/sur/surgeryitem"
            />

            <FormContainer
                action={editSurgeryItem}
                onCancelUrl="/admin/components/sur/surgeryitem"
                columns={columns}
                skipFields={['SurgeryItemID']}
                selectOptions={selectOptions}
                initialData={serializedData}
            >
                <input type="hidden" name="SurgeryItemID" value={data?.SurgeryItemID} />
            </FormContainer>
        </div>
    )
}
