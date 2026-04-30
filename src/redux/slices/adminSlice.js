import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchAllBookings = createAsyncThunk(
  "admin/fetchAllBookings",
  async (params = {}) => {
    const response = await api.get("/admin/bookings/", { params });
    return response.data;
  }
);

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
