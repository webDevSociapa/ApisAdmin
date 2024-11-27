import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://apis-admin-dm.vercel.app/', // Use the base URL from .env file
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
