import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner component - displays a loading animation
 * @param {string} message - Optional loading message to display
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
