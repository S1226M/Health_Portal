import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveDiagnosisType from '@/app/admin/modules/hop/diagnosistype/action/SaveDiagnosisType';

export default async function AddDiagnosisTypePage() {
    const columns = await getColumns('hop_diagnosistype');

    const hospitals = await prisma.hop_hospital.findMany({
        where: { IsDeleted: false },
        select: { HospitalID: true, HospitalName: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const hospitalOptions = hospitals.map(h => ({
        label: h.HospitalName,
        value: h.HospitalID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    return (
        <>
            <PageHeader
                title="Add Diagnosis Type"
                backUrl="/admin/components/hop/diagnosistype"
            />

            <FormContainer
                columns={columns}
                action={SaveDiagnosisType}
                onCancelUrl="/admin/components/hop/diagnosistype"
                skipFields={['DiagnosisTypeID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    HospitalID: hospitalOptions,
                    UserID: userOptions
                }}
            />
        </>
    );
}
