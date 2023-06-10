import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    },
    logOutUser: (state) => {
      return null;
    }
  },
});

export const { updateUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
