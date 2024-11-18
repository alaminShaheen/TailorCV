import axios, { AxiosInstance } from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.API_SERVICE_BASE_URL, // Replace with your API base URL
    headers: { 'Content-Type': 'application/json' }
});

export function addAxiosAuthHeader(token: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axiosInstance;