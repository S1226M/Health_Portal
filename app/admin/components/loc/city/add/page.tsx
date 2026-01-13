import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveCity from '@/app/admin/modules/loc/city/action/SaveCity';

export default async function AddCityPage() {
    const columns = await getColumns('loc_city');
    
    const states = await prisma.loc_state.findMany({
        where: { IsDeleted: false },
        select: { StateID: true, StateName: true }
    });

    const stateOptions = states.map(c => ({
        label: c.StateName,
        value: c.StateID
    }));

    return (
        <>
            <PageHeader 
                title="Add City" 
                backUrl="/admin/components/loc/city" 
            />

            <FormContainer 
                columns={columns}
                action={SaveCity}
                onCancelUrl="/admin/components/loc/city"
                skipFields={['CityID']}
                selectOptions={{
                    StateID: stateOptions
                }}
            />
        </>  
    );
}
