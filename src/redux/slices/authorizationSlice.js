import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
  error: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isAdmin = action.payload?.is_staff || false;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, setError, logout } =
  authSlice.actions;
export default authSlice.reducer;
