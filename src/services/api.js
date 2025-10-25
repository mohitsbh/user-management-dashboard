import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch all users from the API
 * @returns {Promise<Array>} Array of user objects
 */
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Fetch a single user by ID
 * @param {number} userId - The ID of the user to fetch
 * @returns {Promise<Object>} User object
 */
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};
