import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isCheckingout: false,
    isCheckedout: false,
    openCancelledDialog: false,
    isCancelled: false,
    isCreatedMenuItem: false,
    isEditedMenuItem: false,
  },
  reducers: {
    setIsCheckingout(state, action) {
      state.isCheckingout = action.payload;
    },
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
