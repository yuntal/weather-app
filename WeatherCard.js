// WeatherCard.js
import React from 'react';
import WeatherIcon from './WeatherIcon';
import { FaStar, FaRegStar } from 'react-icons/fa';

const WeatherCard = ({ cityName, description, icon, isFavorite, onToggleFavorite }) => {
  return (
    <div>
      <h2>{cityName}</h2>
      <p>{description}</p>
      <WeatherIcon icon={icon} />
      <span 
        className="favorite-star"
        onClick={onToggleFavorite}
      >
        {isFavorite
          ? <FaStar color="#FFD700" size={20} style={{ marginLeft: '4px', cursor: 'pointer' }} />
          : <FaRegStar color="#000000" size={20} style={{ marginLeft: '4px', cursor: 'pointer' }} />
        }
      </span>
    </div>
  );
};

export default WeatherCard;
