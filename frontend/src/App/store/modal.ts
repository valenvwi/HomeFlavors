import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isCheckedout: false,
    openCancelledDialog: false,
    isCancelled: false,
    isCreatedMenuItem: false,
    isEditedMenuItem: false,
  },
  reducers: {
    setIsCheckedout(state, action) {
      state.isCheckedout = action.payload;
    },
    setOpenCancelledDialog(state, action) {
      state.openCancelledDialog = action.payload;
    },
    setIsCancelled(state, action) {
      state.isCancelled = action.payload;
    },
    setIsCreatedMenuItem(state, action) {
      state.isCreatedMenuItem = action.payload;
    },
    setIsEditedMenuItem(state, action) {
      state.isEditedMenuItem = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
