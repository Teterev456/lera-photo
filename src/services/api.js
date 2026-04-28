import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
});

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

export const login = (credentials) => publicApi.post("login/", credentials);
export const register = (userData) => publicApi.post("register/", userData);

export const createBooking = (data) => api.post("bookings/", data);
export const getUserBookings = () => api.get("bookings/");
export const getBlockedDates = () => api.get("blocked-dates/");
export const logout = () => api.post("logout/", {});
export const refreshToken = () => api.post("login/refresh/", {});
export const getCurrentUser = () => api.get("/user/");
export const getBookingTypes = () => api.get("categories/");
export const getBookingMessages = (bookingId) =>
  api.get(`/bookings/${bookingId}/messages/`);
export const sendBookingMessage = (bookingId, text) =>
  api.post(`/bookings/${bookingId}/messages/`, { text });
export const updateUserProfile = (data) => api.patch("/user/update/", data);
export const sendContactMessage = (data) => api.post("/contact/", data);

export default api;
