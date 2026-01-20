import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editMedicineCategory from "@/app/admin/modules/phm/medicinecategory/action/editMedicineCategory";
import { notFound } from "next/navigation";

export default async function EditMedicineCategoryPage({ params }: { params: Promise<{ medicineCategoryID: string }> }) {
    const { medicineCategoryID } = await params;
    const data = await prisma.phm_medicinecategory.findUnique({
        where: { MedicineCategoryID: parseInt(medicineCategoryID) }
    });

    if (!data) notFound();

    const columns = await getColumns('phm_medicinecategory');

    const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Edit Medicine Category"
                backUrl="/admin/components/phm/medicinecategory"
            />

            <FormContainer
                action={editMedicineCategory}
                onCancelUrl="/admin/components/phm/medicinecategory"
                columns={columns}
                skipFields={['MedicineCategoryID']}
                initialData={serializedData}
            >
                <input type="hidden" name="MedicineCategoryID" value={data?.MedicineCategoryID} />
            </FormContainer>
        </div>
    )
}
