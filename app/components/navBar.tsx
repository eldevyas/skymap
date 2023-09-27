"use client";

import React from 'react'
import Link from 'next/link';
import Image from "next/image";

import {
    Airplane,
    ColorSwatch,
    Flash,
    Lock,
    Login,
    LoginCurve,
    Moon,
    Setting,
    Sun,
    Sun1,
} from "iconsax-react";

import { useTheme } from "next-themes";
import { Menu, Transition } from '@headlessui/react';


export default function NavBar() {
    return (
        <nav className="mx-auto max-w-7xl py-4 sm:px-6 sm:py-4 px-8">
            <div className="relative bg-slate-50 dark:bg-slate-800 px-6 py-16 shadow-none rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-6 flex flex-col md:flex-row items-center justify-between p-10">
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
                <div className="flex gap-2 md:order-2 mt-4 md:mt-0">
                    <ThemeDropdown />
                    <Link href="/auth/sign-up" className="flex items-center">
                        <button
                            type="button"
                            className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-200 text-slate-900 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
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
                            className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-800 text-slate-200 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-900 dark:bg-sky-600 dark:hover:bg-sky-700 dark:text-text-sky-200"
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

function ThemeDropdown() {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    const themeButton = (themeName: any, icon: any, label: any, close: any) => (
        <button
            type="button"
            onClick={() => { setTheme(themeName); close() }}
            className={`
        inline-flex justify-center items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold
        hover:bg-sky-600 dark:hover:bg-sky-600 hover:text-white ${currentTheme === themeName ? 'bg-sky-600 text-white' : 'dark:bg-none dark:text-slate-200 dark:hover:text-white dark:hover:bg-sky-600'}
      `}
        >
            <span className="flex items-center">
                {icon}
                <span className="ml-2 text-sm font-medium">{label}</span>
            </span>
        </button>
    );

    return (
        <Menu as="div" className="z-50 relative inline-block text-left">
            <Menu.Button
                className={`
          inline-flex justify-center items-center gap-2 rounded-xl bg-slate-200 text-slate-900
          px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600
        `}
            >
                <ColorSwatch variant="Bulk" color="currentColor" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items
                    className="absolute right-0 w-56 mt-2 p-2 gap-1 origin-top-right bg-white rounded-xl shadow-2xl
        focus:outline-none dark:bg-slate-700 dark:divide-gray-700 flex flex-col"
                >
                    <Menu.Item>
                        {({ close }) => themeButton("light", <Sun1 className="h-5 w-5" variant="Bulk" color="currentColor" />, "Light", close)}
                    </Menu.Item>
                    <Menu.Item>
                        {({ close }) => themeButton("dark", <Moon className="h-5 w-5" variant="Bulk" color="currentColor" />, "Dark", close)}
                    </Menu.Item>
                    <Menu.Item>
                        {({ close }) => themeButton("system", <Setting className="h-5 w-5" variant="Bulk" color="currentColor" />, "System", close)}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

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
            className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-200 text-slate-900 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
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
