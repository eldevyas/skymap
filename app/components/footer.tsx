import React from 'react'

export default function Footer() {
    return (
        <footer className="w-full mx-auto max-w-7xl relative bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 flex flex-row flex-wrap md:flex-row items-center justify-between p-10 border border-gray-300 outline-none dark:border-gray-600">
            <div className="mx-auto flex flex-col lg:flex-row gap-2 md:order-2 lg:items-baseline justify-center items-center lg:justify-center text-center">
                <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white sm:text-lg">
                    SkyMap
                </span>
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Developer Credits to{" "}
                    <a
                        href="https://www.github.com/eldevyas/SkyMap"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:underline"
                    >
                        YASSINE CHETTOUCH
                    </a>{" "}
                    for the SkyMap Project, a Dashboard experiment to visualize Weather Data.
                </span>
            </div>
        </footer>
    );
}
