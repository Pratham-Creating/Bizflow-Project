import axios from 'axios';

// API base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api/',  // Change this to your backend URL
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('users/login', { email, password });
    return response.data;  // Returns user data
  } catch (error) {
    throw new Error('Error logging in');
  }
};
