import { createSlice } from "@reduxjs/toolkit";

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: null,
  reducers: {
    updateHospital: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateHospital } =
  hospitalSlice.actions;
export default hospitalSlice.reducer;
