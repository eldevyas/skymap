// app/api/cities/route.ts

import { CityType } from "@/app/context";
import axios from "axios";
import Fuse from "fuse.js";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')

    const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

    const Cities: CityType[] = await axios
        .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.GOOGLE_MAPS_API_KEY}&location=${latitude},${longitude}&radius=5000`)
        .then(async (response) => {
            const Predictions = response.data.results.filter((prediction: any) => {
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
                    mainText: prediction.name,
                    secondaryText: prediction.vicinity,
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



    return new Response(JSON.stringify(Cities), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}
