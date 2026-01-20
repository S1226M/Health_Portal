import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editMedicine from "@/app/admin/modules/phm/medicine/action/editMedicine";
import { notFound } from "next/navigation";

export default async function EditMedicinePage({ params }: { params: Promise<{ medicineID: string }> }) {
    const { medicineID } = await params;
    const data = await prisma.phm_medicine.findUnique({
        where: { MedicineID: parseInt(medicineID) }
    });

    if (!data) notFound();

    const columns = await getColumns('phm_medicine');

    const categories = await prisma.phm_medicinecategory.findMany({ where: { IsDeleted: false } });

    const selectOptions = {
        MedicineCategoryID: categories.map(c => ({ label: c.CategoryName, value: c.MedicineCategoryID }))
    };

    const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Edit Medicine"
                backUrl="/admin/components/phm/medicine"
            />

            <FormContainer
                action={editMedicine}
                onCancelUrl="/admin/components/phm/medicine"
                columns={columns}
                skipFields={['MedicineID']}
                selectOptions={selectOptions}
                initialData={serializedData}
            >
                <input type="hidden" name="MedicineID" value={data?.MedicineID} />
            </FormContainer>
        </div>
    )
}
