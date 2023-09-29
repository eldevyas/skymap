import { createClient } from "@google/maps";
import { Refresh2 } from "iconsax-react";
import { useEffect, useState } from "react";

export default function WaetherOverview() {
    const [IPLocation, setIPLocation] = useState<string | null>(null);
    const [CurrentDate, setDate] = useState<string | null>(null);
    const [CurrentTime, setTime] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    const Refresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    const mapsClient = createClient({
        key: process.env.GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4",
        Promise: Promise
    });

    useEffect(() => {
        // Get Google Maps API Key
        console.log("Google Maps API Key: ", process.env.GOOGLE_MAPS_API_KEY || 'No API Key Found!');

        // Get Current Date
        var currentDate = new Date();
        var formattedDate: string = currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Get Current Time
        var currentTime = new Date();
        var formattedTime: string = currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        setDate(formattedDate);
        setTime(formattedTime);

        if ("geolocation" in navigator) {
            // Prompt user for permission to access their location
            navigator.geolocation.getCurrentPosition(
                // Success callback function
                (position) => {
                    // Get the user's latitude and longitude coordinates
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    // Get the user's city and country based on their latitude and longitude coordinates
                    mapsClient.reverseGeocode({
                        latlng: [lat, lng]
                    })
                        .asPromise()
                        .then((response) => {
                            console.log(response.json.results[0].formatted_address);

                            var City = response.json.results[0].address_components[0].long_name;
                            var Country = response.json.results[0].address_components[3].long_name;

                            setIPLocation(`${City}, ${Country}.`);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                    // Do something with the location data, e.g. display on a map
                    console.log(`Latitude: ${lat}, longitude: ${lng}`);
                },
                // Error callback function
                (error) => {
                    // Handle errors, e.g. user denied location sharing permissions
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
        }

    }, [mapsClient]);

    return (
        <div className='w-full h-auto relative bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-3xl sm:px-16 lg:gap-x-20 lg:px-24 p-10 overflow-hidden flex flex-col gap-4'>
            {
                (isLoading || !IPLocation || !CurrentDate || !CurrentTime) ? (
                    <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
                        <div className="flex items-center w-full space-x-2">
                            <div className="h-3.5 bg-slate-200 rounded-full dark:bg-slate-700 w-32 max-w-full"></div>
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
                            {CurrentDate}, {CurrentTime}.
                        </p>
                        <h1
                            className='text-lg font-bold tracking-tight text-slate-800 dark:text-slate-50 sm:text-xl'
                        >
                            {IPLocation}
                        </h1>
                    </div>
                )

            }

            {/* Refresh Button */}
            <button
                type='button'
                className='flex items-center gap-2 text-slate-400 dark:text-slate-400 text-sm font-bold tracking-tight sm:text-md'
                onClick={Refresh}
            >
                <Refresh2
                    className='h-5 w-5'
                    color='currentColor'
                    variant='Bulk'
                />
                Refresh
            </button>
        </div>
    )
}
