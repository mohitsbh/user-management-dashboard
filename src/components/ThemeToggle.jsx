import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

/**
 * ThemeToggle component - button to switch between light and dark themes
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="theme-toggle-track">
        <span className="theme-icon sun-icon">☀️</span>
        <span className="theme-icon moon-icon">🌙</span>
        <div className={`theme-toggle-thumb ${theme}`}></div>
      </div>
    </button>
  );
};

export default ThemeToggle;
