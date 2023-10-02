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

    const Cities: CityType[] = await axios
        .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_MAPS_API_KEY}&input=${searchQuery}`)
        .then(async (response) => {
            const Predictions = response.data.predictions.filter((prediction: any) => {
                return prediction.types.includes('locality');
            });

            // Wrap the map function in another async function to wait for the promises to resolve before accessing the Cities array.
            async function fetchCityDetails(prediction: any) {
                const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4"}&place_id=${prediction.place_id}`);
                const json = await response.json();

                const { lat, lng } = json.result.geometry.location;

                // Find the timezone of the city
                const timeZone = find(lat, lng)[0];

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
                    timeZone: timeZone,
                };
            }

            const Cities = await Promise.all(Predictions.map(fetchCityDetails));

            return Cities;
        })
        .catch((error) => {
            console.log(`error: `, error);
            return [];
        });

    // Return the Cities from the Fuse Search if the search query is not empty.
    const searchWithFuse = new Fuse(Cities, {
        keys: ['mainText', 'secondaryText'],
        threshold: 0.3,
    });

    const searchResults = searchQuery ? searchWithFuse.search(searchQuery) : searchWithFuse.search('');

    // Convert the Fuse Search Results to an Array of Cities.
    const filteredCitiesResult = searchResults.map((result) => result.item);

    return new Response(JSON.stringify(filteredCitiesResult), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}