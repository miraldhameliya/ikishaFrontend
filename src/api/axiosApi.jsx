import axios from "axios";
import { baseUrl } from "./baseUrl";

export const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
    
    
});
console.log(`API instance created with base URL: ${baseUrl}`);

// Add request interceptor
apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('rememberMe');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
); 