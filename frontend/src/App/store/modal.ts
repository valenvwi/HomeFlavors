import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isCheckedout: false,
    isCancelled: false,
  },
  reducers: {
    setIsCheckedout(state, action) {
      state.isCheckedout = action.payload;
    },
    setIsCancelled(state, action) {
      state.isCancelled = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
