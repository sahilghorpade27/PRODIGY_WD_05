import React, { useState, useEffect, useCallback } from "react";
import { Search, Droplets, Wind } from "lucide-react";
import "./weather.css";

export default function Tempapp() {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");

    const fetchApi = useCallback(async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.APIKEY}`;
        const response = await fetch(url);
        const resJson = await response.json();

        if (resJson.cod === 200) {
            setCity(resJson);
        } else {
            setCity(null);
        }
    }, [search]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const formatDate = (date) => {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className="weather-container">
            <div className="weather-app">
                <div className="weather-main">
                    <div className="weather-search-box">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                className="weather-search-bar"
                                placeholder="Search city..."
                                onChange={(event) => setSearch(event.target.value)}
                                value={search}
                            />
                            
                        </form>
                    </div>

                    {city ? (
                        <>
                            <div className="weather-location-box">
                                <div className="weather-location">{city.name}</div>
                                <div className="weather-date">{formatDate(Date.now())}</div>
                            </div>
                            <div className="weather-info-box">
                                <div className="weather-temp">{(city.main.temp - 273.15).toFixed(1)}°C</div>
                                <div className="weather-condition">{city.weather[0].description}</div>
                            </div>
                            <div className="weather-details">
                                <div className="weather-humidity">
                                    <Droplets className="weather-icon" />
                                    <span>Humidity: {city.main.humidity}%</span>
                                </div>
                                <div className="weather-wind">
                                    <Wind className="weather-icon" />
                                    <span>Wind Speed: {city.wind.speed} m/s</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="weather-not-found">City not found. Try again.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
