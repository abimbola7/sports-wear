// "use client"

import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import uiSlice from "./uiSlice";
import productsSlice from "./productsSlice";

const store  = configureStore({
  reducer : {
    modal : modalSlice,
    cart : cartSlice,
    product : productSlice,
    products: productsSlice,
    ui : uiSlice
  }
})

export default store;