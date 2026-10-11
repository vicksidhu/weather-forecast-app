import WeatherDetails from "./WeatherDetails";

function CurrentWeather({weather, units}) {
    const temperatureUnit = units === "metric" ? "C" : "F";

    return (
        <section className="weather-card" aria-label="Current weather">
            <div className="current-weather-heading">
                <div>
                    <h2>
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <p className="description">
                        {weather.weather[0].description}
                    </p>
                </div>

                <img className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                />
            </div>

            <p className="temperature">
                {Math.round(weather.main.temp)}°{temperatureUnit}
            </p>
            <p className="feels-like">
                Feels like {Math.round(weather.main.feels_like)}°{temperatureUnit}
            </p>

            <WeatherDetails weather={weather} units={units} />
        </section>
    );
}

export default CurrentWeather;