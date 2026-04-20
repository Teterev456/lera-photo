import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createBooking = (data) => api.post("bookings/", data);
export const getUserBookings = () => api.get("bookings/");
export const getBlockedDates = () => api.get("blocked-dates/");
export const login = (credentials) => api.post("login/", credentials);
export const logout = () => api.post("logout/", {});
export const register = (userData) => api.post("register/", userData);
export const refreshToken = () => api.post("login/refresh/", {});
export const getCurrentUser = () => api.get("/user/");
export const getBookingTypes = () => api.get("categories/");

export default api;
