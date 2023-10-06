import axios from 'axios';
import React, { createContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';
import { getUserLocationWithCoordinates, getUserLocationWithIP } from './functions/getUserLocation';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const placeholderCurrentWeatherType: currentWeatherType = {
    coord: {
        lon: 0,
        lat: 0,
    },
    weather: [
        {
            id: 0,
            main: "Unknown",
            description: "Unknown",
            icon: "unknown",
        },
    ],
    base: "",
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
    },
    visibility: 0,
    wind: {
        speed: 0,
        deg: 0,
        gust: 0,
    },
    rain: {
        "1h": 0,
    },
    clouds: {
        all: 0,
    },
    dt: 0,
    sys: {
        type: 0,
        id: 0,
        country: "",
        sunrise: 0,
        sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: "",
    cod: 0,
};

const placeholderHourlyForecastType: hourlyForecastType = {
    "latitude": 0,
    "longitude": 0,
    "generationtime_ms": 0,
    "utc_offset_seconds": 0,
    "timezone": "",
    "timezone_abbreviation": "",
    "elevation": 0,
    "hourly_units": {
        "time": "",
        "temperature_2m": "",
        "dewpoint_2m": "",
        "apparent_temperature": "",
        "relativehumidity_2m": "",
    },
    "hourly": {
        "time": [],
        "temperature_2m": [],
        "dewpoint_2m": [],
        "apparent_temperature": [],
        "relativehumidity_2m": [],
    },
};

export type CityType = {
    id: number | string,
    mainText: string,
    secondaryText: string,
    countryCode: string,
    latitude: number,
    longitude: number,
    timeZone: string,
}

export type LocationType = {
    latitude: number,
    longitude: number,
}

export type QueryType = string | '';

export type GlobalContextType = {
    values: {
        isLoading: boolean,
        query: QueryType,
        userLocation: LocationType | null,
        selectedCity: CityType,
        weatherData: {
            current: currentWeatherType,
            hourlyForecast: hourlyForecastType,
            dailyForecast: any,
        },
        queryCities: CityType[],
    },
    functions: {
        setLoading: (isLoading: boolean) => void,
        setQuery: (query: QueryType) => void,
        setUserLocation: (location: LocationType) => void,
        setSelectedCity: (city: CityType) => void,
        setWeatherData: (weatherData: any) => void,
        setQueryCities: (cities: CityType[]) => void,
    },
    handlers: {
        handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
        handleSelection: (city: CityType) => void,
    }
    utilities: {
        fetchCitiesByQuery: (searchQuery: string) => any,
        getUserLocation: () => Promise<CityType | null>,
        getWeatherData: (city: CityType) => any,
    }
}

const AppContext = createContext<GlobalContextType>({
    values: {
        isLoading: true,
        query: '',
        userLocation: null,
        selectedCity: {
            id: 1,
            mainText: 'London',
            secondaryText: 'United Kingdom',
            countryCode: 'GB',
            latitude: 51.507351,
            longitude: -0.127758,
            timeZone: 'Europe/London',
        },
        weatherData: {
            current: placeholderCurrentWeatherType,
            hourlyForecast: placeholderHourlyForecastType,
            dailyForecast: null,
        },
        queryCities: [],
    },
    functions: {
        setLoading: (isLoading: boolean) => { },
        setQuery: (search: any) => { },
        setUserLocation: (location: any) => { },
        setSelectedCity: (city: any) => { },
        setWeatherData: (weatherData: any) => { },
        setQueryCities: (cities: any) => { },
    },
    handlers: {
        handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => { },
        handleSelection: (city: CityType) => { },
    },
    utilities: {
        fetchCitiesByQuery: async (searchQuery: string) => { },
        getUserLocation: async () => { return null },
        getWeatherData: async (city: CityType) => { },
    }
});


export const AppContextProvider = ({ children }: {
    children: React.ReactNode
}) => {
    // Loading - Whether the app is loading or not.
    const [isLoading, setLoading] = React.useState<boolean>(true);

    // Query - String Search Text to find cities by their name.
    const [query, setQuery] = React.useState<string | ''>('');

    // User Location - The User's current location - Only present if they have allowed the browser to access it.
    const [userLocation,
        setUserLocation] = React.useState<LocationType | null>(null);

    // Selected City - The City that the user has selected to view the weather for.
    const [selectedCity,
        setSelectedCity] = React.useState<CityType>({
            id: 1,
            mainText: 'London',
            secondaryText: 'United Kingdom',
            countryCode: 'GB',
            latitude: 51.507351,
            longitude: -0.127758,
            timeZone: 'Europe/London',
        });

    // Weather Data - The Weather Data for the selected City.
    const [weatherData,
        setWeatherData] = React.useState<
            {
                current: currentWeatherType,
                hourlyForecast: hourlyForecastType,
                dailyForecast: any,
            }
        >(
            {
                current: placeholderCurrentWeatherType,
                hourlyForecast: placeholderHourlyForecastType,
                dailyForecast: null,
            }
        );

    // queryCities - The Cities that match the user's search query.
    const [queryCities,
        setQueryCities] = React.useState<CityType[]>([]);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Fetch the user location only if it's a dashboard page.
        if (pathname.includes('dashboard')) {
            getUserLocation();
        }
    }, [pathname])

    // useEffect for when the selectedCity changes.
    useEffect(() => {
        if (selectedCity) {
            getWeatherData(selectedCity);
        }
    }, [selectedCity])



    const handleSearch = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        // Set the Query to the new value.
        setQuery(event.target.value)

        // Fetch Cities with the new Query.
        const queryCitiesResult = await fetchCitiesByQuery(event.target.value);

        // Update the Cities with the new Query results. 
        setQueryCities(queryCitiesResult);
    }

    const handleSelection = async (city: CityType) => {
        // Set Selected City
        setSelectedCity(city);

        // Inform the user that they have selected a new city.
        toast.success(`You've selected ${city.mainText}.`);
    }

    async function fetchCitiesByQuery(searchQuery: string) {
        // Set Loading to true
        setLoading(true);

        // Fetch Cities from the API service.
        const Cities = await axios.get(
            `/api/location?query=${searchQuery}`
        )
            .then((response) => {
                // If there is a response, return it.
                return response.data;
            })
            .catch((error) => {
                // If there is an error, log it.
                console.log(error);
                return [];
            });

        // Set Loading to false
        setLoading(false);

        // Return the Cities.
        return Cities;
    }

    async function getUserLocation(): Promise<CityType> {
        // Get User Location - Meanwhile, set Loading to true.
        setLoading(true);

        var userCityLocation: CityType | null = null;

        const customPromiseForToast = new Promise<CityType>(async (resolve, reject) => {
            // Fetch User Location with GPS Coordinates
            var userCityLocationWithGPS: CityType | null = await getUserLocationWithCoordinates()
                .then((response) => {
                    // If the response is successful, return the data.
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                    return null;
                });

            var userCityLocationWithIPAddress: CityType | null = null;

            // If the user's location was not found, try to fetch it using the IP address.
            if (!userCityLocationWithGPS) {
                userCityLocationWithIPAddress = await getUserLocationWithIP()
                    .then((response) => {
                        // If the response is successful, return the data.
                        return response;
                    })
                    .catch((error) => {
                        console.log(error);
                        return null;
                    });
            }

            // Set the user's location to the first successful fetch.
            let foundLocation = userCityLocationWithGPS || userCityLocationWithIPAddress;

            // If the user's location was not found, set it to a default location.
            if (!foundLocation) {
                foundLocation = {
                    id: 1,
                    mainText: 'London',
                    secondaryText: 'United Kingdom',
                    countryCode: 'GB',
                    latitude: 51.507351,
                    longitude: -0.127758,
                    timeZone: 'Europe/London',
                };
            }

            // Return the found location.
            resolve(foundLocation);
        });

        // Show a loading toast
        await toast.promise(customPromiseForToast, {
            loading: `Analysing your city's geolocation...`,
            success: `Showing weather for your city.`,
            error: `Couldn't find your city.`,
        }).then((foundLocation) => {
            userCityLocation = foundLocation;
        }).catch((error) => {
            console.log(error);
        });

        // If the user's location was not found, set it to a default location.
        if (!userCityLocation) {
            userCityLocation = {
                id: 1,
                mainText: 'London',
                secondaryText: 'United Kingdom',
                countryCode: 'GB',
                latitude: 51.507351,
                longitude: -0.127758,
                timeZone: 'Europe/London',
            };
        }

        // Update Context of User Location
        setUserLocation({
            latitude: userCityLocation.latitude,
            longitude: userCityLocation.longitude,
        });

        // Update Selected City
        setSelectedCity(userCityLocation);

        // Set Loading to false
        setLoading(false);

        // Return the User's Location.
        return userCityLocation;
    }

    const getWeatherData = async (city: CityType) => {
        // Set Loading to true
        setLoading(true);

        // Fetch Weather Data from the API service.
        const weatherData = await axios.get(
            `/api/weather?lat=${city.latitude}&lon=${city.longitude}`
        )
            .then((response) => {
                // If there is a response, return it.
                return response.data;
            })
            .catch((error) => {
                // If there is an error, log it.
                console.log(error);
                return null;
            });

        // Set Loading to false
        setLoading(false);

        // Set Weather Data (if it exists)
        if (weatherData) {
            setWeatherData(weatherData);
        }

        // Return the Weather Data.
        return weatherData;
    };


    const contextValue:
        GlobalContextType
        = {
        values: {
            isLoading,
            query,
            selectedCity,
            userLocation,
            weatherData,
            queryCities
        },
        functions: {
            setLoading,
            setQuery,
            setUserLocation,
            setSelectedCity,
            setWeatherData,
            setQueryCities,
        },
        handlers: {
            handleSearch,
            handleSelection,
        },
        utilities: {
            fetchCitiesByQuery,
            getUserLocation,
            getWeatherData,
        }
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};

export default AppContext;


interface currentWeatherType {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    rain: {
        "1h": number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface hourlyForecastType {
    "latitude": number,
    "longitude": number,
    "generationtime_ms": number,
    "utc_offset_seconds": number,
    "timezone": string,
    "timezone_abbreviation": string,
    "elevation": number,
    "hourly_units": {
        "time": string,
        "temperature_2m": string,
        "dewpoint_2m": string,
        "apparent_temperature": string,
        "relativehumidity_2m": string,
    },
    "hourly": {
        "time": string[],
        "temperature_2m": number[],
        "dewpoint_2m": number[],
        "apparent_temperature": number[],
        "relativehumidity_2m": number[],
    }
}

