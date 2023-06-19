import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: null,
  reducers: {
    updateHospital: (state, action) => {
      return action.payload;
    },
    logOutHospital: (state, action) => {
      return null;
    }
  },
});

export const { updateHospital, logOutHospital } =
  hospitalSlice.actions;
export default hospitalSlice.reducer;
