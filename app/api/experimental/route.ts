export async function GET(
    request: Request,
    response: Response
) {
    // Debug the Environment Variables

    const EnvironmentVariables = {
        Environement: {
            // API KEYS
            ApiKeys: {
                GOOGLE_MAPS_API_KEY:
                    process.env.GOOGLE_MAPS_API_KEY,
                WEATHER_API_KEY:
                    process.env.WEATHER_API_KEY,
                OPEN_WEATHER_API_KEY:
                    process.env.OPEN_WEATHER_API_KEY,
            },
            // NEXTAUTH
            NextAuth: {
                NEXTAUTH_URL:
                    process.env.NEXTAUTH_URL,
                NEXTAUTH_SECRET:
                    process.env.NEXTAUTH_SECRET,
                Providers: {
                    // Google
                    Google: {
                        GOOGLE_CLIENT_ID:
                            process.env.GOOGLE_CLIENT_ID,
                        GOOGLE_CLIENT_SECRET:
                            process.env.GOOGLE_CLIENT_SECRET,
                    },
                    GitHub: {
                        // GITHUB
                        GITHUB_CLIENT_ID:
                            process.env.GITHUB_CLIENT_ID,
                        GITHUB_CLIENT_SECRET:
                            process.env.GITHUB_CLIENT_SECRET,
                    }
                }
            },
        }
    }


    return new Response(JSON.stringify(EnvironmentVariables), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })
}