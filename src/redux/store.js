import { configureStore } from "@reduxjs/toolkit";

import booking from "./slices/bookingSlice";
import authorization from "./slices/authorizationSlice";
import toast from "./slices/toastSlice";
import profile from "./slices/profileSlice";
import chat from "./slices/chatSlice";
import admin from "./slices/adminSlice";

export const store = configureStore({
  reducer: { booking, authorization, toast, profile, chat, admin },
});
