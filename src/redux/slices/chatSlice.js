import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBookingMessages, sendBookingMessage } from "../../services/api";

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (bookingId) => {
    const response = await getBookingMessages(bookingId);
    return { bookingId, messages: response.data };
  }
);

export const postMessage = createAsyncThunk(
  "chat/postMessage",
  async ({ bookingId, text }) => {
    const response = await sendBookingMessage(bookingId, text);
    return { bookingId, message: response.data };
  }
);

const initialState = {
  entities: {},
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearMessages: (state, action) => {
      delete state.entities[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { bookingId, messages } = action.payload;
        state.entities[bookingId] = messages;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        const { bookingId, message } = action.payload;
        if (!state.entities[bookingId]) {
          state.entities[bookingId] = [];
        }
        state.entities[bookingId].push(message);
      });
  },
});

export const { clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
