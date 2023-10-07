"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from "next/image";

import {
    Airplane,
    ColorSwatch,
    Element,
    Flash,
    Lock,
    Login,
    LoginCurve,
    Logout,
    Moon,
    Setting,
    Sun,
    Sun1,
    User,
} from "iconsax-react";

import { useTheme } from "next-themes";
import { Menu, Transition } from '@headlessui/react';
import { signOut, useSession } from "next-auth/react"


export default function NavBar() {
    const { data: session, status } = useSession();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (status && status !== "loading") {
            setLoading(false);
        }
    }, [status])

    return (
        <nav className="w-full mx-auto max-w-7xl relative bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 flex flex-row flex-wrap md:flex-row items-center justify-between p-10 border border-slate-300 outline-none dark:border-slate-600 z-50">
            <Link href="/" className="flex items-center">
                <Image
                    src="/svg/logo.svg"
                    width={50}
                    height={50}
                    className="mr-3"
                    alt="Logo"
                />
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg hidden sm:block">
                    SkyMap
                </span>
            </Link>
            <div className="flex gap-2 md:order-2">
                <ThemeDropdown />
                {
                    isLoading ? null : (status === "authenticated" ? (
                        <UserDropdown />
                    ) : (
                        <React.Fragment>
                            <Link href="/auth/sign-up" className="flex items-center">
                                <button
                                    type="button"
                                    className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-200 text-slate-900 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-600"
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
                                    className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-slate-800 text-slate-200 px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-900 dark:bg-red-600 dark:hover:bg-red-700 dark:text-text-red-200"
                                >
                                    <Lock variant="Bulk" color="currentColor" />
                                    <span className="hidden text-sm font-semibold md:block">
                                        Sign in
                                    </span>
                                </button>
                            </Link>
                        </React.Fragment>

                    ))
                }
            </div>
        </nav>
    )
}

function UserDropdown() {
    const { data: session, status } = useSession()
    const [isLoading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<{
        id: string | number, // The unique identifier of the user.
        name: string, // The user's name.
        email: string, // The user's email address.
        image: string | undefined | null, // The user's avatar image URL.
    } | null>(null);

    useEffect(() => {
        if (status && status !== "loading") {
            setLoading(false);
        }
    }, [status])

    return (
        <React.Fragment>
            {
                isLoading ? null : ((
                    <Menu as="div" className="z-50 relative inline-block text-left gap-4">
                        <Menu.Button
                            className={`inline-flex h-full justify-center items-center gap-2 rounded-xl text-slate-900 px-3.5 py-2.5 text-sm font-semibold dark:text-white relative aspect-square bg-gradient-to-br from-red-600 to-sky-600 hover:from-red-700 hover:to-sky-700 overflow-hidden`}
                        >
                            {
                                session?.user?.image ?
                                    (
                                        <Image
                                            src={session?.user?.image || "/images/default.jpg"}
                                            alt="Profile"
                                            fill
                                        />
                                    ) : (
                                        null
                                    )
                            }
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
                                className={`absolute mt-1 max-h-60 top-full w-auto max-w-sm overflow-auto text-base sm:text-sm z-50 p-2 gap-1 origin-top-right bg-slate-50 rounded-xl shadow-2xl focus:outline-none dark:bg-slate-900 dark:divide-slate-700 flex flex-col right-0 border border-slate-300 dark:border-slate-600`}>
                                {/* User Name and Email */}
                                <Menu.Item>
                                    {({ active, close }) => (
                                        <div className="flex flex-row flex-wrap gap-2 mb-4 px-3.5 py-2.5">
                                            <div
                                                className={`inline-flex h-full justify-center items-center gap-2 rounded-xl text-slate-900 px-3.5 py-2.5 text-sm font-semibold dark:text-white relative aspect-square bg-gradient-to-br from-red-600 to-sky-600 hover:from-red-700 hover:to-sky-700 overflow-hidden`}
                                            >
                                                {
                                                    session?.user?.image ?
                                                        (
                                                            <Image
                                                                src={session?.user?.image || "/images/default.jpg"}
                                                                alt="Profile"
                                                                fill
                                                            />
                                                        ) : (
                                                            null
                                                        )
                                                }
                                            </div>
                                            <div
                                                className="relative flex flex-col gap-1 min-w-fit">
                                                <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">{session?.user?.name}</span>
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{session?.user?.email}</span>
                                            </div>
                                        </div>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active, close }) => (
                                        <Link href="/auth/sign-out" className="flex items-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    signOut({ redirect: false });
                                                    close();
                                                }}
                                                className={`inline-flex justify-start items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold bg-red-100 dark:bg-red-950 hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:text-slate-50 dark:hover:text-white w-full min-h-fit min-w-max`}
                                            >
                                                <Logout
                                                    className={`h-5 w-5 ${active ? 'text-white dark:text-white' : 'text-red-600 dark:text-red-400'}`}
                                                    variant="Bulk"
                                                    color="currentColor"
                                                // size={20}
                                                />
                                                <span className="ml-2 text-sm font-medium">Sign out</span>
                                            </button>
                                        </Link>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                ))
            }
        </React.Fragment>
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
                                                hover:bg-red-600 dark:hover:bg-red-600 hover:text-white ${ThemeState === themeName ? 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-50' : 'dark:bg-none dark:text-slate-200 dark:hover:text-white dark:hover:bg-red-600'}
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
          px-3.5 py-2.5 text-sm font-semibold hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-600
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
                    className={`absolute mt-1 max-h-60 top-full w-auto max-w-sm overflow-auto text-base sm:text-sm z-50 p-2 gap-1 origin-top-right bg-slate-50 rounded-xl shadow-2xl
        focus:outline-none dark:bg-slate-900 dark:divide-slate-700 flex flex-col
        sm:right-auto sm:left-0 border border-slate-300 dark:border-slate-600`}
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
