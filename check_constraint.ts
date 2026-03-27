import { prisma } from './lib/prisma';

async function main() { 
    try {
        const result: any[] = await prisma.$queryRawUnsafe(`SHOW CREATE TABLE hop_appointment;`);
        console.log("Table creation script:");
        console.log(result[0]['Create Table']);
    } catch (e: any) {
        console.error("Error:", e.message);
    } finally {
        await prisma.$disconnect();
    }
} 

main();
