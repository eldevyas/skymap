import { CityType } from "@/app/context";
import axios from "axios";
import Fuse from "fuse.js";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');


    if (!openWeatherApiKey) {
        return new Response(JSON.stringify({
            Error: "Open Weather API Key not found!",
            Message: "Please add OPEN_WEATHER_API_KEY to your environment variables.",
        }), {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
    }

    const currentWeatherData: [] = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            return [];
        });

    const hourlyForecastData: [] = [];

    const dailyForecastData: [] = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`)
        .then((response) => response.data)
        .catch((error) => {
            console.error(error);
            return [];
        });

    return new Response(JSON.stringify({
        current: currentWeatherData,
        hourlyForecast: hourlyForecastData,
        dailyForecast: dailyForecastData,
    }), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}