import { prisma } from "@/lib/prisma";

export interface ColumnInfo {
  COLUMN_NAME: string;
  DATA_TYPE: string;
  IS_NULLABLE: string;
  REFERENCED_TABLE_NAME: string | null;
  REFERENCED_COLUMN_NAME: string | null;
}

export async function getColumns(tableName: string): Promise<ColumnInfo[]> {
  const columns = await prisma.$queryRaw<ColumnInfo[]>`
    SELECT 
        cols.COLUMN_NAME, 
        CAST(cols.DATA_TYPE AS CHAR) AS DATA_TYPE, 
        CAST(cols.IS_NULLABLE AS CHAR) AS IS_NULLABLE,
        k.REFERENCED_TABLE_NAME,
        k.REFERENCED_COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS cols
    LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE k 
        ON cols.TABLE_NAME = k.TABLE_NAME 
        AND cols.COLUMN_NAME = k.COLUMN_NAME
        AND cols.TABLE_SCHEMA = k.TABLE_SCHEMA
    WHERE cols.TABLE_NAME = ${tableName}
      AND cols.TABLE_SCHEMA = DATABASE()
    ORDER BY cols.ORDINAL_POSITION;`;

  return columns;
}
