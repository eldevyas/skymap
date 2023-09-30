import { createClient } from "@google/maps";
import toast from "react-hot-toast";
import { CityType } from "../context";
import axios from "axios";

export async function getUserLocationWithCoordinates(): Promise<CityType> {
    const googleMapsAPIKey: string | null = process.env.GOOGLE_MAPS_API_KEY || "AIzaSyCQe29u1Q8RryIv57m22J0XVu6CygHa8Q4";

    // Only run this function if the Google Maps API Key is set
    if (googleMapsAPIKey === ""
        || googleMapsAPIKey === undefined
        || googleMapsAPIKey === null
    ) {
        return Promise.reject(new Error("Google Maps API Key is not set."));
    }

    if ("geolocation" in navigator) {
        // Prompt user for permission to access their location
        return new Promise(async (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                // Success callback function
                async (position) => {
                    // Get the user's latitude and longitude coordinates
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    // Get the user's city and country based on their latitude and longitude coordinates
                    await axios.get(`/api/cities/coordinates?latitude=${lat}&longitude=${lng}`).
                        then((response) => {
                            // Get the first city from the response
                            const city = response.data[0];

                            // Resolve the city
                            resolve(city);
                        }).catch
                        ((error) => {
                            // Log the error
                            console.log("Error getting user's location through API Service: ", error);

                            reject(error);
                        });
                },
                // Error callback function
                (error) => {
                    // Reject the promise with the error
                    reject(error);
                }
            );
        });
    } else {
        return Promise.reject(new Error("Geolocation is not supported by this browser."));
    }
}
