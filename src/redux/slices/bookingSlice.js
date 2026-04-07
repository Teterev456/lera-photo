import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionTypes: ["ИНДИВИДУАЛЬНАЯ", "ГРУППОВАЯ", "РЕПОРТАЖНАЯ"],
  timeSlots: ["9:00", "13:00", "17:00", "20:00"],

  chosenType: "-",
  chosenDate: "-",
  chosenTime: "-",
  price: 0,
  chosenCountPeople: 2,
  chosenReportHours: 2,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setType(state, action) {
      state.chosenType = action.payload;
    },
    setDate(state, action) {
      state.chosenDate = action.payload;
    },
    setTime(state, action) {
      state.chosenTime = action.payload;
    },
    // Цена в тысячах рублей
    setPrice(state, action) {
      if (state.chosenType === "-") {
        state.price = 0;
      } else if (state.chosenType === "ИНДИВИДУАЛЬНАЯ") {
        state.price = 4;
      } else if (state.chosenType === "ГРУППОВАЯ") {
        state.price = 5;
        if (state.chosenCountPeople > 2) {
          state.price += 1;
          if (state.chosenCountPeople > 3) {
            state.price += 0.5 * (state.chosenCountPeople - 3);
          }
        }
      } else if (state.chosenType === "РЕПОРТАЖНАЯ") {
        state.price = 3 * state.chosenReportHours;
      }
    },
    setChosenCountPeople(state, action) {
      state.chosenCountPeople = action.payload;
    },
    setChosenReportHours(state, action) {
      state.chosenReportHours = action.payload;
    },
    clearInfo(state, action) {
      state.chosenType = "-";
      state.chosenDate = "-";
      state.chosenTime = "-";
    },
  },
});

export const {
  setType,
  setDate,
  setTime,
  setPrice,
  setChosenCountPeople,
  setChosenReportHours,
  clearInfo,
} = bookingSlice.actions;

export default bookingSlice.reducer;
