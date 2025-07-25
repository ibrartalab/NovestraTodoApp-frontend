import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { secrets } from "../config/secrets";

const { BACKEND_URL } = secrets;

const apiClient: AxiosInstance = axios.create({
  baseURL: BACKEND_URL, // Adjust the base URL as needed
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*", // Adjust CORS settings as needed
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Dynamic logout logic using this axios response middleware
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem("token");

      if (token) {
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        window.location.href = "/login";
      }
    } else {
      return;
    }
  }
);

export default apiClient;
