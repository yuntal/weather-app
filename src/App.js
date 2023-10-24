import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TiWeatherCloudy, TiWeatherShower, TiWeatherSunny, TiWeatherPartlySunny, TiWeatherSnow } from 'react-icons/ti';
import './App.css';
import WeatherForecast from './components/WeatherForecast'; 
import SearchBar from './components/SearchBar';
import FavoritesCard from './components/FavoritesCard';
import WeatherCard from './components/WeatherCard';

const App = () => {
  const [city, setCity] = useState('Stavanger');
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [cityNotFound, setCityNotFound] = useState(false);
  const [blackAndWhiteMode, setBlackAndWhiteMode] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  const apiKey = 'f07267d125b8f9d6f26d71cee4f8d164';

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchWeatherData = async (cityName) => {
    try {
      const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${formattedCityName}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setCity(formattedCityName);
      setCityNotFound(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWeatherData(null);
      setCityNotFound(true);
    }
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
      case '01n':
        return <TiWeatherSunny size={32} />;
      case '02d':
      case '02n':
        return <TiWeatherPartlySunny size={32} />;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <TiWeatherCloudy size={32} />;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
      case '11d':
      case '11n':
        return <TiWeatherShower size={32} />;
      case '13d':
      case '13n':
        return <TiWeatherSnow size={32} />;
      case '50d':
      case '50n':
        return <TiWeatherCloudy size={32} />;
      default:
        return <TiWeatherPartlySunny size={32} />;
    }
  };
  

  const toggleFavorite = async (cityName) => {
    const newCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  
    try {
      await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${apiKey}`
      );
  
      setFavorites(prevFavorites => {
        const updatedFavorites = prevFavorites.includes(newCity)
          ? prevFavorites.filter(city => city !== newCity)
          : [...prevFavorites, newCity];
  
        if (city === cityName) {
          fetchWeatherData(newCity);
        }
  
        return updatedFavorites;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Invalid city name. Please enter a valid city name.');
    }
  };

  const toggleNightMode = () => {
    setNightMode(!nightMode);
    setBlackAndWhiteMode(true);
  
    if (nightMode) {
      document.body.classList.remove('white-mode');
    } else {
      document.body.classList.add('white-mode');
    }
  };
  
  const toggleRegularMode = () => {
    setNightMode(false);
    setBlackAndWhiteMode(false);
    document.body.classList.remove('white-mode');
  };

  const blackAndWhiteStyles = blackAndWhiteMode ? {
    filter: 'grayscale(100%)',
    background: 'white',
    color: 'black'
  } : {};

  return (
    <div className={`app ${nightMode ? 'night-mode' : ''}`} style={blackAndWhiteStyles}>
      <div className="row">
        <div className="card big-card">
          <SearchBar
            city={city}
            setCity={setCity}
            fetchWeatherData={fetchWeatherData}
            nightMode={nightMode}
            toggleRegularMode={toggleRegularMode}
            toggleNightMode={toggleNightMode}
          />
        </div>
      </div>
      <div className="row-one">
        <FavoritesCard
          favorites={favorites}
          city={city}
          setCity={setCity}
        />
        <WeatherCard
          weatherData={weatherData}
          getWeatherIcon={getWeatherIcon}
          city={city}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      </div>
      <div className="row-two">
        <div className="big-card-two">
          {cityNotFound ? (
            <p>City not found</p>
          ) : (
            <WeatherForecast city={city} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
