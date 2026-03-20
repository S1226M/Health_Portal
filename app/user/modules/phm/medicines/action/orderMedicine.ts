"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function orderMedicine(data: {
    medicineId: number;
    quantity: number;
    paymentTypeId: number;
    address: string;
    city: string;
    phoneNumber: string;
    totalAmount: number;
    paymentMethod: string;
}) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return { success: false, message: "Unauthorized. Please login." };
        }

        const decoded = verifyToken(token) as { UserID?: number };
        const currentUserId = decoded?.UserID;

        if (!currentUserId) {
            return { success: false, message: "Invalid token." };
        }

        if (data.quantity < 1) {
            return { success: false, message: "Quantity must be at least 1." };
        }

        // Verify the medicine exists
        const medicine = await prisma.phm_medicine.findUnique({
            where: { MedicineID: data.medicineId },
        });

        if (!medicine) {
            return { success: false, message: "Medicine not found." };
        }

        // Create the order
        const order = await prisma.phm_orderofmedicine.create({
            data: {
                MedicineID: data.medicineId,
                MedicineOrderPaymentTypeID: data.paymentTypeId,
                Quantity: data.quantity,
                Address: data.address,
                City: data.city,
                PhoneNumber: data.phoneNumber,
                TotalAmount: data.totalAmount,
                PaymentMethod: data.paymentMethod,
                OrderDateTime: new Date(),
                CreatedByUserID: currentUserId,
                Created: new Date(),
                Modified: new Date(),
            },
        });

        return { success: true, message: "Order placed successfully!", orderId: order.OrderOfMedicineID };
    } catch (error: any) {
        console.error("Error placing order:", error);
        return { success: false, message: "Failed to place order. Please try again." };
    }
}
