"use client"; // Error components must be Client Components

import { BackSquare, Home } from 'iconsax-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { authErrorCodes } from './errors/authErrors';


export default function AuthErrorPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const [count, setCount] = useState(0);

    const [ErrorInformation, setErrorInformation] = useState(
        {
            message: 'Unknown error',
            description: 'An unknown error occurred.',
        }
    )

    useEffect(() => {
        if (count === 10) {
            return router.back();
        }

        const interval = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [count, router])


    useEffect(() => {
        // The searchParams are available on the client side only.
        // The Error message is passed as a query parameter.
        // But the Error in the URL is only a string.
        // So we have to make it an Error object again.

        // If the error is not in the authErrorCodes object, then it is an unknown error.
        // If the error is in the authErrorCodes object, then it is a known error.

        const isKnownError = Object.keys(authErrorCodes).includes(error as string);

        if (isKnownError) {
            setErrorInformation(authErrorCodes[error as keyof typeof authErrorCodes]);
        } else {
            setErrorInformation(authErrorCodes.UNKNOWN_ERROR);
        }
    }, [error]);

    return (
        <main className="grid min-h-full place-items-center w-full px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center max-w-xs md:max-w-xl">
                <p className="text-base font-semibold text-red-600">500</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                    {ErrorInformation.message}
                </h1>
                {/* <hr className="w-48 h-1 mx-auto my-2 bg-slate-500 border-0 rounded md:my-10 dark:bg-slate-300/25" /> */}
                <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">
                    {ErrorInformation.description}
                </p>
                <div className="relative mt-6 bg-slate-50 dark:bg-slate-950 rounded-3xl p-4 w-full border overflow-hidden  border-slate-300 dark:border-slate-700">
                    <code
                        className="text-sm leading-7 font-mono text-slate-900 dark:text-slate-100 w-full
                    overflow-ellipsis whitespace-prewrap break-words
                    "
                    >
                        {/* <span className="text-red-500">{error.name}:</span>{" "}
                        {error.message}
                        {"."} */}

                        You will be redirected to the previous page in{" "}
                        <span className="text-red-500">
                            {10 - count} seconds
                        </span>.
                    </code>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href="/"
                        className="flex-1 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-3xl bg-red-600 hover:bg-red-800"
                    >
                        <span className="mr-2 text-md font-semibold whitespace-nowrap">
                            Go back home
                        </span>
                        <Home variant="Bulk" color="currentColor" />
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 md:mt-0 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-3xl text-red-800 bg-red-600/25 hover:bg-red-600/50 dark:text-red-300 dark:bg-red-600/50 dark:hover:bg-red-600/75 cursor-pointer"
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
