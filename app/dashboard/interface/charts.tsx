import React from 'react'
import { AxisOptions, Chart } from 'react-charts'

type WeatherData = {
    date: Date,
    temperature: number,
    humidity: number,
    windSpeed: number,
}

type Series = {
    label: string,
    data: WeatherData[]
}

const data: Series[] = [
    {
        label: 'Weather Data',
        data: [
            {
                date: new Date('2023-09-23T12:00:00'),
                temperature: 25, // Replace with actual temperature data
                humidity: 50,    // Replace with actual humidity data
                windSpeed: 10,  // Replace with actual wind speed data
            },
            // Add more data points...
        ]
    },
    // Add more series if needed...
]

export function WeatherChart() {
    const primaryAxis = React.useMemo(
        (): AxisOptions<WeatherData> => ({
            getValue: datum => datum.date,
        }),
        []
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<WeatherData>[] => [
            {
                getValue: datum => datum.temperature,
                position: 'left', // Temperature typically goes on the left axis
                show: true,
            },
            {
                getValue: datum => datum.humidity,
                position: 'right', // Humidity typically goes on the right axis
                show: true,
            },
            {
                getValue: datum => datum.windSpeed,
                position: 'right', // Wind speed can also go on the right axis
                show: true,
            },
        ],
        []
    )

    return (
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
            }}
        />
    )
}
