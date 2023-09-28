"use client";

import { SearchNormal } from 'iconsax-react';
import React, { useEffect } from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

function WeatherAPI() {
    const [IPLocation, setIPLocation] = React.useState<{}>({});

    const options = {
        method: 'GET',
        url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
        params: { format: 'json' },
        headers: {
            'X-RapidAPI-Key': 'ed4bbb9748msh3b71255326ec4c8p18741fjsn5369b51539b6',
            'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
        }
    };

    useEffect(() => {

    }, []);


    return (
        <div className='w-full h-auto relative bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-3xl sm:px-16 lg:gap-x-20 lg:px-24 p-10 overflow-hidden'>
            {/* City and user Location Overview */}
            <p>
                <span className='text-lg font-bold tracking-tight text-slate-800 dark:text-slate-50 sm:text-xl'>
                    21°
                </span>
                <span className='text-lg font-bold tracking-tight text-slate-800 dark:text-slate-50 sm:text-xl'>
                    C
                </span>
            </p>
            <h1
                className='text-lg font-bold tracking-tight text-slate-800 dark:text-slate-50 sm:text-xl'
            >
                Rabat, Morocco.
            </h1>

        </div>
    )
}

export default function MainDashboard() {
    return (
        <>
            <div
                className="mx-auto relative flex flex-col gap-4"
            >
                <SearchBar />
                <WeatherAPI />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative h-96 bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 flex flex-col items-center justify-center p-10 overflow-hidden"></div>
                    <div className="border border-dashed rounded-3xl  border-slate-300 dark:border-slate-600 h-96"></div>
                </div>
                <div className="border border-dashed rounded-3xl  border-slate-300 dark:border-slate-600 h-96"></div>
            </div>
        </>
    )
}


function SearchBar() {
    return (
        <>
            {/* Search Bar */}
            <div
                className="mb-3 flex w-full items-center"
            >
                <label htmlFor="simple-search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-5">
                        <SearchNormal
                            className="h-5 w-5"
                            color="currentColor"
                            variant="TwoTone"
                        />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-3xl border border-slate-300 outline-none bg-slate-50 px-5 py-2.5 pl-14 text-sm text-slate-900 focus:border-sky-500 focus:ring-sky-500  dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-500"
                        placeholder="Search City..."
                        required
                    />
                    <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform rounded-3xl border border-slate-200 bg-slate-100/50 px-2 py-1 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                        ⌘ K
                    </kbd>
                </div>
                <button
                    type='button'
                    className="ml-2 rounded-3xl border border-sky-700 bg-sky-700 p-2.5 text-sm font-medium text-white hover:bg-sky-800 focus:outline-none dark:bg-sky-600 dark:hover:bg-sky-700"
                >
                    <SearchNormal
                        className="h-5 w-5"
                        color="currentColor"
                        variant="TwoTone"
                    />
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </>
    )
}

function FetchCityWeather() {
    return (
        <></>
    )
}