"use client"; // Error components must be Client Components

import { useEffect } from "react";
import React from "react";
import {
    BackSquare,
    BoxRemove,
    Home,
    InfoCircle,
    Refresh2,
} from "iconsax-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import colors from "tailwindcss/colors";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    const handleClearRedux = () => {
        // Reset the error
        reset();
    };

    return (
        <main className="grid min-h-full place-items-center w-full px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center max-w-xs md:max-w-xl">
                <p className="text-base font-semibold text-sky-600">500</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                    Something went wrong!
                </h1>
                {/* <hr className="w-48 h-1 mx-auto my-2 bg-gray-500 border-0 rounded md:my-10 dark:bg-zinc-300/25" /> */}
                <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                    Please try again later. If the problem persists, please
                    contact us.
                </p>
                <div className="relative mt-6 bg-zinc-50 dark:bg-zinc-950 rounded-md p-4 w-full border overflow-hidden  border-zinc-300 dark:border-zinc-700">
                    <code
                        className="text-sm leading-7 font-mono text-zinc-900 dark:text-zinc-100 w-full
                    overflow-ellipsis whitespace-prewrap break-words
                    "
                    >
                        <span className="text-rose-500">{error.name}:</span>{" "}
                        {error.message}
                        {"."}
                    </code>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                    <Link
                        href="/"
                        className="flex-1 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-sky-600 hover:bg-sky-800"
                    >
                        <span className="mr-2 text-md font-semibold whitespace-nowrap">
                            Go back home
                        </span>
                        <Home variant="Bulk" color="currentColor" />
                    </Link>
                    <div
                        onClick={() => {
                            reset();
                        }}
                        className="flex-1 md:mt-0 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg text-sky-800 bg-sky-600/25 hover:bg-sky-600/50 dark:text-sky-300 dark:bg-sky-600/50 dark:hover:bg-sky-600/75"
                    >
                        <span className="mr-2 text-md font-semibold">
                            Retry
                        </span>
                        <BackSquare variant="Bulk" color="currentColor" />
                    </div>
                    <div
                        onClick={() => handleClearRedux()}
                        className="flex-1 md:mt-0 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg text-sky-800 bg-sky-600/25 hover:bg-sky-600/50 dark:text-sky-300 dark:bg-sky-600/50 dark:hover:bg-sky-600/75"
                    >
                        <span className="mr-2 text-md font-semibold">
                            Clear Data
                        </span>
                        <BoxRemove variant="Bulk" color="currentColor" />
                    </div>
                </div>
            </div>
        </main>
    );
}