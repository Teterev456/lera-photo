import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionTypes: ["ИНДИВИДУАЛЬНАЯ", "ГРУППОВАЯ", "РЕПОРТАЖНАЯ"],
  timeSlots: ["9:00", "13:00", "17:00", "20:00"],

  chosenType: "-",
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
      state.chosenType = action.payload;
    },
    setDate(state, action) {
      state.chosenDate = action.payload;
    },
    setTime(state, action) {
      state.chosenTime = action.payload;
    },
    setPrice(state, action) {
      if (state.chosenType === "-") {
        state.price = 0;
      } else if (state.chosenType === "ИНДИВИДУАЛЬНАЯ") {
        state.price = 4000;
      } else if (state.chosenType === "ГРУППОВАЯ") {
        state.price = 5000;
        if (state.chosenCountPeople > 2) {
          state.price += 1000;
          if (state.chosenCountPeople > 3) {
            state.price += 500 * (state.chosenCountPeople - 3);
          }
        }
      } else if (state.chosenType === "РЕПОРТАЖНАЯ") {
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
      state.chosenType = "-";
      state.chosenDate = "-";
      state.chosenTime = "-";
      state.allPhoto = false;
      state.extraInfo = "";
      state.chosenCountPeople = 2;
      state.chosenReportHours = 2;
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
  setAllPhoto,
  setExtraInfo,
} = bookingSlice.actions;

export default bookingSlice.reducer;
