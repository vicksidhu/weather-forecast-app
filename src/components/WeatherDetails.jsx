function WeatherDetails({ weather, units }) {
    const windUnit = units === "metric" ? "m/s" : "mph";
    
    //OpenWeatherMap returns visibilty in metres.
    const visibilityInKm = weather.visibility / 1000;
    const visibilityInMiles = weather.visibility / 1069.344;

    const visibility = 
    units === "metric"
    ? `${visibilityInKm.toFixed(1)}km`
    : `${visibilityInMiles.toFixed(1)}mi`;

    const details = [
        {
            label: "Feels like",
            value: `${Math.round(weather.main.feels_like)}°`,
        },
        {
            label: "Humidity",
            value: `${weather.main.humidity}%`,
        },
        {
            label: "Wind speed",
            value: `${weather.wind.speed}${windUnit}`,
        },
        {
            label: "Pressure",
            value: `${weather.main.pressure}hPa`,
        },
        {
            label: "Visibility",
            value: visibility,
        },
    ];

    return (
        <div className="weather-stats">
            {details.map((detail) => (
                <div className="weather-stat" key={detail.label}>
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                </div>
            ))}
        </div>
    );
}

export default WeatherDetails;