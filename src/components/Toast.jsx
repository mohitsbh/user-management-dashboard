import React, { useEffect } from 'react';
import './Toast.css';

/**
 * Toast component - displays temporary notification messages
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'success', 'error', 'info' (default: 'info')
 * @param {Function} onClose - Callback function when toast closes
 * @param {number} duration - Duration in ms before auto-close (default: 3000)
 */
const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`} role="alert">
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
};

export default Toast;
