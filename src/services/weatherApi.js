const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city, units = "metric", signal) {
    if (!API_KEY) {
        throw new Error("Weather API key is missing. Check your .env.local file.:");
    }
    const url = new URL(`${BASE_URL}/weather`);

    if (typeof city === "object" && city !== null) {
        url.searchParams.set("lat", city.lat);
        url.searchParams.set("lon", city.lon);
    } else {
        url.searchParams.set("q", city);
    }
    url.searchParams.set("appid", API_KEY);
    url.searchParams.set("units", units);

    const response = await fetch(url, { signal });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`City "${city}" not found.`);
        }

        if (response.status === 401) {
            throw new Error("The weather API key is invalid or not active yet.");
        }

        if (response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
        }

        throw new Error("Unable to retrieve weather data. Please try again later.");
    }
    return response.json();
}

export async function getForecast(city, units = "metric", signal) {
    if (!API_KEY) {
        throw new Error("Weather API key is missing. Check your .env.local file.");
    }

    const url = new URL(`${BASE_URL}/forecast`);

    if (typeof city === "object" && city !== null) {
        url.searchParams.set("lat", city.lat);
        url.searchParams.set("lon", city.lon);
    } else {
        url.searchParams.set("q", city);
    }
    url.searchParams.set("appid", API_KEY);
    url.searchParams.set("units", units);

    const response = await fetch(url, { signal });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Forecast unavailable for that city.");
        }

        if (response.status === 401) {
            throw new Error("The weather API key is invalid or not active yet.");
        }

        if (response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
        }

        throw new Error("Unable to retrieve the forecast. Please try again later.");
    }
    return response.json();
}

export async function searchLocations(query, signal) {
    if (!API_KEY) {
        throw new Error("Weather API key is missing.");
    }

    const url = new URL("https://api.openweathermap.org/geo/1.0/direct");

    url.searchParams.set("q", query);
    url.searchParams.set("limit", "5");
    url.searchParams.set("appid", API_KEY);

    const response = await fetch(url, { signal });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("The weather API key is invalid or not active.");
        }

        throw new Error("Unable to search for locations.");
    }

    return response.json();
}