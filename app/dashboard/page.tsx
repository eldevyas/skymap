import { HomeIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { LoginCurve } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import Colors from "tailwindcss/colors"

export default function Dashboard() {
    return (
        <div className="bg-slate-100 dark:bg-slate-900 h-full min-h-screen w-full">
            {/* NavBar  */}
            <nav className="mx-auto max-w-7xl py-0 sm:px-6 sm:py-4 lg:px-8 h-full">
                <div className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-800 px-6 py-16 shadow-none sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-6 flex items-center justify-between p-10">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/favicon.png"
                            width={50}
                            height={50}
                            className="mr-3"
                            alt="Logo"
                        />
                        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                            SkyMap
                        </span>
                    </Link>
                    <div className="flex gap-2 md:order-2">
                        <Link href="/auth/sign-in" className="flex items-center">
                            <button
                                type="button"
                                className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-900 dark:bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-slate-50 shadow-sm hover:bg-slate-950 dark:hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                <LoginCurve
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                                <span className="hidden text-sm font-semibold md:block">
                                    Sign In
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="
                mx-auto max-w-7xl
                py-8 sm:px-6 sm:py-8 lg:px-8
                h-full"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div
                        className="border border-dashed border-slate-300 rounded-lg dark:border-slate-600 h-32 md:h-64"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-32 md:h-64"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-32 md:h-64"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-32 md:h-64"
                    ></div>
                </div>
                <div
                    className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-96 mb-4"
                ></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-48 md:h-72"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-48 md:h-72"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-48 md:h-72"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-48 md:h-72"
                    ></div>
                </div>
                <div
                    className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-96 mb-4"
                ></div>
                <div className="grid grid-cols-2 gap-4">
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-48 md:h-72"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-48 md:h-72"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-48 md:h-72"
                    ></div>
                    <div
                        className="border border-dashed rounded-lg border-slate-300 dark:border-slate-600 h-48 md:h-72"
                    ></div>
                </div>
            </main>

            <footer className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8 h-full">
                <div className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-800 px-6 py-16 shadow-none sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-6 flex items-center justify-center p-10">
                    <div className="flex gap-2 md:order-2 items-baseline justify-center">
                        <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
                            SkyMap
                        </span>
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                            Developer Credits to <a
                                href="https://www.github.com/eldevyas/SkyMap" target="_blank" rel="noopener noreferrer"
                                className="text-sky-600 dark:text-sky-500 hover:text-sky-700 dark:hover:text-sky-400 hover:underline"

                            >YASSINE CHETTOUCH</a> for the SkyMap Project, a Quick Dashboard experiment to visualize Weather Data.
                        </span>
                    </div>
                </div>
            </footer >
        </div >
    )
}
