import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUserBookings } from "../../services/api";

const initialState = {
  userBookings: [],
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.userBookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserBookings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUser",
  async () => {
    const response = await getUserBookings();
    return response.data;
  }
);

//export const {} = profileSlice.actions;
export default profileSlice.reducer;
