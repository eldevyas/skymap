import axios from 'axios';
import React, { createContext } from 'react';

type GlobalContextType = {
    getters: {
        selectedCity: any,
        userLocation: any,
        search: string,
        weatherData: any
    },
    setters: {
        setSelectedCity: (city: any) => void,
        setUserLocation: (location: any) => void,
        setSearch: (search: string) => void,
        setWeatherData: (weatherData: any) => void
    },
    utils: {
        fetchCitiesByQuery: (searchQuery: string) => any,
        getLatLngAndCountryCode: (placeId: any) => any
    }
}

const AppContext = createContext<GlobalContextType>({
    getters: {
        selectedCity: null,
        userLocation: null,
        search: '',
        weatherData: null
    },
    setters: {
        setSelectedCity: (city: any) => { },
        setUserLocation: (location: any) => { },
        setSearch: (search: any) => { },
        setWeatherData: (weatherData: any) => { }
    },
    utils: {
        fetchCitiesByQuery: async (searchQuery: string) => { },
        getLatLngAndCountryCode: async (placeId: any) => { }
    }
});


export const AppContextProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [selectedCity,
        setSelectedCity] = React.useState(null);
    const [userLocation,
        setUserLocation] = React.useState(null);
    const [search,
        setSearch] = React.useState('');
    const [weatherData,
        setWeatherData] = React.useState(null);

    async function fetchCitiesByQuery(searchQuery: string) {
        const Cities = axios
            .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4"}&input=${searchQuery}`)
            .then((response) => {
                return response.data.predictions.filter((prediction: any) => {
                    return prediction.types.includes('locality');
                });
            })
            .catch((error) => {
                console.log(`error: `, error);
                return [];
            });

        return Cities;
    }

    async function getLatLngAndCountryCode(placeId: any) {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4"}&place_id=${placeId}`);
        const json = await response.json();

        const { latitude, longitude } = json.result.geometry.location;
        const countryCode = json
            .result
            .address_components
            .find((component: {
                types: string | string[];
            }) => component.types.includes('country'))
            .short_name;

        return { latitude, longitude, countryCode };
    }

    const contextValue = {
        getters: {
            selectedCity,
            userLocation,
            search,
            weatherData
        },
        setters: {
            setSelectedCity,
            setUserLocation,
            setSearch,
            setWeatherData
        },
        utils: {
            fetchCitiesByQuery,
            getLatLngAndCountryCode
        }
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};

export default AppContext;
