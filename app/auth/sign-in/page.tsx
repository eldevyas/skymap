import { getServerSession } from 'next-auth'
import React from 'react'
import LoginPage from './interface/Login';
import { redirect } from 'next/navigation';

export default async function SignIn() {
    const session = await getServerSession();

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return redirect('/dashboard');
    }

    return (
        <LoginPage />
    )
}
