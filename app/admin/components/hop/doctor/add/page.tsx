import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveDoctor from '@/app/admin/modules/hop/doctor/action/SaveDoctor';

export default async function AddDoctorPage() {
    const columns = await getColumns('hop_doctor');

    const hospitals = await prisma.hop_hospital.findMany({
        where: { IsDeleted: false },
        select: { HospitalID: true, HospitalName: true }
    });

    const specializations = await prisma.hop_specialization.findMany({
        where: { IsDeleted: false },
        select: { SpecializationID: true, SpecializationName: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const hospitalOptions = hospitals.map(h => ({
        label: h.HospitalName,
        value: h.HospitalID
    }));

    const specializationOptions = specializations.map(s => ({
        label: s.SpecializationName,
        value: s.SpecializationID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    return (
        <>
            <PageHeader
                title="Add Doctor"
                backUrl="/admin/components/hop/doctor"
            />

            <FormContainer
                columns={columns}
                action={SaveDoctor}
                onCancelUrl="/admin/components/hop/doctor"
                skipFields={['DoctorID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    HospitalID: hospitalOptions,
                    SpecializationID: specializationOptions,
                    UserID: userOptions
                }}
            />
        </>
    );
}
