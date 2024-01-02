import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpened: false,
  },
  reducers: {
    setIsOpened(state, action) {
      state.isOpened = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
