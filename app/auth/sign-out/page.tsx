import React from 'react'
import { Session, getServerSession } from 'next-auth';
import Link from 'next/link';
import { BackSquare, Home } from 'iconsax-react';
import { redirect } from 'next/navigation';

export default async function LogoutPage() {
    // Responsible for logging out
    const session = await getServerSession();

    if (!session) {
        return redirect('/auth/sign-in');
    }

    return (
        <main className="grid min-h-full place-items-center w-full px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center max-w-xs md:max-w-xl">
                <p className="text-base font-semibold text-red-600">500</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                    You have been logged out!
                </h1>
                <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">
                    This page will redirect you to the home page in 5 seconds.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href="/"
                        className="flex-1 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-3xl bg-red-600 hover:bg-red-800"
                    >
                        <span className="mr-2 text-md font-semibold whitespace-nowrap">
                        </span>
                        <Home variant="Bulk" color="currentColor" />
                    </Link>
                    <Link
                        type="button"
                        href=''
                        className="flex-1 md:mt-0 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-3xl text-red-800 bg-red-600/25 hover:bg-red-600/50 dark:text-red-300 dark:bg-red-600/50 dark:hover:bg-red-600/75 cursor-pointer"
                    >
                        <span className="mr-2 text-md font-semibold">
                        </span>
                        <BackSquare variant="Bulk" color="currentColor" />
                    </Link>
                </div>
            </div>
        </main>
    )
}
