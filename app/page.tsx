"use client";

import { Menu } from '@headlessui/react'
import { PresentationChartBarIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import Colors from "tailwindcss/colors"
import NavBar from './components/navBar';
import Footer from './components/footer';
import React from 'react';

export default function Home() {
    return (
        <React.Fragment>
            <div className="mx-auto w-full max-w-7xl py-4 sm:py-4 h-auto relative overflow-hidden bg-gray-50 dark:bg-gray-900 px-6 pt-16 rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 border border-gray-300 outline-none dark:border-gray-600 flex flex-row justify-between items-center gap-4 flex-wrap">
                <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                    <circle cx={512}
                        cy={512}
                        r={512}
                        fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                        fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stopColor={Colors.white} />
                            <stop offset={1}
                                stopColor={Colors.gray[300]} />
                        </radialGradient>
                    </defs>
                </svg>

                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-50 sm:text-4xl">
                        Stay Ahead with SkyMap.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        Empower yourself with real-time weather insights. Effortlessly access forecasts, interactive charts, and more.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <Link href="/dashboard" className="flex items-center">
                            <button
                                type="button"
                                className="inline-flex w-full sm:w-auto text-center justify-center items-center gap-2 rounded-xl bg-red-600 dark:bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-50 dark:text-gray-800 shadow-sm hover:bg-red-700 dark:hover:bg-gray-100"
                            >
                                <PresentationChartBarIcon
                                    className="h-6 w-6 text-gray-300 dark:text-gray-600"
                                    aria-hidden="true"
                                />
                                <span className="text-sm font-semibold">
                                    Get Started
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="relative flex-1 h-96 min-w-[16rem]">
                    <Image
                        className="relative w-full rounded-xl bg-white/5 ring-1 ring-white/10 h-96"
                        src="/images/hero.jpg"
                        alt="App Screenshot"
                        fill
                        objectFit='cover'
                        objectPosition='center'
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
