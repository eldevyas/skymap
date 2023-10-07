import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function RegisterPage() {
    const session = await getServerSession();

    if (session) {
        return { redirect: { destination: "/" } };
    }

    return (
        <div>RegisterPage</div>
    )
}
