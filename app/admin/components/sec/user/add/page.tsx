import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import SaveUser from '@/app/admin/modules/sec/user/action/SaveUser';

export default async function AddUserPage() {
    const columns = await getColumns('sec_user');

    const roles = await prisma.sec_role.findMany({
        where: { IsDeleted: false },
        select: { RoleID: true, RoleName: true }
    });

    const roleOptions = roles.map(r => ({
        label: r.RoleName,
        value: r.RoleID
    }));

    return (
        <>
            <PageHeader
                title="Add User"
                backUrl="/admin/components/sec/user"
            />

            <FormContainer
                columns={columns}
                action={SaveUser}
                onCancelUrl="/admin/components/sec/user"
                skipFields={['UserID', 'IsActive']}
                selectOptions={{
                    RoleID: roleOptions
                }}
            />
        </>
    );
}
