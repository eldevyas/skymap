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
            <div className="mx-auto w-full max-w-7xl p-10 h-auto relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-3xl lg:flex lg:gap-x-20 border border-gray-300 outline-none dark:border-gray-600 flex flex-row justify-center items-center gap-4 flex-wrap">
                {/* Image Background */}
                <div
                    className='absolute backdrop-blur-sm inset-0 w-full h-full bg-[url("/images/hero.jpg")] bg-center bg-cover -z-0'
                >
                    <div className="absolute inset-0 bg-gradient-radial from-gray-900 to-gray-600 opacity-25 bg-center bg-cover bg-no-repeat mix-blend-darken" aria-hidden="true" />
                </div>


                <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 z-20 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
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

                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 relative z-30">
                    {/* Middle Overlay to Increase Text Contrast */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 w-full h-full bg-gradient-to-b from-gray-900 to-gray-600 opacity-30 mix-blend-darken rounded-full blur-3xl z-0" aria-hidden="true" />

                    <h2 className="relative text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl text-shadow-lg z-30">
                        Stay Ahead with SkyMap.
                    </h2>
                    <p className="relative mt-6 text-lg leading-8 text-gray-200 text-shadow-lg z-30">
                        Empower yourself with real-time weather insights. Effortlessly access forecasts, interactive charts, and more.
                    </p>


                    {/* CTA */}

                    <div className="relative mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/dashboard" className="flex items-center">
                            <button
                                type="button"
                                className="inline-flex shadow-2xl w-full sm:w-auto text-center justify-center items-center gap-2 rounded-xl bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100"
                            >
                                <PresentationChartBarIcon
                                    className="h-6 w-6 dark:text-gray-600"
                                    aria-hidden="true"
                                />
                                <span className="text-sm font-semibold">
                                    Get Started
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <div className="relative flex-1 h-96 min-w-[16rem]">
                    <Image
                        className="relative w-full rounded-xl bg-white/5 ring-1 ring-white/10 h-96"
                        src="/images/hero.jpg"
                        alt="App Screenshot"
                        fill
                        objectFit='cover'
                        objectPosition='center'
                    />
                </div> */}
            </div>
        </React.Fragment>
    )
}
