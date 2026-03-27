import { prisma } from './lib/prisma';

async function main() { 
    try {
        console.log("Attempting to drop constraint 'CK_HOP_Appointment_Status'...");
        await prisma.$executeRawUnsafe(`ALTER TABLE hop_appointment DROP CHECK CK_HOP_Appointment_Status;`); 
        console.log('Dropped!'); 
    } catch (e: any) {
        console.error("Error:", e.message);
        console.error("If the constraint doesn't exist, this is fine.");
    } finally {
        await prisma.$disconnect();
    }
} 

main();
