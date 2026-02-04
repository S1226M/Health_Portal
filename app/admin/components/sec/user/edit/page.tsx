import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../Common/columns';
import { prisma } from '@/lib/prisma';
import EditUser from '@/app/admin/modules/sec/user/action/editUser';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ userID: string }>;
}

export default async function EditUserPage({ params }: PageProps) {
    const { userID } = await params;
    const id = Number(userID);

    if (isNaN(id)) notFound();

    const [columns, user, roles] = await Promise.all([
        getColumns('sec_user'),
        prisma.sec_user.findFirst({
            where: { UserID: id }
        }),
        prisma.sec_role.findMany({
            where: { IsDeleted: false },
            select: { RoleID: true, RoleName: true }
        })
    ]);

    if (!user) notFound();

    const roleOptions = roles.map(r => ({
        label: r.RoleName,
        value: r.RoleID
    }));

    return (
        <>
            <PageHeader
                title="Edit User"
                backUrl="/admin/components/sec/user"
            />

            <FormContainer
                columns={columns}
                action={EditUser}
                initialData={user as any}
                onCancelUrl="/admin/components/sec/user"
                skipFields={['UserID', 'IsActive', 'Created', 'CreatedByUserID', 'IsDeleted']}
                selectOptions={{
                    RoleID: roleOptions
                }}
            />
        </>
    );
}
