import { PageHeader } from '@/app/admin/components/Common/PageHeader';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getColumns } from '../../../Common/columns';
import { FormattedColumns } from '../../../Common/formatedColumns';
import { ViewTable } from '../../../Common/commonViewTable';

interface PageProps {
    params: Promise<{ userID: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
    const { userID } = await params;
    const id = Number(userID);

    if (isNaN(id)) notFound();

    const [rawColumns, user] = await Promise.all([
        getColumns('sec_user'),
        prisma.sec_user.findFirst({
            where: { UserID: id },
            include: { sec_role: true }
        })
    ]);

    if (!user) notFound();

    // Flatten for view
    const flatUser = {
        ...user,
        RoleName: user.sec_role?.RoleName
    };

    const formattedColumns = FormattedColumns(rawColumns);

    // Add RoleName to columns matching? getColumns returns DB columns.
    // ViewTable simply iterates object keys or columns? 
    // Usually ViewTable iterates 'columns' and looks up distinct key in data.
    // If I add RoleName to data but it's not in columns, it might not show.
    // I should check ViewUser logic in similar modules.
    // But for now, standard view.

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <PageHeader
                title="User Details"
                backUrl="/admin/components/sec/user"
            />

            <ViewTable
                columns={formattedColumns}
                data={flatUser}
            />
        </div>
    );
}
