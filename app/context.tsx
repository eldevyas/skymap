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
            .then(async (response) => {
                const Predictions = response.data.predictions.filter((prediction: any) => {
                    return prediction.types.includes('locality');
                });

                // Wrap the map function in another async function to wait for the promises to resolve before accessing the Cities array.
                async function fetchCityDetails(prediction: any) {
                    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4"}&place_id=${prediction.place_id}`);
                    const json = await response.json();

                    const { lat, lng } = json.result.geometry.location;
                    const countryCode = json
                        .result
                        .address_components
                        .find((component: {
                            types: string | string[];
                        }) => component.types.includes('country'))
                        .short_name;

                    return {
                        id: prediction.place_id,
                        mainText: prediction.structured_formatting.main_text,
                        secondaryText: prediction.structured_formatting.secondary_text,
                        countryCode: countryCode,
                        latitude: lat,
                        longitude: lng,
                    };
                }

                const Cities = await Promise.all(Predictions.map(fetchCityDetails));

                return Cities;
            })
            .catch((error) => {
                console.log(`error: `, error);
                return [];
            });

        return Cities;
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
        }
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};

export default AppContext;
