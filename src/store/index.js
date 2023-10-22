// "use client"

import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import cartSlice from "./cartSlice";
import contentSlice from "./contentSlice";

const store  = configureStore({
  reducer : {
    modal : modalSlice,
    cart : cartSlice,
  }
})

export default store;