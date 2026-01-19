import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveHospitalTreatment from '@/app/admin/modules/hop/hospitaltreatment/action/SaveHospitalTreatment';

export default async function AddHospitalTreatmentPage() {
    const columns = await getColumns('hop_hospitaltreatment');

    const hospitals = await prisma.hop_hospital.findMany({
        where: { IsDeleted: false },
        select: { HospitalID: true, HospitalName: true }
    });

    const treatmentTypes = await prisma.hop_treatmenttype.findMany({
        where: { IsDeleted: false },
        select: { TreatmentTypeID: true, TreatmentTypeName: true }
    });

    const hospitalOptions = hospitals.map(h => ({
        label: h.HospitalName,
        value: h.HospitalID
    }));

    const treatmentTypeOptions = treatmentTypes.map(t => ({
        label: t.TreatmentTypeName,
        value: t.TreatmentTypeID
    }));

    return (
        <>
            <PageHeader
                title="Add Hospital Treatment"
                backUrl="/admin/components/hop/hospitaltreatment"
            />

            <FormContainer
                columns={columns}
                action={SaveHospitalTreatment}
                onCancelUrl="/admin/components/hop/hospitaltreatment"
                skipFields={['HospitalTreatmentID', 'IsDeleted']}
                selectOptions={{
                    HospitalID: hospitalOptions,
                    TreatmentTypeID: treatmentTypeOptions
                }}
            />
        </>
    );
}
