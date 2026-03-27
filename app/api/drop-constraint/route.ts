import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Attempting to drop constraint 'CK_HOP_Appointment_Status'...");
    
    // Check constraints first (optional, but good for debugging)
    const constraints: any[] = await prisma.$queryRawUnsafe(`
      SELECT CONSTRAINT_NAME 
      FROM information_schema.table_constraints 
      WHERE table_name = 'hop_appointment' AND constraint_type = 'CHECK';
    `);
    console.log("Existing constraints:", constraints);

    // Drop the constraint
    await prisma.$executeRawUnsafe(`ALTER TABLE hop_appointment DROP CHECK CK_HOP_Appointment_Status;`);
    
    console.log("Constraint dropped successfully!");
    return NextResponse.json({ success: true, message: "Constraint dropped successfully!", constraints });
  } catch (error: any) {
    console.error("Failed to drop constraint:", error.message);
    
    // If it fails because it doesn't exist, we can still catch that
    if (error.message.includes("Check constraint") && error.message.includes("doesn't exist")) {
      return NextResponse.json({ success: true, message: "Constraint already dropped or doesn't exist." });
    }
    
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
