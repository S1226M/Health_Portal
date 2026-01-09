export function FormattedColumns(rows: any[]) {
    return rows.map((col) => {
        const name = col.COLUMN_NAME; 
        
        return {
            accessor: name,
            header: name
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str: string) => str.toUpperCase())
                .trim(),
        };
    });
}