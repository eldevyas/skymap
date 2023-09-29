import React, { createContext } from 'react';

const AppContext = createContext({
    selectedCity: null,
    userLocation: null,
    search: '',
    weatherData: null,
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCity, setSelectedCity] = React.useState(null);
    const [userLocation, setUserLocation] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [weatherData, setWeatherData] = React.useState(null);

    const value = {
        selectedCity,
        userLocation,
        search,
        weatherData,
        setSelectedCity,
        setUserLocation,
        setSearch,
        setWeatherData,
    };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
};

export default AppContext;
