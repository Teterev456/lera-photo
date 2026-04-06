import { configureStore } from "@reduxjs/toolkit";
import booking from "./slices/bookingSlice";

export const store = configureStore({
  reducer: { booking },
});
