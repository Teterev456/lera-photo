import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const createBooking = (data) => api.post("/bookings/", data);
export const getBookings = () => api.get("/bookings/");
export const getBlockedDates = () => api.get("/blocked-dates/");
