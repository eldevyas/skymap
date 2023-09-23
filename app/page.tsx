import { HomeIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import Colors from "tailwindcss/colors"

export default function Home() {
    return (
        <div className="bg-white h-full min-h-screen w-full background">
            {/* NavBar  */}
            <nav className="mx-auto max-w-7xl py-0 sm:px-6 sm:py-4 lg:px-8 h-full">
                <div className="relative isolate overflow-hidden bg-white px-6 py-16 shadow-none sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-6 flex items-center justify-between p-10">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/favicon.png"
                            width={50}
                            height={50}
                            className="mr-3"
                            alt="Logo"
                        />
                        <span className="text-2xl font-bold tracking-tight text-gray-900 sm:text-lg">
                            SkyMap
                        </span>
                    </Link>
                    <div className="flex gap-2 md:order-2">
                        <Link href="/dashboard" className="flex items-center">
                            <button
                                type="button"
                                className="inline-flex text-center justify-center items-center gap-2 rounded-xl bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-gray-50 shadow-sm hover:bg-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                <RocketLaunchIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                                <span className="hidden text-sm font-semibold md:block">
                                    Get Started
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8 h-full">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-none sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                        <circle cx={512}
                            cy={512}
                            r={512}
                            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                            fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor={Colors.sky[50]} /> {/* sky color */}
                                <stop offset={1}
                                    stopColor={Colors.sky[400]} /> {/* Lighter sky color */} </radialGradient>
                        </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Stay Ahead with SkyMap.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Empower yourself with real-time weather insights. Effortlessly access forecasts, interactive charts, and more.
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <Link href="/dashboard" className="rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="relative mt-16 h-2/4 lg:mt-8">
                        <Image
                            className="absolute left-0 top-0 w-[57rem] max-w-none rounded-xl bg-white/5 ring-1 ring-white/10"
                            src="/screenshot.png"
                            alt="App Screenshot"
                            width={1824}
                            height={1080} />
                    </div>
                </div>
            </div>
            <footer className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8 h-full">
                <div className="relative isolate overflow-hidden bg-white px-6 py-16 shadow-none sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 lg:py-6 flex items-center justify-center p-10">
                    <div className="flex gap-2 md:order-2 items-baseline justify-center">

                        <span className="text-sm font-bold tracking-tight text-gray-900 sm:text-lg">
                            SkyMap
                        </span>
                        <span className="text-sm font-semibold text-gray-500">
                            Developer Credits to Yassine Chettouch for the SkyMap Project, a Quick Dashboard experiment to visualize Weather Data.
                        </span>
                    </div>
                </div>
            </footer>
        </div>

    )

}
