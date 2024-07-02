import axios from 'axios';
import Cookies from 'js-cookie';
import { store } from '../../Stores/store.js';
import { logout } from '../../Slices/authSlice.js';
// initializing the axios instance with custom configs
const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000",

});


api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('Token'); // Retrieve the token from the cookies
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for API responses
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // Attempt to refresh token if the request is unauthorized (401)
        if (error.response.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default api;