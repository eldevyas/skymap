import { CityType } from "@/app/context";
import lookup from "country-code-lookup";
import countriesAndTimezones from "countries-and-timezones";

export async function GET(
    request: Request,
    response: Response
) {
    // Analyse the request parameters
    const { searchParams } = new URL(request.url)

    const searchQuery = searchParams.get('query')

    // The Query Could be a String (City Name) or an Coordinates (Latitude and Longitude), or auto:ip (Get the user's location from the IP address).

    // If the query is a string, it is a city name
    let isString = typeof searchQuery === 'string';

    // If the query is an object, it is latitude and longitude (e.g. /location?query=123,456)
    let isCoordinates = false;
    if (searchQuery !== null) {
        // If it's Longitude and Latitude, it should be in the format of 123,456
        const queryArray = searchQuery.split(',');
        if (queryArray.length === 2) {
            const latitude = parseFloat(queryArray[0]);
            const longitude = parseFloat(queryArray[1]);
            if (!isNaN(latitude) && !isNaN(longitude)) {
                isCoordinates = true;
                isString = false;
            }
        }
    }

    // If the query is auto:ip, get the user's location from the IP address
    let isAuto = searchQuery === 'auto:ip';

    // If the query is empty, get the user's location from the IP address
    let isEmpty = searchQuery === '' || searchQuery === null;

    // Start Searching for the city
    const weatherApiKey = process.env.WEATHER_API_KEY;

    let weatherApiResponse: any = [];
    let skymapApiResponse: CityType[] = [];

    switch (true) {
        case isString:
            const Response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${searchQuery}&aqi=no`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Data from Weather API is: ", data);
                    return data;
                })
                .catch((error) => {
                    console.error("Error fetching city details from Weather API: ", error)
                    return [];
                });

            weatherApiResponse = Response;
            break;
        case isCoordinates:
            const queryArray = searchQuery ? searchQuery.split(',') : [];
            const latitude = parseFloat(queryArray[0]);
            const longitude = parseFloat(queryArray[1]);
            weatherApiResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${latitude},${longitude}&aqi=no`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Data from Weather API is: ", data);
                    return data;
                })
                .catch((error) => {
                    console.error("Error fetching city details from Weather API: ", error)
                    return [];
                });
            break;
        case isAuto:
        case isEmpty:
            weatherApiResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=auto:ip&aqi=no`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("Data from Weather API is: ", data);
                    return data;
                })
                .catch((error) => {
                    console.error("Error fetching city details from Weather API: ", error)
                    return [];
                });
            break;
        default:
            break;
    }

    // Shape the response Object to match the desired format
    skymapApiResponse = weatherApiResponse.map((city: {
        id: string;
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        url: string;
    }) => {
        const countryCode: string = lookup.byCountry(city.country)?.iso2 || "Unknown Country Code";
        const countryName = city.country || null;
        const timezones = countriesAndTimezones.getTimezonesForCountry(countryCode);
        const timeZone = timezones?.[0]?.name ?? null;

        // If Something is missing, return null
        if (!city.id || !city.name || !city.country || !city.lat || !city.lon || !timeZone) {
            return;
        }

        return {
            id: city.id,
            mainText: city.name,
            secondaryText: city.region ? `${city.region}, ${countryName}` : countryName,
            countryCode: countryCode,
            latitude: city.lat,
            longitude: city.lon,
            timeZone: timeZone,
        }
    });

    // Remove null values
    skymapApiResponse = skymapApiResponse.filter((city) => city !== null);

    return new Response(JSON.stringify(
        skymapApiResponse
    ), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}