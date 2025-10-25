import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchUsers } from '../services/api';

const UsersContext = createContext();

/**
 * Custom hook to access Users Context
 */
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};

/**
 * UsersProvider component to manage global user state
 * Handles fetching API users and managing locally added users with localStorage persistence
 */
export const UsersProvider = ({ children }) => {
  const [apiUsers, setApiUsers] = useState([]);
  const [localUsers, setLocalUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load locally added users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('localUsers');
    if (storedUsers) {
      try {
        setLocalUsers(JSON.parse(storedUsers));
      } catch (err) {
        console.error('Error parsing stored users:', err);
      }
    }
  }, []);

  // Fetch users from API on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const users = await fetchUsers();
        setApiUsers(users);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  /**
   * Add a new user to local state and persist to localStorage
   * @param {Object} user - User object to add
   */
  const addUser = (user) => {
    // Generate a unique ID based on max existing ID + 1
    const allUsers = [...apiUsers, ...localUsers];
    const maxId = allUsers.reduce((max, u) => Math.max(max, u.id), 0);
    const newUser = { ...user, id: maxId + 1 };

    const updatedLocalUsers = [...localUsers, newUser];
    setLocalUsers(updatedLocalUsers);

    // Persist to localStorage
    localStorage.setItem('localUsers', JSON.stringify(updatedLocalUsers));

    return newUser;
  };

  // Combine API users and local users
  const allUsers = [...localUsers, ...apiUsers];

  const value = {
    users: allUsers,
    apiUsers,
    localUsers,
    loading,
    error,
    addUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
