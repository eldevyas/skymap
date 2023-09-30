import { createClient } from "@google/maps";
import toast from "react-hot-toast";
import { CityType } from "../context";
import axios from "axios";

// Get the user's location based on their coordinates
export async function getUserLocationWithCoordinates(): Promise<CityType> {
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
                    try {
                        const response = await axios.get(`/api/cities/coordinates?latitude=${lat}&longitude=${lng}`);
                        const city = response.data[0];

                        // Resolve the city
                        resolve(city);
                    } catch (error) {
                        // Log the error
                        console.log("Error getting user's location through API Service: ", error);

                        // Reject the promise with the error
                        reject(error);
                    }
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

// Get the location of the user based on their IP address
export async function getUserLocationWithIP(): Promise<CityType> {
    return new Promise(async (resolve, reject) => {
        // Get the user's city and country based on their latitude and longitude coordinates
        try {
            const response = await axios.get(`/api/cities/ip-geolocation`);
            const city = response.data[0];

            // Resolve the city
            resolve(city);
        } catch (error) {
            // Log the error
            console.log("Error getting user's location through API Service: ", error);

            // Reject the promise with the error
            reject(error);
        }
    });
}
