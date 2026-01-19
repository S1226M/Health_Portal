import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveAppointment from '@/app/admin/modules/hop/appointment/action/SaveAppointment';

export default async function AddAppointmentPage() {
    const columns = await getColumns('hop_appointment');

    const patients = await prisma.hop_patient.findMany({
        where: { IsDeleted: false },
        select: { PatientID: true, PatientName: true }
    });

    const doctors = await prisma.hop_doctor.findMany({
        where: { IsDeleted: false },
        select: { DoctorID: true, DoctorName: true }
    });

    const patientOptions = patients.map(p => ({
        label: p.PatientName,
        value: p.PatientID
    }));

    const doctorOptions = doctors.map(d => ({
        label: d.DoctorName,
        value: d.DoctorID
    }));

    return (
        <>
            <PageHeader
                title="Add Appointment"
                backUrl="/admin/components/hop/appointment"
            />

            <FormContainer
                columns={columns}
                action={SaveAppointment}
                onCancelUrl="/admin/components/hop/appointment"
                skipFields={['AppointmentID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    PatientID: patientOptions,
                    DoctorID: doctorOptions
                }}
            />
        </>
    );
}
