import { prisma } from '@/lib/prisma';
import React from 'react'

export interface ColumnInfo {
    COLUMN_NAME: string;
    DATA_TYPE: string;
    IS_NULLABLE: string;
}

export async function getSpecializationColumns(): Promise<ColumnInfo[]> {
    const columns = await prisma.$queryRaw<ColumnInfo[]>`
        SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'hop_specialization'
        AND TABLE_SCHEMA = DATABASE()
    `;
    return columns;
}