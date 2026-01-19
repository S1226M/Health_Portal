import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveSubTreatmentType from '@/app/admin/modules/hop/subtreatmenttype/action/SaveSubTreatmentType';

export default async function AddSubTreatmentTypePage() {
    const columns = await getColumns('hop_subtreatmenttype');

    const treatmentTypes = await prisma.hop_treatmenttype.findMany({
        where: { IsDeleted: false },
        select: { TreatmentTypeID: true, TreatmentTypeName: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const treatmentTypeOptions = treatmentTypes.map(t => ({
        label: t.TreatmentTypeName,
        value: t.TreatmentTypeID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    return (
        <>
            <PageHeader
                title="Add Sub Treatment Type"
                backUrl="/admin/components/hop/subtreatmenttype"
            />

            <FormContainer
                columns={columns}
                action={SaveSubTreatmentType}
                onCancelUrl="/admin/components/hop/subtreatmenttype"
                skipFields={['SubTreatmentTypeID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    TreatmentTypeID: treatmentTypeOptions,
                    UserID: userOptions
                }}
            />
        </>
    );
}
