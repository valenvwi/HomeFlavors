import { createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../types/cartItem";
const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  totalPrice: JSON.parse(localStorage.getItem("totalPrice") || "0"),
  totalQuantity: JSON.parse(localStorage.getItem("totalQuantity") || "0"),
};

const updateTotals = (cartItems: CartItemType[]) => {
  let totalQuantity = 0;
  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  return { totalQuantity, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const cartItem = {
        id: newItem.id,
        name: newItem.name,
        price: Number(newItem.price),
        image: newItem.image,
        quantity: 1,
      };

      const existingItem = state.cartItems.find(
        (item) => item.id === cartItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push(cartItem);
      }

      const totals = updateTotals(state.cartItems);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      }
      const totals = updateTotals(state.cartItems);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );
      console.log(existingItemIndex);

      if (existingItemIndex !== -1) {
        if (state.cartItems[existingItemIndex].quantity > 1) {
          state.cartItems[existingItemIndex].quantity--;
        } else {
          state.cartItems.splice(existingItemIndex, 1);
        }
      }

      const totals = updateTotals(state.cartItems);
      state.totalPrice = totals.totalPrice;
      state.totalQuantity = totals.totalQuantity;
    },

    resetCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
