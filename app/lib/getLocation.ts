interface LocationSettings {
    enableHighAccuracy: boolean;
    query?: string | { latitude: number, longitude: number } | null;
}


export function getLocation({ enableHighAccuracy, query }: LocationSettings) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Got position: ", position);
                resolve(position);
            },
            (error) => {
                console.error("Error getting position: ", error);
                reject(error);
            },
            {
                enableHighAccuracy,
                ...(query ? { query } : {})
            }
        );
    });
}