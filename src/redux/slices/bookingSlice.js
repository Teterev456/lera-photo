import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getBookingTypes } from "../../services/api";

const initialState = {
  sessionTypes: [],
  loading: false,
  timeSlots: ["9:00", "13:00", "17:00", "20:00"],

  chosenTypeId: 0,
  chosenDate: "-",
  chosenTime: "-",
  allPhoto: false,
  chosenCountPeople: 2,
  chosenReportHours: 2,
  price: 0,
  extraInfo: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setType(state, action) {
      state.chosenTypeId = action.payload;
    },
    setDate(state, action) {
      state.chosenDate = action.payload;
    },
    setTime(state, action) {
      state.chosenTime = action.payload;
    },
    setPrice(state, action) {
      if (state.chosenTypeId === 0) {
        state.price = 0;
      } else if (state.chosenTypeId === 1) {
        state.price = 4000;
      } else if (state.chosenTypeId === 2) {
        state.price = 5000;
        if (state.chosenCountPeople > 2) {
          state.price += 1000;
          if (state.chosenCountPeople > 3) {
            state.price += 500 * (state.chosenCountPeople - 3);
          }
        }
      } else if (state.chosenTypeId === 3) {
        state.price = 3000 * state.chosenReportHours;
      }

      if (state.allPhoto === true) {
        state.price += 1000;
      }
    },
    setAllPhoto(state, action) {
      state.allPhoto = action.payload;
    },
    setChosenCountPeople(state, action) {
      state.chosenCountPeople = action.payload;
    },
    setChosenReportHours(state, action) {
      state.chosenReportHours = action.payload;
    },
    setExtraInfo(state, action) {
      state.extraInfo = action.payload;
    },
    clearInfo(state) {
      state.chosenTypeId = "-";
      state.chosenDate = "-";
      state.chosenTime = "-";
      state.allPhoto = false;
      state.extraInfo = "";
      state.chosenCountPeople = 2;
      state.chosenReportHours = 2;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.sessionTypes = action.payload;
        state.loading = false;
      });
  },
});

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBookingTypes();
      return response.data;
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const {
  setType,
  setDate,
  setTime,
  setPrice,
  setChosenCountPeople,
  setChosenReportHours,
  clearInfo,
  setAllPhoto,
  setExtraInfo,
} = bookingSlice.actions;

export default bookingSlice.reducer;
