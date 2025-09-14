import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    shopsInMyCity: [],
    itemInMyCity: [],
    cartItems: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemInMyCity: (state, action) => {
      state.itemInMyCity = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === cartItem.id);
      if (existingItem) {
        existingItem.quentity += cartItem.quentity || 1;
      } else {
        state.cartItems.push({ ...cartItem, quentity: 1 });
      }
    },
  },
});

export const {
  setUserData,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
  setShopsInMyCity,
  setItemInMyCity,
  addToCart,
} = userSlice.actions;
export default userSlice.reducer;
