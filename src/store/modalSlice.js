// "use client"

import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isToggled : false,
  cartIsToggled  : false,
  filterIsToggled : false,
}


const modalSlice  = createSlice({
  name : "modal",
  initialState : initialModalState,
  reducers : {
    toggleModal(state, action) {
      state.isToggled = !state.isToggled
    },
    toggleCart(state, action) {
      state.cartIsToggled = !state.cartIsToggled
    },
    toggleFilter(state, action) {
      state.filterIsToggled = !state.filterIsToggled
    },

  }
})

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;