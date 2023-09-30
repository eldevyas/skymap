import axios from 'axios';
import React, { createContext } from 'react';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';

export type CityType = {
    id: number,
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
        query: QueryType,
        userLocation: LocationType | null,
        selectedCity: CityType | null,
        weatherData: any,
        queryCities: CityType[],
    },
    functions: {
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
    }
}

const AppContext = createContext<GlobalContextType>({
    values: {
        query: '',
        userLocation: null,
        selectedCity: null,
        weatherData: null,
        queryCities: [],
    },
    functions: {
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
    }
});


export const AppContextProvider = ({ children }: {
    children: React.ReactNode
}) => {
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

        // Set the Query to the new value.
        setQuery(city.mainText);

        // Inform the user that they have selected a new city.
        toast.success(`You've selected ${city.mainText}.`);
    }

    async function fetchCitiesByQuery(searchQuery: string) {
        // Fetch Cities from the API service.
        // THE API IS CUSTOMIZED IN THE APP'S API FOLDER AND THE ENVIRONMENT VARIABLES.

        // The API Responsible for fetching cities is "/api/cities?query=${searchQuery}".

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

        // Return the Cities.
        return Cities;
    }


    const contextValue:
        GlobalContextType
        = {
        values: {
            query,
            selectedCity,
            userLocation,
            weatherData,
            queryCities
        },
        functions: {
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
        }
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};

export default AppContext;
