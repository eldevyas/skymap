"use client";

import AppContext from "@/app/context";
import React, { useContext } from "react";
import Chart from "react-apexcharts";

export default function ChartsVisualization() {
    const { values } = useContext(AppContext);

    return (
        <React.Fragment>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative min-w-full w-full flex-1 bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-3xl sm:px-16 lg:flex lg:px-24 gap-4 overflow-hidden border border-gray-300 dark:border-gray-600 h-auto flex flex-row flex-wrap p-6 mx-auto max-w-full text-left justify-start items-end text-gray-900 xl:p-8">
                    <TemperatureChart />
                </div>
                <div className="border border-dashed rounded-3xl  border-gray-300 dark:border-gray-600 h-96"></div>
            </div>
            <div className="border border-dashed rounded-3xl  border-gray-300 dark:border-gray-600 h-96"></div>
        </React.Fragment>
    )
}

// Weather Charts Components

// First Chart: Temperature
function TemperatureChart() {
    const { values } = useContext(AppContext);

    const options = {
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: values.weatherData?.hourlyForecast.map((item: any) => item.time)
        },
        yaxis: {
            labels: {
                formatter: function (value: any) {
                    return value + "°C";
                }
            },
            title: {
                text: "Temperature"
            }
        },
        dataLabels: {
            enabled: false
        },
    };

    return (
        <Chart
            options={options}
            series={[
                {
                    name: "Temperature",
                    data: values.weatherData?.hourlyForecast.map((item: any) => item.temperature)
                }
            ]}
            type="line"
            width="100%"
            height="100%"
            className="w-full h-full"
        />
    );
}