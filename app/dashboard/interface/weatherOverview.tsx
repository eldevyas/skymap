import React, { useContext, useEffect, useState } from 'react';
import { CloudFog, Drop, Eye, Icon, Location, Map, Wind } from "iconsax-react";
import AppContext from '@/app/context';
import Image from "next/image";

const CityMarker = ({ cityName, lat, lng }: { cityName: string, lat: number, lng: number }) => {
    return (
        <div
            className='w-3 h-3 rounded-full bg-red-500 dark:bg-red-400'
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
                {
                    values.isLoading ? (
                        <React.Fragment>
                            <div className="relative animate-pulse h-auto bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 flex flex-col gap-4 p-10 overflow-hidden border border-slate-300 dark:border-slate-600">
                                <div
                                    className='flex flex-col gap-2'
                                >
                                    <div className="h-3 bg-slate-200 rounded-xl dark:bg-slate-700 w-60 max-w-full"></div>
                                    <div className="h-5 bg-slate-200 rounded-xl dark:bg-slate-700 w-64 max-w-full"></div>
                                </div>
                                <div className="h-3 bg-slate-200 rounded-xl dark:bg-slate-700 w-48 max-w-full"></div>
                                <div
                                    className='flex flex-row gap-2 justify-start items-end flex-wrap'
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <div
                                            className='h-10 w-10 bg-slate-200 rounded-full dark:bg-slate-700'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-row gap-2 justify-start items-end flex-wrap'
                                    >
                                        <div className="h-10 bg-slate-200 rounded-xl dark:bg-slate-700 w-32"></div>
                                        <div className="h-10 bg-slate-200 rounded-xl dark:bg-slate-700 w-16"></div>
                                    </div>
                                </div>
                                <div className="h-3 bg-slate-200 rounded-xl dark:bg-slate-700 w-60 max-w-full"></div>
                                <div
                                    className='flex flex-row gap-2 justify-start items-end flex-wrap'
                                >
                                    <div className="h-5 bg-slate-200 rounded-xl dark:bg-slate-700 w-5"></div>
                                    <div className="h-5 bg-slate-200 rounded-xl dark:bg-slate-700 w-32"></div>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className="relative h-auto bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 flex flex-col gap-4 p-10 overflow-hidden border border-slate-300 dark:border-slate-600">
                                <div className='w-full relative flex flex-col gap-4'>
                                    {/* City and user Location Overview */}
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <p
                                            className='flex items-center gap-2 text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                                        >
                                            {
                                                // new Date().toLocaleTimeString('en-US', {
                                                //     hour: 'numeric',
                                                //     minute: 'numeric',
                                                //     hour12: true
                                                // })
                                                new Date().toLocaleTimeString('en-US', {
                                                    timeZone: values.selectedCity.timeZone,
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true
                                                })
                                            }, {
                                                new Date().toLocaleDateString('en-US', {
                                                    timeZone: values.selectedCity.timeZone,
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
                                            {/* If the mainText and Secondary Text are both existant, we show them both, otherwise we only show the existant one. */}
                                            {values.selectedCity?.mainText && values.selectedCity?.secondaryText ? values.selectedCity?.mainText + ", " + values.selectedCity?.secondaryText : values.selectedCity?.mainText || values.selectedCity?.secondaryText}.
                                        </h1>
                                    </div>
                                    <p
                                        className='text-sm tracking-tight flex gap-2'
                                    >
                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10
                                dark:bg-red-900 dark:text-red-300 dark:ring-red-300/10">
                                            {values.selectedCity?.latitude}, {values.selectedCity?.longitude}
                                        </span>
                                    </p>
                                    <h1
                                        className='text-4xl tracking-tight flex gap-4 justify-start items-end'
                                    >
                                        <span
                                            className='text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md flex flex-col justify-start items-start gap-2'
                                        >
                                            <Image
                                                // src={`/weather/${values.weatherData?.current.weather[0].icon}.png`}
                                                src={`/weather/animated/${values.weatherData?.current.weather[0].icon}.svg`}
                                                width={100}
                                                height={100}
                                                alt={values.weatherData?.current.weather[0].description || "Weather Icon"}
                                                className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden'
                                            />
                                        </span>
                                        <span
                                            className='font-bold'
                                        >
                                            {values.weatherData?.current.main.temp.toFixed(0)}°C
                                        </span>
                                        <span
                                            className='text-xs font-bold tracking-tight sm:text-sm'
                                        >
                                            {values.weatherData?.current.weather[0].main}
                                        </span>
                                    </h1>
                                    <p
                                        className='text-sm tracking-tight flex gap-2 mt-4 capitalize
                                        dark:text-slate-400 text-slate-400 font-normal sm:text-md
                                        '
                                    >
                                        Feels like {values.weatherData?.current.main.feels_like.toFixed(0)}°C. {values.weatherData?.current.weather[0].description}.
                                    </p>
                                </div>
                                {/* Refresh Button */}
                                <button
                                    type='button'
                                    className='flex items-center gap-2 text-red-400 dark:text-red-400 text-sm font-bold tracking-tight sm:text-md'
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
                        </React.Fragment>
                    )
                }
                {
                    values.isLoading ? (
                        <div className="relative animate-pulse bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-3xl h-full overflow-hidden min-h-[200px]">
                            <div className='absolute inset-0 flex justify-center items-center'>
                                <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-200 dark:text-slate-600'>
                                    <div
                                        className='h-10 w-10 bg-slate-200 rounded-full dark:bg-slate-700'
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-3xl h-full overflow-hidden min-h-[200px]">
                            <iframe
                                name={
                                    `Map of ${values.selectedCity?.mainText + ", " + values.selectedCity?.secondaryText}.`
                                } title={
                                    `Map of ${values.selectedCity?.mainText + ", " + values.selectedCity?.secondaryText}.`
                                }
                                // className="absolute inset-0 border-0 z-0 filter invert-[100%] grayscale-[100%]"
                                width="100%"
                                height="100%"
                                allowFullScreen={false}
                                src={
                                    `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4"}&center=${values.selectedCity?.latitude},${values.selectedCity?.longitude}&q=${values.selectedCity.mainText + ", " + values.selectedCity.secondaryText}&zoom=11`
                                }
                            />
                        </div>
                    )

                }
            </div>
            {
                !values.isLoading ?
                    (
                        <React.Fragment>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row-dense">
                                {/* Humidity */}
                                <div
                                    className="relative min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-slate-900 xl:p-8"
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <Drop
                                            className='h-10 w-10 text-sky-400 dark:text-sky-400'
                                            color='currentColor'
                                            variant='Bulk'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <p
                                            className='text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                                        >
                                            Humidity
                                        </p>
                                        <h1
                                            className='text-3xl tracking-tight flex gap-4 justify-start items-end text-slate-900 dark:text-slate-50'
                                        >
                                            <span
                                                className='font-bold'
                                            >
                                                {values.weatherData?.current.main.humidity}%
                                            </span>
                                        </h1>
                                    </div>
                                </div>

                                {/* Wind Speed */}
                                <div
                                    className="relative min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-slate-900 xl:p-8"
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <Wind
                                            className='h-10 w-10 text-amber-400 dark:text-amber-400'
                                            color='currentColor'
                                            variant='Bulk'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <p
                                            className='text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                                        >
                                            Wind Speed
                                        </p>
                                        <h1
                                            className='text-3xl tracking-tight flex gap-4 justify-start items-end text-slate-900 dark:text-slate-50'
                                        >
                                            <span
                                                className='font-bold'
                                            >
                                                {values.weatherData?.current.wind.speed} km/h
                                            </span>
                                        </h1>
                                    </div>
                                </div>

                                {/* Pressure */}
                                <div
                                    className="relative min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-slate-900 xl:p-8"
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <CloudFog
                                            className='h-10 w-10 text-red-400 dark:text-red-400'
                                            color='currentColor'
                                            variant='Bulk'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <p
                                            className='text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                                        >
                                            Pressure
                                        </p>
                                        <h1
                                            className='text-3xl tracking-tight flex gap-4 justify-start items-end text-slate-900 dark:text-slate-50'
                                        >
                                            <span
                                                className='font-bold'
                                            >
                                                {values.weatherData?.current.main.pressure} hPa
                                            </span>
                                        </h1>
                                    </div>
                                </div>

                                {/* Visibility */}
                                <div
                                    className="relative min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-slate-900 xl:p-8"
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <Eye
                                            className='h-10 w-10 text-slate-400 dark:text-slate-400'
                                            color='currentColor'
                                            variant='Bulk'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <p
                                            className='text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                                        >
                                            Visibility
                                        </p>
                                        <h1
                                            className='text-3xl tracking-tight flex gap-4 justify-start items-end text-slate-900 dark:text-slate-50'
                                        >
                                            <span
                                                className='font-bold'
                                            >
                                                {values.weatherData?.current.visibility ? values.weatherData?.current.visibility / 1000 : "NaN"} km
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                    :
                    (
                        <React.Fragment>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row-dense">
                                <div
                                    className="relative animate-pulse min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-slate-900 xl:p-8"
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <div
                                            className='h-10 w-10 bg-slate-200 rounded-full dark:bg-slate-700'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <div className="h-2 bg-slate-200 rounded-xl dark:bg-slate-700 w-16"></div>
                                        <div className="h-10 bg-slate-200 rounded-xl dark:bg-slate-700 w-32"></div>
                                    </div>
                                </div>
                                <div
                                    className="relative animate-pulse min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-slate-900 xl:p-8"
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <div
                                            className='h-10 w-10 bg-slate-200 rounded-full dark:bg-slate-700'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <div className="h-2 bg-slate-200 rounded-xl dark:bg-slate-700 w-16"></div>
                                        <div className="h-10 bg-slate-200 rounded-xl dark:bg-slate-700 w-32"></div>
                                    </div>
                                </div>
                                <div
                                    className="relative animate-pulse min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-slate-900 xl:p-8"
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <div
                                            className='h-10 w-10 bg-slate-200 rounded-full dark:bg-slate-700'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <div className="h-2 bg-slate-200 rounded-xl dark:bg-slate-700 w-16"></div>
                                        <div className="h-10 bg-slate-200 rounded-xl dark:bg-slate-700 w-32"></div>
                                    </div>
                                </div>
                                <div
                                    className="relative animate-pulse min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-slate-900 xl:p-8"
                                >
                                    <div className='w-16 h-16 flex justify-center items-center rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden text-slate-400 dark:text-slate-400'>
                                        <div
                                            className='h-10 w-10 bg-slate-200 rounded-full dark:bg-slate-700'
                                        />
                                    </div>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <div className="h-2 bg-slate-200 rounded-xl dark:bg-slate-700 w-16"></div>
                                        <div className="h-10 bg-slate-200 rounded-xl dark:bg-slate-700 w-32"></div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
            }
        </>
    )
}