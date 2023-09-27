import React from 'react'

export default function Footer() {
    return (
        <footer className="mx-auto max-w-7xl py-0 sm:px-6 sm:py-4 lg:px-8 h-full">
            <div className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-800 px-6 py-16 shadow-none sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-6 flex items-center justify-center p-10">
                <div className="flex gap-2 md:order-2 items-baseline justify-center">
                    <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                        SkyMap
                    </span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        Developer Credits to{" "}
                        <a
                            href="https://www.github.com/eldevyas/SkyMap" target="_blank" rel="noopener noreferrer"
                            className="text-sky-600 dark:text-sky-500 hover:text-sky-700 dark:hover:text-sky-400 hover:underline"
                        >
                            YASSINE CHETTOUCH
                        </a>
                        {" "}for the SkyMap Project, a Quick Dashboard experiment to visualize Weather Data.
                    </span>
                </div>
            </div>
        </footer >
    )
}
