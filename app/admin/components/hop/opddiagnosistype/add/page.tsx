import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveOPDDiagnosisType from '@/app/admin/modules/hop/opddiagnosistype/action/SaveOPDDiagnosisType';

export default async function AddOPDDiagnosisTypePage() {
    const columns = await getColumns('hop_opddiagnosistype');

    const opds = await prisma.hop_opd.findMany({
        where: { IsDeleted: false },
        select: { OPDID: true, OPDDateTime: true }
    });

    const diagnosisTypes = await prisma.hop_diagnosistype.findMany({
        where: { IsDeleted: false },
        select: { DiagnosisTypeID: true, DiagnosisTypeName: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const opdOptions = opds.map(o => ({
        label: `${o.OPDID} - ${new Date(o.OPDDateTime).toLocaleDateString()}`,
        value: o.OPDID
    }));

    const diagnosisTypeOptions = diagnosisTypes.map(d => ({
        label: d.DiagnosisTypeName,
        value: d.DiagnosisTypeID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    return (
        <>
            <PageHeader
                title="Add OPD Diagnosis Type"
                backUrl="/admin/components/hop/opddiagnosistype"
            />

            <FormContainer
                columns={columns}
                action={SaveOPDDiagnosisType}
                onCancelUrl="/admin/components/hop/opddiagnosistype"
                skipFields={['OPDDiagnosisTypeID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    OPDID: opdOptions,
                    DiagnosisTypeID: diagnosisTypeOptions,
                    UserID: userOptions
                }}
            />
        </>
    );
}
