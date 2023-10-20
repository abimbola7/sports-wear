// "use client"

import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";

const store  = configureStore({
  reducer : {
    modal : modalSlice
  }
})

export default store;