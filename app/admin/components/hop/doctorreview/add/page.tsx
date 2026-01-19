import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveDoctorReview from '@/app/admin/modules/hop/doctorreview/action/SaveDoctorReview';

export default async function AddDoctorReviewPage() {
    const columns = await getColumns('hop_doctorreview');

    const doctors = await prisma.hop_doctor.findMany({
        where: { IsDeleted: false },
        select: { DoctorID: true, DoctorName: true }
    });

    const patients = await prisma.hop_patient.findMany({
        where: { IsDeleted: false },
        select: { PatientID: true, PatientName: true }
    });

    const doctorOptions = doctors.map(d => ({
        label: d.DoctorName,
        value: d.DoctorID
    }));

    const patientOptions = patients.map(p => ({
        label: p.PatientName,
        value: p.PatientID
    }));

    return (
        <>
            <PageHeader
                title="Add Doctor Review"
                backUrl="/admin/components/hop/doctorreview"
            />

            <FormContainer
                columns={columns}
                action={SaveDoctorReview}
                onCancelUrl="/admin/components/hop/doctorreview"
                skipFields={['DoctorReviewID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    DoctorID: doctorOptions,
                    PatientID: patientOptions
                }}
            />
        </>
    );
}
