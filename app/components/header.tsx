import React from 'react'
import Link from "next/link";
import { ArrowRight3, Element } from 'iconsax-react'
import Colors from "tailwindcss/colors";
import Image from 'next/image';
import HeroImage from "public/images/hero.jpg";

export default function Header() {
    return (
        <div className="mx-auto w-full max-w-7xl h-auto relative overflow-hidden lg:flex lg:gap-x-20 flex flex-row justify-between items-center gap-10 flex-wrap">
            <div className="mx-auto max-w-lg text-left lg:mx-0 lg:flex-auto lg:py-32 relative z-30">
                <Link href="/dashboard" className="inline-flex w-full sm:w-auto justify-between items-center p-1.5 pr-4 mb-7 text-sm text-slate-700 bg-slate-50 rounded-3xl dark:bg-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 select-none" role="alert">
                    <span className="text-xs bg-amber-500 rounded-xl text-white px-3 py-1.5 mr-3">New</span>
                    <span className="text-sm font-medium">
                        {/* Authentication is now Functional */}
                        SkyMap is now functional!
                    </span>
                    <ArrowRight3
                        className="h-4 w-4 text-slate-700 dark:text-white ml-3"
                        color='currentColor'
                    />
                </Link>
                <h2 className="relative text-amber-500 dark:text-amber-500 sm:text-4xl text-shadow-lg z-30 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                    Stay Ahead with <span
                        className="text-slate-800 dark:text-slate-200"
                    >SkyMap</span>.
                </h2>
                <p className="relative mt-6 text-lg font-normal leading-8 text-slate-600 dark:text-slate-400 text-shadow-lg z-30">
                    Empower yourself with real-time weather insights. Effortlessly access forecasts, interactive charts, and more.
                </p>

                {/* CTA */}
                <div className="relative mt-10 flex gap-6">
                    <Link href="/dashboard" className="flex items-center">
                        <button
                            type="button"
                            className="inline-flex w-full sm:w-auto text-center justify-center items-center gap-2 rounded-xl bg-amber-500 dark:bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-amber-50 dark:text-slate-800 hover:bg-amber-600 dark:hover:bg-slate-200"
                        >
                            <Element
                                className="h-6 w-6 text-amber-100 dark:text-slate-600"
                                variant='Bulk'
                                color='currentColor'
                            />
                            <span className="text-sm font-semibold">
                                Get Started
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Image */}
            <div className="relative mx-auto max-w-lg lg:mx-0 lg:flex-1 min-h-[26rem] rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 w-full min-w-[250px] h-full">
                <Image
                    className="object-cover object-center"
                    src={HeroImage}
                    placeholder="blur"
                    alt="SkyMap"
                    fill
                />
            </div>
        </div>
    )
}
