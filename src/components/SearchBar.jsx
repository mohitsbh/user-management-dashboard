import React, { useState, useEffect } from 'react';
import './SearchBar.css';

/**
 * SearchBar component with debounced search functionality
 * @param {Function} onSearch - Callback function called with search query
 * @param {string} placeholder - Placeholder text for input
 */
const SearchBar = ({ onSearch, placeholder = 'Search...' }) => {
  const [query, setQuery] = useState('');

  // Debounce search with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        aria-label="Search users"
      />
      {query && (
        <button
          className="search-clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
