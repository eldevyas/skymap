import axios from 'axios';
import React, { createContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';
import { getUserLocation } from './functions/getUserLocation';

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
        getUserLocationWithGPS: () => Promise<CityType | null>,
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
        getUserLocationWithGPS: async () => { return null },
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
        getUserLocationWithGPS();
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
            `/api/cities?query=${searchQuery}`
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

    async function getUserLocationWithGPS() {
        // Get User Location - Meanwhile, set Loading to true.
        setLoading(true);

        const userCityLocationWithGPS = await getUserLocation();

        // Update Context of User Location
        setUserLocation({
            latitude: userCityLocationWithGPS.latitude,
            longitude: userCityLocationWithGPS.longitude,
        });

        // Update Selected City
        setSelectedCity(userCityLocationWithGPS);

        // Inform the user that their location has been updated.
        toast.success(`Your location has been updated to ${userCityLocationWithGPS.mainText}.`);

        // Set Loading to false
        setLoading(false);

        // Return the User's Location.
        return userCityLocationWithGPS;
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
            getUserLocationWithGPS,
        }
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};

export default AppContext;
