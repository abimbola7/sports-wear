// "use client"

import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isToggled : false,
}


const modalSlice  = createSlice({
  name : "modal",
  initialState : initialModalState,
  reducers : {
    toggleModal(state, action) {
      state.isToggled = !state.isToggled
    }
  }
})

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;