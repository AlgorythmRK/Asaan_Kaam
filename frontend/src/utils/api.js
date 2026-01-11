import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor to add JWT token to every request
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('restaurantHub_currentUser'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
