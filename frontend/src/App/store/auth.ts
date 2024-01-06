import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUserId: null,
    username: null,
    isOwner: false,
    newUser: false,
    justLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setCurrentUserId(state, action) {
      state.currentUserId = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setIsOwner(state, action) {
      state.isOwner = action.payload;
    },
    setNewUser(state, action) {
      state.newUser = action.payload;
    },
    setJustLoggedIn(state, action) {
      state.justLoggedIn = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
