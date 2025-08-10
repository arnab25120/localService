import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // so refreshToken cookie is sent
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired and not already retried
    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      error?.response?.data?.message !== "Invalid user credentials"
    ) {
      originalRequest._retry = true;
      try {
        // Try to refresh access token
        await axiosInstance.get("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid → auto logout
        useAuthStore.getState().logout();
        toast.error("Session expired. Please login again.");
        window.location.href = "/login"; // hard redirect
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
