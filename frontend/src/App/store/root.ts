import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import cartSlice from "./cart";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalSlice from "./modal";

const persistedCartReducer = persistReducer(
  { key: "cart", storage },
  cartSlice.reducer
);


const rootReducer = combineReducers({
  cart: persistedCartReducer,
  auth: authSlice.reducer,
  modal: modalSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST"],
      },
    }),
});

export default store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
