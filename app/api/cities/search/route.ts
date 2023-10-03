import { CityType } from "@/app/context";
import axios from "axios";
import Fuse from "fuse.js";
import { find } from 'geo-tz';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('query')


    const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

    const googleMapsClient = require('@google/maps').createClient({
        key: googleMapsAPIKey
    });

    console.log("Google Maps API Key is: ", googleMapsAPIKey);

    console.log("Search Query is: ", searchQuery);

    // Check if the query is a country or a place
    const isCountryOrPlace = !searchQuery || searchQuery.length <= 3;

    let Cities: CityType[] = [];

    if (isCountryOrPlace) {
        // Handle queries for countries or places
        Cities = await axios
            .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleMapsAPIKey}&input=${searchQuery}&types=(country|establishment)`)
            .then(async (response) => {
                const Predictions = response.data.predictions;

                console.log(`Found ${Predictions.length} predictions from Google Maps API.`);

                async function fetchCityDetails(prediction: any) {
                    const responsePredictions = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${googleMapsAPIKey}&place_id=${prediction.place_id}`)
                        .then(
                            (response) => {
                                console.log("Response from Google Maps API is: ", response);
                                return response.data;
                            }
                        ).catch((error) => {
                            console.error("Error fetching city details from Google Maps API: ", error)
                            return [];
                        });

                    const { lat, lng } = responsePredictions.result.geometry.location;

                    // Find the timezone of the city
                    const timeZone = find(lat, lng)[0];

                    const countryCode = responsePredictions
                        .result
                        .address_components
                        .find((component: {
                            types: string | string[];
                        }) => component.types.includes('country'))
                        .short_name;

                    const predictedCity = {
                        id: prediction.place_id,
                        mainText: prediction.structured_formatting.main_text,
                        secondaryText: prediction.structured_formatting.secondary_text,
                        countryCode: countryCode,
                        latitude: lat,
                        longitude: lng,
                        timeZone: timeZone,
                    };

                    console.log("Predicted City is: ", predictedCity);

                    return predictedCity;
                }

                Cities = await Promise.all(Predictions.map(fetchCityDetails));

                return Cities;
            })
            .catch((error) => {
                console.error("Error fetching cities from Google Maps API", error)
                return [];
            });
    } else {
        // Handle queries for cities
        Cities = await axios
            .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleMapsAPIKey}&input=${searchQuery}`)
            .then(async (response) => {
                const Predictions = response.data.predictions.filter((prediction: any) => {
                    return prediction.types.includes('locality') || prediction.types.includes('administrative_area_level_1') || prediction.types.includes('country');
                });

                console.log(`Found ${Predictions.length} predictions from Google Maps API.`);

                async function fetchCityDetails(prediction: any) {
                    const responsePredictions = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${googleMapsAPIKey}&place_id=${prediction.place_id}`)
                        .then(
                            (response) => {
                                console.log("Response from Google Maps API is: ", response);
                                return response.data;
                            }
                        ).catch((error) => {
                            console.error("Error fetching city details from Google Maps API: ", error)
                            return [];
                        });

                    const { lat, lng } = responsePredictions.result.geometry.location;

                    // Find the timezone of the city
                    const timeZone = find(lat, lng)[0];

                    const countryCode = responsePredictions
                        .result
                        .address_components
                        .find((component: {
                            types: string | string[];
                        }) => component.types.includes('country'))
                        .short_name;

                    const predictedCity = {
                        id: prediction.place_id,
                        mainText: prediction.structured_formatting.main_text,
                        secondaryText: prediction.structured_formatting.secondary_text,
                        countryCode: countryCode,
                        latitude: lat,
                        longitude: lng,
                        timeZone: timeZone,
                    };

                    console.log("Predicted City is: ", predictedCity);

                    return predictedCity;
                }

                Cities = await Promise.all(Predictions.map(fetchCityDetails));

                return Cities;
            })
            .catch((error) => {
                console.error("Error fetching cities from Google Maps API", error)
                return [];
            });
    }


    return new Response(JSON.stringify(Cities), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}