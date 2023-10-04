"use client";

import {
    ArrowRight2,
    Home,
    PresentionChart,
} from "iconsax-react";
import Link from "next/link";
import MainDashboard from "./main";

export default function Dashboard() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-4 gap-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Dashboard
                </h1>
                <nav
                    className="flex px-5 py-3 text-slate-700 border border-slate-200 rounded-3xl bg-slate-50 dark:bg-slate-900 dark:border-slate-700 w-full sm:w-auto"
                    aria-label="Breadcrumb"
                >
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <div className="flex items-center">
                                <Home
                                    variant="Bulk"
                                    color={"currentColor"}
                                    className="w-6 h-6 mx-1 text-slate-400"
                                />
                                <Link
                                    href="/"
                                    className="ml-1 text-sm font-medium text-slate-700 hover:text-red-600 md:ml-2 dark:text-slate-400 dark:hover:text-white"
                                >
                                    Home
                                </Link>
                            </div>
                        </li>

                        <li className="inline-flex items-center">
                            {/* Arrow */}
                            <ArrowRight2
                                color={"currentColor"}
                                className="w-4 h-4 mx-1 text-slate-400"
                            />
                        </li>

                        <li>
                            <div className="flex items-center">
                                <PresentionChart
                                    variant="Bulk"
                                    color={"currentColor"}
                                    className="w-6 h-6 mx-1 text-slate-400"
                                />
                                <Link
                                    href="/dashboard"
                                    className="ml-1 text-sm font-medium text-slate-700 hover:text-red-600 md:ml-2 dark:text-slate-400 dark:hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <MainDashboard />
        </div>
    );
}
