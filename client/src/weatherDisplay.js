/**import React, { useState, useEffect } from 'react';
import fetchWeather from './server/weatherAPI';

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
        <p>
          Temperature: {weather.temperature}°C, Weather: {weather.description}
        </p>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherDisplay;**/