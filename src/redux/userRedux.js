import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      return {...state, ...action.payload};
    },
    logOutUser: (state) => {
      return null;
    },
    updateUserHospital: (state, action) => {
      return {...state, ...action.payload}
    }
  },
});

export const { updateUser, logOutUser, updateUserHospital } = userSlice.actions;
export default userSlice.reducer;
