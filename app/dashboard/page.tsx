import { HomeIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { LoginCurve } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import Colors from "tailwindcss/colors"
import NavBar from '../components/navBar'
import Footer from '../components/footer'

export default function Dashboard() {
    return (
        <div className="bg-slate-100 dark:bg-slate-900 h-full min-h-screen w-full">
            {/* NavBar  */}
            <NavBar />

            <main className="
                mx-auto max-w-7xl
                py-0 sm:px-6 sm:py-4 lg:px-8
                h-full"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div
                        className="border border-dashed border-slate-300 sm:rounded-3xl  dark:border-slate-600 h-32 md:h-64"
                    ></div>
                    <div
                        className="border border-dashed sm:rounded-3xl  border-slate-300 dark:border-slate-600 h-32 md:h-64"
                    ></div>
                    <div
                        className="border border-dashed sm:rounded-3xl  border-slate-300 dark:border-slate-600 h-32 md:h-64"
                    ></div>
                    <div
                        className="border border-dashed sm:rounded-3xl  border-slate-300 dark:border-slate-600 h-32 md:h-64"
                    ></div>
                </div>
                <div
                    className="border border-dashed sm:rounded-3xl  border-slate-300 dark:border-slate-600 h-96 mb-4"
                ></div>
            </main>

            {/* Footer */}
            <Footer />
        </div >
    )
}
