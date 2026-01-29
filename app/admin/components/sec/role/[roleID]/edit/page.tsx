import React from 'react';
import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { FormContainer } from '@/app/admin/components/Common/Form';
import { getColumns } from '../../../../Common/columns';
import { prisma } from '@/lib/prisma';
import EditRole from '@/app/admin/modules/sec/role/action/editRole';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ roleID: string }>;
}

export default async function EditRolePage({ params }: PageProps) {
    const { roleID } = await params;
    const id = Number(roleID);

    if (isNaN(id)) notFound();

    const [columns, role] = await Promise.all([
        getColumns('sec_role'),
        prisma.sec_role.findFirst({
            where: { RoleID: id }
        })
    ]);

    if (!role) notFound();

    return (
        <>
            <PageHeader
                title="Edit Role"
                backUrl="/admin/components/sec/role"
            />

            <FormContainer
                columns={columns}
                action={EditRole}
                initialData={role as any}
                onCancelUrl="/admin/components/sec/role"
                skipFields={['RoleID']}
            />
        </>
    );
}
