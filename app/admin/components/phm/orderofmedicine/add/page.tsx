import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveOrderOfMedicine from '@/app/admin/modules/phm/orderofmedicine/action/SaveOrderOfMedicine';

export default async function AddOrderOfMedicinePage() {
    const columns = await getColumns('phm_orderofmedicine');

    const medicines = await prisma.phm_medicine.findMany({ where: { IsDeleted: false } });
    // const paymentTypes = ...

    const selectOptions = {
        MedicineID: medicines.map(m => ({ label: m.MedicineName, value: m.MedicineID })),
        // MedicineOrderPaymentTypeID: ...
    };

    return (
        <>
            <PageHeader
                title="Add Medicine Order"
                backUrl="/admin/components/phm/orderofmedicine"
            />

            <FormContainer
                columns={columns}
                action={SaveOrderOfMedicine}
                onCancelUrl="/admin/components/phm/orderofmedicine"
                skipFields={['OrderOfMedicineID']}
                selectOptions={selectOptions}
            />
        </>
    );
}
