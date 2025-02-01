import axios from 'axios';

const baseURL = 'http://localhost:8000/api/v1';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

// Add a request interceptor (optional)
axiosInstance.interceptors.request.use(
    (config) => {
        // Add any request modifications here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;