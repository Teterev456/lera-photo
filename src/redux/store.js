import { configureStore } from "@reduxjs/toolkit";

import booking from "./slices/bookingSlice";
import authorization from "./slices/authorizationSlice";
import toast from "./slices/toastSlice";
import profile from "./slices/profileSlice";

export const store = configureStore({
  reducer: { booking, authorization, toast, profile },
});
