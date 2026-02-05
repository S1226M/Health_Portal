"use server";

import { createToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export async function login(formData: FormData) {
    const Email = formData.get('Email') as string;
    const UserEnterdPass = formData.get('Password') as string;

    const data = await prisma.sec_user.findFirst({
        where:{
            Email
        },
        select:{
            RoleID: true,
            UserID: true,
            Password: true
        }
    })

    const role = await prisma.sec_role.findFirst({
        where:{
            RoleID: data?.RoleID
        },
        select:{
            RoleName: true
        }
    })

    if(UserEnterdPass === data?.Password){

        const token = createToken({
            UserID: data?.UserID,
            role: role?.RoleName
        });

        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        if(role?.RoleName === "Admin"){
            redirect('/admin');
        }
        else if(role?.RoleName === "Patient"){
            redirect('/user');
        }
        else{
            redirect('/login');
        }
    }
}