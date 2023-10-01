import React, { useContext, useEffect, useState } from 'react';
import { Location } from "iconsax-react";
import AppContext from '@/app/context';
import Image from "next/image";

const CityMarker = ({ cityName, lat, lng }: { cityName: string, lat: number, lng: number }) => {
    return (
        <div
            className='w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-400'
        >
            {cityName}
        </div>
    )
};


export default function WeatherOverview() {
    const { values, functions, handlers, utilities } = useContext(AppContext);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative h-auto bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 flex flex-col gap-4 p-10 overflow-hidden border border-slate-300 dark:border-slate-600">
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
                                <p
                                    className='text-sm tracking-tight flex gap-2'
                                >
                                    <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-700/10
                                dark:bg-amber-900 dark:text-amber-300 dark:ring-amber-300/10">
                                        {values.selectedCity?.latitude}, {values.selectedCity?.longitude}
                                    </span>
                                </p>
                                <h1
                                    className='text-4xl tracking-tight flex gap-0 justify-start items-center'
                                >
                                    <span
                                        className='text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                                    >
                                        <Image
                                            // src={`/weather/${values.weatherData?.current.weather[0].icon}.png`}
                                            src={`https://openweathermap.org/img/wn/${values.weatherData?.current.weather[0].icon}@2x.png`}
                                            width={100}
                                            height={100}
                                            alt={values.weatherData?.current.weather[0].description || "Weather Icon"}
                                        />
                                    </span>
                                    <span
                                        className='font-bold'
                                    >
                                        {values.weatherData?.current.main.temp.toFixed(0)}°C
                                    </span>
                                </h1>
                                <p
                                    className='text-sm tracking-tight flex gap-2 capitalize
                                        dark:text-slate-400 text-slate-400 font-bold sm:text-md
                                        '
                                >
                                    Feels like {values.weatherData?.current.main.feels_like.toFixed(0)}°C. {values.weatherData?.current.weather[0].description}.
                                </p>
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
                <div className="relative border border-dashed rounded-3xl  border-slate-300 dark:border-slate-600 h-full overflow-hidden min-h-[200px]">
                    <iframe
                        name={
                            `Map of ${values.selectedCity?.mainText + ", " + values.selectedCity?.secondaryText}.`
                        } title={
                            `Map of ${values.selectedCity?.mainText + ", " + values.selectedCity?.secondaryText}.`
                        }
                        className="absolute inset-0 border-0 z-0 filter invert-[100%] grayscale-[100%]"
                        width="100%"
                        height="100%"
                        allowFullScreen={false}
                        src={
                            `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4"}&center=${values.selectedCity?.latitude},${values.selectedCity?.longitude}&q=${values.selectedCity.mainText + ", " + values.selectedCity.secondaryText}&zoom=11`
                        }
                    />
                </div>
            </div>
        </>
    )
}