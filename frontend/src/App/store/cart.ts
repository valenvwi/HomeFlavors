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
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } else {
        state.cartItems.push(cartItem);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }

      const totals = updateTotals(state.cartItems);
      state.totalPrice = totals.totalPrice;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
      state.totalQuantity = totals.totalQuantity;
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
      const totals = updateTotals(state.cartItems);
      state.totalPrice = totals.totalPrice;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
      state.totalQuantity = totals.totalQuantity;
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
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
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        } else {
          state.cartItems.splice(existingItemIndex, 1);
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }

      const totals = updateTotals(state.cartItems);
      state.totalPrice = totals.totalPrice;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
      state.totalQuantity = totals.totalQuantity;
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
