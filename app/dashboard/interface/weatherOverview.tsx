import React, { useContext } from 'react';
import { Location } from "iconsax-react";
import AppContext from '@/app/context';

export default function WaetherOverview() {
    const { values, functions, handlers, utilities } = useContext(AppContext);

    return (
        <div className='w-full h-auto relative bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:gap-x-20 lg:px-24 p-10 overflow-hidden flex flex-col gap-4 border border-slate-300 outline-none dark:border-slate-600'>
            {
                (values.isLoading) ? (
                    <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
                        <div className="flex items-center w-full space-x-2">
                            <div className="h-3.5 bg-slate-200 rounded-full dark:bg-slate-800 w-32 max-w-full"></div>
                            <div className="h-3.5 bg-slate-300 rounded-full dark:bg-slate-600 w-24 max-w-full"></div>
                        </div>
                        <div className="flex items-center w-full space-x-2 max-w-[480px]">
                            <div className="h-5 bg-slate-300 rounded-full dark:bg-slate-600 w-64 max-w-full"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div className='w-full relative flex flex-col gap-2'>
                        {/* City and user Location Overview */}
                        <p
                            className='flex items-center gap-2 text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                        >
                            {
                                new Date().toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                })
                            }, {
                                new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }.
                        </p>
                        <h1
                            className='text-lg font-bold tracking-tight text-slate-800 dark:text-slate-50 sm:text-xl'
                        >
                            {
                                values.selectedCity ? `${values.selectedCity?.mainText}, ${values.selectedCity?.secondaryText}.`
                                    : `No City is Selected. Please Search for a City.`
                            }
                        </h1>
                    </div>
                )

            }

            {/* Refresh Button */}
            <button
                type='button'
                className='flex items-center gap-2 text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                onClick={utilities.getUserLocation}
            >
                <Location
                    className='h-5 w-5'
                    color='currentColor'
                    variant='Bulk'
                />
                Set to My Location
            </button>
        </div>
    )
}

