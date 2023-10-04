"use client";

import AppContext from "@/app/context";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import React, { useContext, useEffect } from "react";
import Colors from "tailwindcss/colors";
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ChartsVisualization() {
    return (
        <React.Fragment>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TemperatureChart />
                <HumidityChart />
            </div>
        </React.Fragment>
    )
}

// Weather Charts Components

// 1st: Temperature Chart

const TemperatureChart = () => {
    const { theme } = useTheme();
    const { values } = useContext(AppContext);

    const [chartDays, setChartDays] = React.useState<number>(1);

    useEffect(() => {
        if (values.weatherData.hourlyForecast.hourly.time.length > 0) {
            const TimeLength = values.weatherData.hourlyForecast.hourly.time.length;

            const DaysCount = values.weatherData.hourlyForecast.hourly.time.length / 8;

            setChartDays(DaysCount);
        }
    }, [values.weatherData.hourlyForecast.hourly.time]);

    const StartX = values.weatherData.hourlyForecast.hourly.time.length > 0 ? values.weatherData.hourlyForecast.hourly.time.map(
        // Convert Time String to Timestamp
        (time: string) => new Date(time).getTime()
    )[0] : 0;

    const EndX = values.weatherData.hourlyForecast.hourly.time.length > 0 ? values.weatherData.hourlyForecast.hourly.time.map(
        // Convert Time String to Timestamp
        (time: string) => new Date(time).getTime()
    )[values.weatherData.hourlyForecast.hourly.time.length - 1] : 0;

    const MinimumYAxisValue = Math.min(...values.weatherData.hourlyForecast.hourly.temperature_2m
        .map((temp: number) => Math.floor(temp / 10) * 10)) - 10;
    const MaximumYAxisValue = Math.max(...values.weatherData.hourlyForecast.hourly.temperature_2m
        .map((temp: number) => Math.ceil(temp / 10) * 10)) + 10;

    const MinimumXAxisValue = values.weatherData.hourlyForecast.hourly.time.length > 0 ? values.weatherData.hourlyForecast.hourly.time.map(
        // Convert Time String to Timestamp
        (time: string) => new Date(time).getTime()
    )[0] : 0;

    const MaximumXAxisValue = values.weatherData.hourlyForecast.hourly.time.length > 0 ? values.weatherData.hourlyForecast.hourly.time.map(
        // Convert Time String to Timestamp
        (time: string) => new Date(time).getTime()
    )[8] : 0;

    const chartOptions: {
        series: ApexOptions['series'];
        options: ApexOptions;
    } = {
        series: [{
            name: 'Temperature',
            data: [
                ...values.weatherData.hourlyForecast.hourly.temperature_2m
            ],
            color: Colors.red[600],
        },
        {
            name: 'Feels Like',
            data: [
                ...values.weatherData.hourlyForecast.hourly.apparent_temperature
            ],
            color: Colors.slate[600],
        }
        ],
        options: {
            chart: {
                height: "100%",
                width: "100%",
                type: "area",
                fontFamily: "inherit",
                dropShadow: {
                    enabled: false,
                },
                zoom: {
                    enabled: true,
                    type: 'x',
                    autoScaleYaxis: false,
                    zoomedArea: {
                        fill: {
                            color: Colors.red[600],
                            opacity: 0.4
                        },
                        stroke: {
                            color: Colors.red[600],
                            opacity: 0.4,
                            width: 1
                        }
                    }
                },
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    ...values.weatherData.hourlyForecast.hourly.time
                ],
                labels: {
                    show: true,
                    format: "h TT",
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                // 24-Hour Format (e.g. 00:00, 01:00, 02:00, .., 23:00), 1 Hour Interval, and a Max of 24 Hours.
                range: MaximumXAxisValue - MinimumXAxisValue,
                min: StartX,
                max: EndX,
            },
            yaxis: {
                show: true,
                labels: {
                    show: true,
                    formatter: function (value: number) {
                        return `${Math.round(value * 10) / 10
                            }° C`
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                // Min and Max values for the Y-Axis - Only Dozens (e.g. 10, 20, 30, .., 60.)
                min: MinimumYAxisValue,
                max: MaximumYAxisValue
            },
            tooltip: {
                enabled: true,
                x: {
                    // Tuesday, 12:00 PM
                    format: "dddd, h:mm TT",
                    show: false,
                },
                y: {
                    formatter: function (value: number) {
                        return `${value}° C`
                    },
                    title: {
                        formatter: function (seriesName: string) {
                            return `${seriesName}`
                        }
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.65,
                    opacityTo: 0.15,
                    shade: Colors.red[600],
                    gradientToColors: [Colors.red[500]],
                    type: "vertical",
                },
            },
            dataLabels: {
                enabled: false,
                formatter: function (value: number) {
                    return `${value}° C`
                },
            },
            stroke: {
                width: 6,
            },
            grid: {
                show: true,
                strokeDashArray: 4,
                padding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 20,
                },
            },
        },
    };

    return (
        <React.Fragment>
            {
                values.isLoading ? (
                    <React.Fragment>
                        <div className="relative animate-pulse min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-start text-slate-900 xl:p-8" >
                            <div className="flex flex-col w-full gap-4">
                                <div
                                    className="flex flex-col justify-start items-start w-full gap-2"
                                >
                                    <div className="h-6 rounded-xl bg-slate-200 dark:bg-slate-800 w-3/6"></div>
                                    <div className="h-3 rounded-xl bg-slate-200 dark:bg-slate-800 w-5/6"></div>
                                </div>
                                <div className="flex items-baseline mt-4 space-x-6">
                                    <div className="w-full bg-slate-200 rounded-t-xl h-72 dark:bg-slate-800"></div>
                                    <div className="w-full h-56 bg-slate-200 rounded-t-xl dark:bg-slate-800"></div>
                                    <div className="w-full bg-slate-200 rounded-t-xl h-72 dark:bg-slate-800"></div>
                                    <div className="w-full h-64 bg-slate-200 rounded-t-xl dark:bg-slate-800"></div>
                                    <div className="w-full bg-slate-200 rounded-t-xl h-80 dark:bg-slate-800"></div>
                                    <div className="w-full bg-slate-200 rounded-t-xl h-72 dark:bg-slate-800"></div>
                                    <div className="w-full bg-slate-200 rounded-t-xl h-80 dark:bg-slate-800"></div>
                                </div>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </React.Fragment>
                ) :
                    (
                        <React.Fragment>
                            <div className="relative min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-start text-slate-900 xl:p-8" >
                                <div className="flex justify-between w-full">
                                    <div
                                        className="flex flex-col justify-start items-start w-full"
                                    >
                                        <h5 className="leading-none text-xl font-bold text-slate-900 dark:text-white pb-2">
                                            Temperature
                                        </h5>
                                        <p className="text-base font-normal text-slate-500 dark:text-slate-400">
                                            Today&apos;s temperature in {values.selectedCity.mainText}.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Chart
                                        options={chartOptions.options as any}
                                        series={chartOptions.series}
                                        type="area"
                                        height={350}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    )
            }
        </React.Fragment>
    );
}

// 2nd: Humidity Chart
function HumidityChart() {
    const { theme } = useTheme();
    const { values } = useContext(AppContext);

    const MinimumYAxisValue = Math.min(...values.weatherData.hourlyForecast.hourly.relativehumidity_2m
        .map((temp: number) => Math.floor(temp / 10) * 10)) - 10;
    const MaximumYAxisValue = Math.max(...values.weatherData.hourlyForecast.hourly.relativehumidity_2m
        .map((temp: number) => Math.ceil(temp / 10) * 10)) + 10;

    const MinimumXAxisValue = values.weatherData.hourlyForecast.hourly.time.length > 0 ? values.weatherData.hourlyForecast.hourly.time.map(
        // Convert Time String to Timestamp
        (time: string) => new Date(time).getTime()
    )[0] : 0;

    const MaximumXAxisValue = values.weatherData.hourlyForecast.hourly.time.length > 0 ? values.weatherData.hourlyForecast.hourly.time.map(
        // Convert Time String to Timestamp
        (time: string) => new Date(time).getTime()
    )[
        values.weatherData.hourlyForecast.hourly.time.length - 1
    ] : 0;

    const chartOptions: {
        series: ApexOptions['series'];
        options: ApexOptions;
    } = {
        series: [
            {
                name: 'Relative Humidity',
                data: [
                    ...values.weatherData.hourlyForecast.hourly.relativehumidity_2m
                ],
                color: Colors.sky[600],
            }, {
                name: 'Dewpoint',
                data: [
                    ...values.weatherData.hourlyForecast.hourly.dewpoint_2m
                ],
                color: Colors.slate[600],
            },
        ],
        options: {
            chart: {
                height: "100%",
                width: "100%",
                type: "area",
                fontFamily: "inherit",
                dropShadow: {
                    enabled: false,
                },
                zoom: {
                    enabled: true,
                    type: 'x',
                    autoScaleYaxis: false,
                    zoomedArea: {
                        fill: {
                            color: Colors.sky[600],
                            opacity: 0.4
                        },
                        stroke: {
                            color: Colors.sky[600],
                            opacity: 0.4,
                            width: 1
                        }
                    }
                },
                toolbar: {
                    show: true,
                },
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    ...values.weatherData.hourlyForecast.hourly.time
                ],
                labels: {
                    show: true,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                range: 86400000,
                min: MinimumXAxisValue,
                max: MaximumXAxisValue
            },
            yaxis: {
                show: true,
                labels: {
                    show: false,
                    formatter: function (value: number) {
                        return `${Math.round(value * 10) / 10} ${value > 0 ? '%' : ''}`
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                // Min and Max values for the Y-Axis - Only Dozens (e.g. 10, 20, 30, .., 60.)
                min: 0,
                max: 100
            },
            tooltip: {
                enabled: true,
                x: {
                    format: 'dd/MM/yy HH:mm',
                    show: false,
                },
                y: {
                    formatter: function (value: number) {
                        return `${value}%`
                    },
                    title: {
                        formatter: function (seriesName: string) {
                            return `${seriesName}`
                        }
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: Colors.red[600],
                    gradientToColors: [Colors.red[500]],
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (value: number) {
                    return `${value}%`;
                },
            },
            stroke: {
                width: 6,
            },
            grid: {
                show: true,
                strokeDashArray: 4,
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 20,
                },
            },
        },
    };

    return (
        <React.Fragment>
            {
                values.isLoading ? (
                    <React.Fragment>
                        <div className="relative animate-pulse min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-start text-slate-900 xl:p-8" >
                            <div className="flex flex-col w-full gap-4">
                                <div
                                    className="flex flex-col justify-start items-start w-full gap-2"
                                >
                                    <div className="h-6 rounded-xl bg-slate-200 dark:bg-slate-800 w-3/6"></div>
                                    <div className="h-3 rounded-xl bg-slate-200 dark:bg-slate-800 w-5/6"></div>
                                </div>
                                <div className="flex items-baseline mt-4 space-x-6">
                                    <div className="w-full bg-slate-200 rounded-t-xl h-72 dark:bg-slate-800"></div>
                                    <div className="w-full h-56 bg-slate-200 rounded-t-xl dark:bg-slate-800"></div>
                                    <div className="w-full bg-slate-200 rounded-t-xl h-72 dark:bg-slate-800"></div>
                                    <div className="w-full h-64 bg-slate-200 rounded-t-xl dark:bg-slate-800"></div>
                                    <div className="w-full bg-slate-200 rounded-t-xl h-80 dark:bg-slate-800"></div>
                                    <div className="w-full bg-slate-200 rounded-t-xl h-72 dark:bg-slate-800"></div>
                                    <div className="w-full bg-slate-200 rounded-t-xl h-80 dark:bg-slate-800"></div>
                                </div>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </React.Fragment>
                ) :
                    (
                        <React.Fragment>
                            <div className="relative min-w-full w-full flex-1 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-slate-300 dark:border-slate-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-start text-slate-900 xl:p-8" >
                                <div className="flex justify-between w-full">
                                    <div
                                        className="flex flex-col justify-start items-start w-full"
                                    >
                                        <h5 className="leading-none text-xl font-bold text-slate-900 dark:text-white pb-2">
                                            Humidity
                                        </h5>
                                        <p className="text-base font-normal text-slate-500 dark:text-slate-400">
                                            Today&apos;s humidity in {values.selectedCity.mainText}.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Chart
                                        options={chartOptions.options}
                                        series={chartOptions.series}
                                        type="area"
                                        height={350}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    )
            }
        </React.Fragment>
    )
}
