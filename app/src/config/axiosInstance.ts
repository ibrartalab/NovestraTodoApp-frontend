import axios, { type AxiosInstance } from "axios";
import { secrets } from "./secrets";

const { BACKEND_URL } = secrets;

// Create an Axios instance for API requests
// This instance can be customized with interceptors, base URL, and headers
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL, // Adjust the base URL as needed
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*", // Adjust CORS settings as needed
  },
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// //Dynamic logout logic using this axios response middleware
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       const token = localStorage.getItem("token");

//       if (token) {
//         localStorage.removeItem("username");
//         localStorage.removeItem("token");

//         window.location.href = "/login";
//       }
//     } else {
//       return;
//     }
//   }
// );

// export default axiosInstance;
