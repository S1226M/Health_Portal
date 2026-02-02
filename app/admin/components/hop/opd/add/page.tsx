import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveOPD from '@/app/admin/modules/hop/opd/action/SaveOPD';

export default async function AddOPDPage() {
    const columns = await getColumns('hop_opd');

    const patients = await prisma.hop_patient.findMany({
        where: { IsDeleted: false },
        select: { PatientID: true, PatientName: true }
    });

    const doctors = await prisma.hop_doctor.findMany({
        where: { IsDeleted: false },
        select: { DoctorID: true, DoctorName: true }
    });

    const diagnosisTypes = await prisma.hop_diagnosistype.findMany({
        where: { IsDeleted: false },
        select: { DiagnosisTypeID: true, DiagnosisTypeName: true }
    });

    const appointments = await prisma.hop_appointment.findMany({
        where: { IsDeleted: false },
        select: { AppointmentID: true, AppointmentDate: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const patientOptions = patients.map(p => ({
        label: p.PatientName,
        value: p.PatientID
    }));

    const doctorOptions = doctors.map(d => ({
        label: d.DoctorName,
        value: d.DoctorID
    }));

    const diagnosisTypeOptions = diagnosisTypes.map(d => ({
        label: d.DiagnosisTypeName,
        value: d.DiagnosisTypeID
    }));

    const appointmentOptions = appointments.map(a => ({
        label: `${a.AppointmentID} - ${a.AppointmentDate ? new Date(a.AppointmentDate).toLocaleString() : ''}`,
        value: a.AppointmentID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    return (
        <>
            <PageHeader
                title="Add OPD"
                backUrl="/admin/components/hop/opd"
            />

            <FormContainer
                columns={columns}
                action={SaveOPD}
                onCancelUrl="/admin/components/hop/opd"
                skipFields={['OPDID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    PatientID: patientOptions,
                    TreatedByDoctorID: doctorOptions,
                    DiagnosisTypeID: diagnosisTypeOptions,
                    AppointmentID: appointmentOptions,
                    UserID: userOptions
                }}
            />
        </>
    );
}
