import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createBooking = (data) => api.post("bookings/", data);
export const getBookings = () => api.get("bookings/");
export const getBlockedDates = () => api.get("blocked-dates/");
export const login = (credentials) => api.post("login/", credentials);
export const logout = () => api.post("logout/", {});
export const register = (userData) => api.post("register/", userData);
export const refreshToken = () => api.post("login/refresh/", {});
export const getCurrentUser = () => api.get("/user/");

export default api;
