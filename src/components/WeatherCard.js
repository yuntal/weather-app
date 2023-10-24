import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const WeatherCard = ({ weatherData, getWeatherIcon, city, toggleFavorite, favorites }) => {
  return (
    <div className="card weather-card" id="weather">
      <h2>
        <div className="weather-icon">
          {getWeatherIcon(weatherData?.weather[0].icon)}
        </div>
        <span>{weatherData ? `${weatherData.name}, ${weatherData.sys.country}` : 'Loading...'}</span>
        <span
          className="favorite-star"
          onClick={() => toggleFavorite(city)}
        >
          {favorites.includes(city) ? (
            <FaStar color="#FFD700" size={20} style={{ marginLeft: '4px', cursor: 'pointer' }} />
          ) : (
            <FaRegStar color="#FFD700" size={20} style={{ marginLeft: '4px', cursor: 'pointer' }} />
          )}
        </span>
      </h2>
      {weatherData && (
        <div>
          <p style={{ display: 'inline' }}>
            {weatherData.weather[0].description}
          </p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
