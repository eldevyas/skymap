"use client";

import React from 'react'
import SearchBar from './interface/search';
import WeatherOverview from './interface/weatherOverview';

export default function MainDashboard() {
    return (
        <>
            <div
                className="mx-auto relative flex flex-col gap-4"
            >
                <SearchBar />
                <WeatherOverview />
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative h-96 bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 flex flex-col items-center justify-center p-10 overflow-hidden"></div>
                    <div className="border border-dashed rounded-3xl  border-slate-300 dark:border-slate-600 h-96"></div>
                </div>
                <div className="border border-dashed rounded-3xl  border-slate-300 dark:border-slate-600 h-96"></div> */}
            </div>
        </>
    )
}


