// Server Actions for User Registration
// "use server";

import { redirect } from 'next/navigation';
// import { prisma } from '@/lib/prisma';
// import bcrypt from 'bcrypt'; // or your preferred hashing library

export async function registerUser(formData: FormData) {
    // 1. Extract data (name, email, password) from formData

    // 2. Validate inputs (ensure email is unique, password strength, etc.)

    try {
        // 3. Check if user already exists in DB
        //    const existingUser = await prisma.user.findUnique(...)

        // 4. If exists, return error ("User already exists")

        // 5. Hash the password
        //    const hashedPassword = await bcrypt.hash(password, 10);

        // 6. Create the new user in the database
        //    await prisma.user.create({
        //      data: { ... }
        //    })

        // 7. Redirect to Login Page
        //    redirect('/login');

    } catch (error) {
        // 8. Handle DB errors
        return { message: 'Registration Failed' };
    }
}
