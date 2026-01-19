import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveHospital from '@/app/admin/modules/hop/hospital/action/SaveHospital';

// Helper to fix "Only plain objects can be passed to Client Components"
function serializePrismaData(data: any) {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export default async function AddHospitalPage() {
    // 1. Fetch Metadata and Dropdown Data
    const rawColumns = await getColumns('hop_hospital');

    const paymentModes = await prisma.pay_paymentmode.findMany({
        where: { IsDeleted: false },
        select: { PaymentModeID: true, PaymentModeName: true }
    });

    const cities = await prisma.loc_city.findMany({
        where: { IsDeleted: false },
        select: { CityID: true, CityName: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    // 2. Map options for the FormContainer
    const paymentModeOptions = paymentModes.map(p => ({
        label: p.PaymentModeName,
        value: p.PaymentModeID
    }));

    const cityOptions = cities.map(c => ({
        label: c.CityName,
        value: c.CityID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    // 3. Sanitize all data for the Client Boundary
    const safeColumns = serializePrismaData(rawColumns);
    const selectOptions = {
        DefaultPaymentModeID: serializePrismaData(paymentModeOptions),
        CityID: serializePrismaData(cityOptions),
        UserID: serializePrismaData(userOptions)
    };

    return (
        <>
            <PageHeader 
                title="Add Hospital" 
                backUrl="/admin/components/hop/hospital" 
            />

            <FormContainer
                columns={safeColumns}
                action={SaveHospital}
                onCancelUrl="/admin/components/hop/hospital"
                skipFields={['HospitalID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={selectOptions}
            />
        </>
    );
}