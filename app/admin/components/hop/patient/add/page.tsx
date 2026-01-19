import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SavePatient from '@/app/admin/modules/hop/patient/action/SavePatient';

export default async function AddPatientPage() {
    const columns = await getColumns('hop_patient');

    const cities = await prisma.loc_city.findMany({
        where: { IsDeleted: false },
        select: { CityID: true, CityName: true }
    });

    const users = await prisma.sec_user.findMany({
        where: { IsDeleted: false },
        select: { UserID: true, UserName: true }
    });

    const cityOptions = cities.map(c => ({
        label: c.CityName,
        value: c.CityID
    }));

    const userOptions = users.map(u => ({
        label: u.UserName,
        value: u.UserID
    }));

    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ];

    const bloodGroupOptions = [
        { label: 'A+', value: 'A+' },
        { label: 'A-', value: 'A-' },
        { label: 'B+', value: 'B+' },
        { label: 'B-', value: 'B-' },
        { label: 'O+', value: 'O+' },
        { label: 'O-', value: 'O-' },
        { label: 'AB+', value: 'AB+' },
        { label: 'AB-', value: 'AB-' }
    ];

    return (
        <>
            <PageHeader
                title="Add Patient"
                backUrl="/admin/components/hop/patient"
            />

            <FormContainer
                columns={columns}
                action={SavePatient}
                onCancelUrl="/admin/components/hop/patient"
                skipFields={['PatientID', 'Created', 'Modified', 'CreatedByUserID', 'ModifiedByUserID', 'IsDeleted']}
                selectOptions={{
                    CityID: cityOptions,
                    UserID: userOptions,
                    Gender: genderOptions,
                    BloodGroup: bloodGroupOptions
                }}
            />
        </>
    );
}
