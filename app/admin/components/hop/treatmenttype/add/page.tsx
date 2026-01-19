import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveTreatmentType from '@/app/admin/modules/hop/treatmenttype/action/SaveTreatmentType';

export default async function AddTreatmentTypePage() {
    const columns = await getColumns('hop_treatmenttype');

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    return (
        <>
            <PageHeader
                title="Add Treatment Type"
                backUrl="/admin/components/hop/treatmenttype"
            />

            <FormContainer
                columns={columns}
                action={SaveTreatmentType}
                onCancelUrl="/admin/components/hop/treatmenttype"
                skipFields={['TreatmentTypeID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    UserID: userOptions
                }}
            />
        </>
    );
}
