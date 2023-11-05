import React, { useState, useEffect } from 'react';
import fetchWeather from './weatherAPI.js';

const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const weatherData = await fetchWeather();
        setWeather(weatherData);
      } catch (error) {
        console.error(error.message);
      }
    };

    getWeatherData();
  }, []);

  return (
    <div>
      {weather ? (
        <p className="info">
          <strong>Temperature: </strong>{weather.temperature}°F, <strong>Weather: </strong>{weather.description}
        </p>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherDisplay;