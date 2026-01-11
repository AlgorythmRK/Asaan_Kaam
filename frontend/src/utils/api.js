import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
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
