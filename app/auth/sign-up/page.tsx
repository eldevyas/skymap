import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'
import RegisterationInterface from './interface/Register';

export default async function RegisterPage() {
    const session = await getServerSession();

    if (session) {
        return { redirect: { destination: "/" } };
    }

    return <RegisterationInterface />;
}
