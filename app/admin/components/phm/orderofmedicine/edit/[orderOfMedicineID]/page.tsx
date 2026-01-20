import { getColumns } from "@/app/admin/components/Common/columns";
import { FormContainer } from "@/app/admin/components/Common/Form";
import { PageHeader } from "@/app/admin/components/Common/PageHeader";
import { prisma } from "@/lib/prisma";
import editOrderOfMedicine from "@/app/admin/modules/phm/orderofmedicine/action/editOrderOfMedicine";
import { notFound } from "next/navigation";

export default async function EditOrderOfMedicinePage({ params }: { params: Promise<{ orderOfMedicineID: string }> }) {
    const { orderOfMedicineID } = await params;
    const data = await prisma.phm_orderofmedicine.findUnique({
        where: { OrderOfMedicineID: parseInt(orderOfMedicineID) }
    });

    if (!data) notFound();

    const columns = await getColumns('phm_orderofmedicine');

    // Fetch relations
    const medicines = await prisma.phm_medicine.findMany({ where: { IsDeleted: false } });
    // Assuming payment types exist, waiting for confirmation on model name
    // const paymentTypes = await prisma.phm_medicineorderpaymenttype.findMany({ where: { IsDeleted: false } });

    const selectOptions = {
        MedicineID: medicines.map(m => ({ label: m.MedicineName, value: m.MedicineID })),
        // MedicineOrderPaymentTypeID: paymentTypes.map(p => ({ label: p.PaymentTypeName, value: p.MedicineOrderPaymentTypeID }))
    };

    const serializedData = data ? JSON.parse(JSON.stringify(data)) : null;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="Edit Order"
                backUrl="/admin/components/phm/orderofmedicine"
            />

            <FormContainer
                action={editOrderOfMedicine}
                onCancelUrl="/admin/components/phm/orderofmedicine"
                columns={columns}
                skipFields={['OrderOfMedicineID']}
                selectOptions={selectOptions}
                initialData={serializedData}
            >
                <input type="hidden" name="OrderOfMedicineID" value={data?.OrderOfMedicineID} />
            </FormContainer>
        </div>
    )
}
