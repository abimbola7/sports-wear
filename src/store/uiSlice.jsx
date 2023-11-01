import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  notification : null
}

const uiSlice = createSlice({
  name : "ui",
  initialState: initialUiState,
  reducers : {
    showNotification(state, action) {
      state.notification = {
        status : action.payload.status,
        message : action.payload.message
      }
    },
    hideNotification(state, action) {
      state.notification = null
    }
  }
})

export const { showNotification, hideNotification } =  uiSlice.actions;
export default uiSlice.reducer;