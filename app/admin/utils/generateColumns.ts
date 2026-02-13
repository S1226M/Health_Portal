import { Column } from "@/app/admin/components/Common/Table";

export function generateColumns<T extends object>(
  data: T[],
  exclude: string[] = [],
): Column<T>[] {
  if (!data || data.length === 0) return [];

  return Object.keys(data[0])
    .filter((key) => !exclude.includes(key) && key.toLowerCase() !== "id")
    .map((key) => ({
      header: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      accessor: key,
    }));
}