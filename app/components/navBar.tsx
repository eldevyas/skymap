"use client";

import React, { useEffect, useState } from 'react'
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
        <nav className="w-full mx-auto max-w-7xl relative bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 flex flex-row flex-wrap md:flex-row items-center justify-between p-10 border border-gray-300 outline-none dark:border-gray-600 z-50">
            <Link href="/" className="flex items-center">
                <Image
                    src="/svg/logo.svg"
                    width={50}
                    height={50}
                    className="mr-3"
                    alt="Logo"
                />
                <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-lg hidden sm:block">
                    SkyMap
                </span>
            </Link>
            <div className="flex gap-2 md:order-2 md:mt-0 ">
                <ThemeDropdown />
                <Link href="/auth/sign-up" className="flex items-center">
                    <button
                        type="button"
                        className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-gray-200 text-gray-900 px-3.5 py-2.5 text-sm font-semibold hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
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
                        className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-gray-800 text-gray-200 px-3.5 py-2.5 text-sm font-semibold hover:bg-gray-900 dark:bg-red-600 dark:hover:bg-red-700 dark:text-text-red-200"
                    >
                        <Lock variant="Bulk" color="currentColor" />
                        <span className="hidden text-sm font-semibold md:block">
                            Sign in
                        </span>
                    </button>
                </Link>
            </div>
        </nav>
    )
}

function ThemeDropdown() {
    const { theme, setTheme } = useTheme();
    const [ThemeState, setThemeState] = useState<string>("");

    useEffect(
        () => {
            if (theme === "light") {
                setThemeState("light");
            } else if (theme === "dark") {
                setThemeState("dark");
            } else if (theme === "system") {
                setThemeState("system");
            }
        }, [theme]
    )

    const themeButton = (themeName: any, icon: any, label: any, close: any) => (
        <button
            type="button"
            onClick={() => { setTheme(themeName); close() }}
            className={`
        inline-flex justify-start items-baseline gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold
        hover:bg-red-600 dark:hover:bg-red-600 hover:text-white ${ThemeState === themeName ? 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-50' : 'dark:bg-none dark:text-gray-200 dark:hover:text-white dark:hover:bg-red-600'}
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
          inline-flex justify-center items-center gap-2 rounded-xl bg-gray-200 text-gray-900
          px-3.5 py-2.5 text-sm font-semibold hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600
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
                    className={`absolute mt-1 max-h-60 top-full w-auto max-w-sm overflow-auto text-base sm:text-sm z-50 p-2 gap-1 origin-top-right bg-gray-50 rounded-xl shadow-2xl
        focus:outline-none dark:bg-gray-900 dark:divide-gray-700 flex flex-col
        sm:right-auto sm:left-0 border border-gray-300 dark:border-gray-600`}
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
