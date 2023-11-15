// "use client"

import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isToggled : false,
  cartIsToggled  : false,
  filterIsToggled : false,
  authIsToggled : false,
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
    toggleAuth(state, action) {
      state.authIsToggled = !state.authIsToggled
    },

  }
})

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;