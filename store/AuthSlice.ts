import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { addToken } = authSlice.actions;
export default authSlice.reducer;
