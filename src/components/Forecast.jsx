import { getDailyForecast } from "../utils/forecastUtils";

function Forecast({ forecast, units}) {
    const days = getDailyForecast(forecast);
    const unitLabel = units === "metric" ? "C" : "F";

    if (days.length === 0) {
        return null;
    }

    return (
        <section className="forecast-section">
            <h2>Five-day forecast</h2>

            <div className="forecast-grid">
                {days.map((day) => (
                    <article className="forecast-card" key={day.date}>
                        <h3>
                            {new Date(`${day.date}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric"})}
                        </h3>

                        <img src= {`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              width="64"
              height="64"
              />

              <p className="forecast-temperature">
                {Math.round(day.temperature)}°{unitLabel}
              </p>

              <p className="description">{day.description}</p>
              <p className="forecast-humidity">Humidity: {day.humidity}%</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Forecast