import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentWeather, getForecast } from "../services/weatherApi";

export function useWeather() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const controllerRef = useRef(null);

    const searchWeather = useCallback(async (location, units = "metric") => {
        const validLocation =
        typeof location === "string"
        ? location.trim().length > 0
        : location &&
        Number.isFinite(Number(location.lat)) &&
        Number.isFinite(Number(location.lon));

        if (!validLocation) {
            setError("Please enter a valid location.");
            return;
        }

        //Cancel any ongoing request.
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError("");

        //Clear data from the previous city or unit system.
        setWeather(null);
        setForecast(null);

        try {
            const [currentData, forecastData] = await Promise.all([
                getCurrentWeather(location, units, controller.signal),
                getForecast(location, units, controller.signal),
            ]);

            setWeather(currentData);
            setForecast(forecastData);
        } catch (err) {
            if (err.name === "AbortError") {
                return;
            }
            setError(err.message || "Something went wrong while fetching the weather data.");
        } finally {
            if (controllerRef.current === controller) {
                controllerRef.current = null;
                setLoading(false);
            }
        }
    },
        []);

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    },
        []);

    return {
        weather,
        forecast,
        loading,
        error,
        searchWeather,
    };
}