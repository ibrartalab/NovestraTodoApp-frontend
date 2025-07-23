import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { secrets } from "../config/secrets";

const {BACKEND_URL} = secrets;

const apiClient: AxiosInstance = axios.create({
    baseURL: BACKEND_URL, // Adjust the base URL as needed
    timeout: 10000, // Set a timeout for requests
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*", // Adjust CORS settings as needed
    },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default apiClient;