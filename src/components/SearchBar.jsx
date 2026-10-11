import { useState } from "react";
import { searchLocations } from "../services/weatherApi";

function SearchBar({ onSearch, loading }) {
    const [city, setCity] = useState("");
    const [locations, setLocations] = useState([]);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState("");


    async function handleSubmit(event) {
        event.preventDefault();

        const query = city.trim();
        if (!query) {
            setError("Please enter a city name.")
            return;
        }

        setSearching(true);
        setError("");
        setLocations([]);

        try {
            const results = await searchLocations(query);

            if (results.length === 0) {
                setError("No matching locations found.");
                return;
            }

            setLocations(results);
        } catch (err) {
            setError(err.message || "Unable to search for locations.");
        } finally {
            setSearching(false);
        }
    }

    function handleLocationSelect(location) {
        onSearch(location);
        setLocations([]);
        setCity(`${location.name},${location.country}`);
        setError("");
    }

    return (
        <div className="search-container">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name, e.g. Vancouver"
                    value={city}
                    onChange={(event) => {
                        setCity(event.target.value);
                        setLocations([]);
                        setError("");
                    }}
                    aria-label="City name"
                />
                <button type="submit" disabled={loading || !city.trim()}>
                    {searching ? "Finding..." : loading ? "Loading..." : "Search"}
                </button>
            </form>

            {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {locations.length > 0 && (
        <div className="location-results" aria-label="Matching locations">
          <p>Select the correct location:</p>

          {locations.map((location) => (
            <button
              type="button"
              className="location-option"
              key={`${location.lat}-${location.lon}`}
              onClick={() => handleLocationSelect(location)}
            >
              <span>{location.name}</span>
              <span>
                {[location.state, location.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </button>
          ))}
        </div>
      )}
        </div>
    );
}

export default SearchBar;