import axios from 'axios';
import React, { createContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';
import { getUserLocationWithCoordinates, getUserLocationWithIP } from './functions/getUserLocation';

export type CityType = {
    id: number | string,
    mainText: string,
    secondaryText: string,
    countryCode: string,
    latitude: number,
    longitude: number,
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
        selectedCity: CityType | null,
        weatherData: any,
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
    }
}

const AppContext = createContext<GlobalContextType>({
    values: {
        isLoading: true,
        query: '',
        userLocation: null,
        selectedCity: null,
        weatherData: null,
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
        setSelectedCity] = React.useState<CityType | null>(null);

    // Weather Data - The Weather Data for the selected City.
    const [weatherData,
        setWeatherData] = React.useState(null);

    // queryCities - The Cities that match the user's search query.
    const [queryCities,
        setQueryCities] = React.useState<CityType[]>([]);

    useEffect(() => {
        getUserLocation();
    }, [])



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
            `/api/cities/search?query=${searchQuery}`
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
            var userCityLocationWithGPS: CityType | null = await getUserLocationWithCoordinates();
            var userCityLocationWithIPAddress: CityType | null = null;

            // If the user's location was not found, try to fetch it using the IP address.
            if (!userCityLocationWithGPS) {
                userCityLocationWithIPAddress = await getUserLocationWithIP();
            }

            // Set the user's location to the first successful fetch.
            const foundLocation = userCityLocationWithGPS || userCityLocationWithIPAddress;

            // Return the user's location.
            return resolve(foundLocation);
        });

        // Show a loading toast
        await toast.promise(customPromiseForToast, {
            loading: `Getting your location...`,
            success: `Found your location!`,
            error: `Couldn't find your location.`,
        }).then((foundLocation) => {
            userCityLocation = foundLocation;
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
        }
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};

export default AppContext;
