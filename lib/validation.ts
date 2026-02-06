import { prisma } from "@/lib/prisma";

/**
 * Validate unique field before creating a record
 * Returns error message if duplicate found, null if ok
 */
export async function checkUniqueness(
  table: string,
  field: string,
  value: string | number
): Promise<string | null> {
  const result = await (prisma as any)[table].findUnique({
    where: { [field]: value },
  });
  
  if (result) {
    return `A record with this ${field} already exists`;
  }
  return null;
}

/**
 * Validate composite unique constraint
 * Returns error message if duplicate found, null if ok
 */
export async function checkCompositeUniqueness(
  table: string,
  where: Record<string, any>
): Promise<string | null> {
  const result = await (prisma as any)[table].findUnique({
    where,
  });
  
  if (result) {
    return `A record with these values already exists`;
  }
  return null;
}
