// app/api/cities/route.ts

import { CityType } from "@/app/context";
import axios from "axios";
import Fuse from "fuse.js";
import { find } from "geo-tz";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')

    const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

    const Cities: CityType[] = await axios
        .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleMapsAPIKey}&location=${latitude},${longitude}&radius=5000`)
        .then(async (response) => {
            const Predictions = response.data.results.filter((prediction: any) => {
                return prediction.types.includes('locality') || prediction.types.includes('administrative_area_level_1') || prediction.types.includes('country');
            });

            // Wrap the map function in another async function to wait for the promises to resolve before accessing the Cities array.
            async function fetchCityDetails(prediction: any) {
                const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${googleMapsAPIKey}&place_id=${prediction.place_id}`);
                const json = await response.json();

                const { lat, lng } = json.result.geometry.location;
                const countryCode = json
                    .result
                    .address_components
                    .find((component: {
                        types: string | string[];
                    }) => component.types.includes('country'))
                    .short_name;


                // Country Code to Country Name

                async function countryCodeToName(countryCode: string) {
                    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleMapsAPIKey}&components=country:${countryCode}`)
                        .then((response) => {
                            return response.data;
                        })
                        .catch((err) => {
                            console.log(err)
                            return "Unknown"
                        });


                    const countryName = typeof response === "string" ? response : response.results[0].address_components[0].long_name;

                    return countryName;
                }

                // Get the city's country from the address_components
                const cityCountry = await countryCodeToName(countryCode);

                // Find the timezone of the city
                const timeZone = find(lat, lng)[0];

                return {
                    id: prediction.place_id,
                    mainText: prediction.name,
                    secondaryText: cityCountry,
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



    return new Response(JSON.stringify(Cities), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}
