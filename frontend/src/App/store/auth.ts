import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUserId: null,
    isKitchenOwner: false,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setCurrentUserId(state, action) {
      state.currentUserId = action.payload;
    },
    setIsKitchenOwner(state, action) {
      state.isKitchenOwner = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
