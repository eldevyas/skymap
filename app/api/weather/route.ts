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

    // For Accurate Weather Data - Only for the Current Day, we use Open Weather API.
    const currentWeatherData: [] = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error in Open Weather API", error);
            return [];
        });


    // For Less Accurate Weather Data - For the next 5 days, we use Open Meteo API.
    const hourlyForecastData: [] = await axios.get(`https://api.open-meteo.com/v1/ecmwf?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,dewpoint_2m,apparent_temperature,relativehumidity_2m`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error in Open Meteo API", error);
            return [];
        });

    const dailyForecastData: [] = []

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