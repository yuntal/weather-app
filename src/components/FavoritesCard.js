import React from 'react';

const FavoritesCard = ({ favorites, city, setCity }) => {
  return (
    <div className="card favorites-card" id="favorite">
      <h2>Favorites</h2>
      {favorites.map((fav, index) => (
        <div 
          key={index} 
          className={`favorite ${city === fav ? 'active' : ''}`}
          onClick={() => setCity(fav)}
        >
          <span>{fav.charAt(0).toUpperCase() + fav.slice(1)}</span>
        </div>
      ))}
    </div>
  );
};

export default FavoritesCard;
