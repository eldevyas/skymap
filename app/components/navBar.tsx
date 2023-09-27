"use client";

import React from 'react'
import Link from 'next/link';
import Image from "next/image";

import {
    Airplane,
    Flash,
    Lock,
    Login,
    LoginCurve,
    Moon,
    Sun1,
} from "iconsax-react";

import { useTheme } from "next-themes";
export const ThemeToggle = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <button
            id="theme-toggle"
            type="button"
            title="Toggle Theme"
            onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
            }
            className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-200 text-slate-900 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
            <Sun1
                id="theme-toggle-dark-icon"
                className="hidden h-5 w-5 dark:block"
                variant="Bulk"
            />
            <Moon
                id="theme-toggle-light-icon"
                className="block h-5 w-5 dark:hidden"
                variant="Bulk"
            />
        </button>
    );
};


export default function NavBar() {
    return (
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
                    <ThemeToggle />

                    <Link href="/auth/sign-up" className="flex items-center">
                        <button
                            type="button"
                            className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-200 text-slate-900 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                        >
                            <LoginCurve variant="Bulk" color="currentColor" />
                            <span className="hidden text-sm font-semibold md:block">
                                Sign up
                            </span>
                        </button>
                    </Link>
                    <Link href="/auth/sign-in" className="flex items-center">
                        <button
                            type="button"
                            className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-800 text-slate-200 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-sky-600 dark:hover:bg-sky-700 dark:text-text-sky-200"
                        >
                            <Lock variant="Bulk" color="currentColor" />
                            <span className="hidden text-sm font-semibold md:block">
                                Sign in
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
