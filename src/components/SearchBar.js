import React from 'react';
import { FaSearch, FaMoon } from 'react-icons/fa';

const SearchBar = ({ city, setCity, fetchWeatherData, nightMode, toggleRegularMode, toggleNightMode }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchWeatherData(city);
      }}
      className="search-bar"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city"
      />
      <button type="submit" style={{ background: 'black', border: 'none' }}>
        <FaSearch size={16} color="#fff" />
      </button>
      <button onClick={nightMode ? toggleRegularMode : toggleNightMode} className="toggle-button">
        {nightMode ? <FaMoon color="#fff" /> : <FaMoon color="#fff" />}
      </button>
    </form>
  );
};

export default SearchBar;
