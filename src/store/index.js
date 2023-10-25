// "use client"

import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import contentSlice from "./contentSlice";

const store  = configureStore({
  reducer : {
    modal : modalSlice,
    cart : cartSlice,
    product : productSlice
  }
})

export default store;