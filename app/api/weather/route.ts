export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const cityId = searchParams.get('cityId')

    const cityWeather = "The Weather in " + cityId + " is Sunny and 25 degrees Celsius"

    return {
        body: JSON.stringify(cityWeather),
        headers: {
            'Content-Type': 'application/json'
        }
    }
}