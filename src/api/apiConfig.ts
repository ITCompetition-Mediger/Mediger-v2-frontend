import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ ERROR:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
