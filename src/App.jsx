import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { useWeather } from "./hooks/useWeather";
import "./App.css";

function App() {
  const [units, setUnits] = useState("metric");
  const [lastCity, setLastCity] = useState("");
  const [showForecast, setShowForecast] = useState(false);


  const { weather, forecast, loading, error, searchWeather } = useWeather();

  function handleSearch(city) {
    setLastCity(city);
    setShowForecast(false); // hide forecast until user clicks the button
    searchWeather(city, units);
  }

  function handleUnitChange(nextUnits) {
    if (nextUnits === units) return;
    setUnits(nextUnits);

    if (lastCity) {
      searchWeather(lastCity, nextUnits);
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Sky4Cast</h1>
          <p>Weather forecasts</p>
        </div>

        <div className="unit-toggle" aria-label="Temperature unit">
          <button type="button" className={units === "metric" ? "active" : ""}
            aria-pressed={units === "metric"}
            onClick={() => handleUnitChange("metric")}>
            °C
          </button>

          <button type="button" className={units === "imperial" ? "active" : ""}
            aria-pressed={units === "imperial"}
            onClick={() => handleUnitChange("imperial")}>
            °F
          </button>
        </div>
      </header>

      <section className="welcome">
        <h2>Discover your local forecast.</h2>
        <p> Search for a city to explore its weather conditions.</p>
      </section>

      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && (<p className="error-message" role="alert">{error}</p>)}
      {loading && (<p className="status-message" role="status">Fetching weather data...</p>)}
      {weather && !error && (
        <>
          <CurrentWeather weather={weather} units={units} />

          {!showForecast && (
            <button
              type="button"
              className="show-forecast-btn"
              onClick={() => setShowForecast(true)}>
              Show 5-day forecast
            </button>
          )}
        </>
      )}
      {showForecast && forecast && !error && (
        <Forecast forecast={forecast} units={units} />)}
    </main>
  );
}

export default App
