"use client";

import React from 'react'
import SearchCity from './interface/searchCity';
import WeatherOverview from './interface/weatherOverview';
import ChartsVisualization from './interface/chartsVisualization';

export default function MainDashboard() {
    return (
        <>
            <div
                className="mx-auto relative flex flex-col gap-4"
            >
                <SearchCity />
                <WeatherOverview />
                {/* <ChartsVisualization /> */}
            </div>
        </>
    )
}


