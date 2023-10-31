const API_KEY = '416da157ae34fd8045d2e2965c01e2e9';

const fetchWeather = async () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=39.412327&lon=77.425461&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();
    return {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
    };
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};

export default fetchWeather;
