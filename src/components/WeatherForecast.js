import React, { useState, useEffect } from 'react';
import { TiWeatherSunny, TiWeatherShower, TiWeatherCloudy, TiWeatherPartlySunny } from 'react-icons/ti';

const WeatherForecast = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'f07267d125b8f9d6f26d71cee4f8d164';

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error:', error));
  }, [apiKey, city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
      case '01n':
        return <TiWeatherSunny size={32} />;
      case '10d':
      case '10n':
        return <TiWeatherShower size={32} />;
      case '13d':
      case '13n':
        return <TiWeatherCloudy size={32} />;
      default:
        return <TiWeatherPartlySunny size={32} />;
    }
  };

  return (
    <div>
      <h1>Weather Forecast for {city}</h1>
      <div className="forecast-container">
        {weatherData.list && weatherData.list.map((day, index) => {
          if (index % 8 === 0) {
            const date = new Date(day.dt * 1000);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
            return (
              <div key={index} className="forecast-day">
                <div className="date">{formattedDate}</div>
                <div className="weather-icon" style={{ fontSize: '2em' }}>
                  {getWeatherIcon(day.weather[0].icon)}
                </div>
                <div className="temperature">
                  <p className="max"> max</p>
                  {Math.round(day.main.temp_max)} °C
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;
