"use client"; // Error components must be Client Components

import { BackSquare, Home } from 'iconsax-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function LogoutInterface() {
    const router = useRouter();
    const {
        data: session,
        status
    } = useSession();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count === 3) {
            return router.back();
        }

        const interval = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [count, router])

    useEffect(() => {
        if (status === "authenticated") {
            signOut();
        }
    }, [status])

    return (
        <main className="grid min-h-full place-items-center w-full px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center max-w-xs md:max-w-xl">
                <p className="text-base font-semibold text-sky-600">
                    {/* Status Code */}
                    200
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                    You have been Logged Out!
                </h1>
                <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">
                    Thank you for using SkyMap.
                </p>
                <div className="relative mt-6 bg-slate-50 dark:bg-slate-950 rounded-3xl p-4 w-full border overflow-hidden  border-slate-300 dark:border-slate-700">
                    <code
                        className="text-sm leading-7 font-mono text-slate-900 dark:text-slate-100 w-full
                    overflow-ellipsis whitespace-prewrap break-words
                    "
                    >
                        You will be redirected to the previous page in{" "}
                        <span className="text-sky-500">
                            {3 - count} seconds
                        </span>.
                    </code>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href="/"
                        className="flex-1 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-3xl bg-sky-600 hover:bg-sky-800"
                    >
                        <span className="mr-2 text-md font-semibold whitespace-nowrap">
                            Go back home
                        </span>
                        <Home variant="Bulk" color="currentColor" />
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 md:mt-0 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-3xl text-sky-800 bg-sky-600/25 hover:bg-sky-600/50 dark:text-sky-300 dark:bg-sky-600/50 dark:hover:bg-sky-600/75 cursor-pointer"
                    >
                        <span className="mr-2 text-md font-semibold">
                            Go back
                        </span>
                        <BackSquare variant="Bulk" color="currentColor" />
                    </Link>
                </div>
            </div>
        </main>
    )
}
