import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialProductState = {
  product : null,
  isLoading : false,
  error : null
}


const productSlice = createSlice({
  name : 'product',
  initialState : initialProductState,
  reducers : {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload

    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    });
  }
})

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      const eventRef = doc(db, 'products', id);
      const querySnapshot = await getDoc(eventRef)
      return {...querySnapshot.data(), id: querySnapshot.id} 
    } catch (error) {
      return rejectWithValue({ message : "Something went wrong" })
    }
  }
)

export const productAction = productSlice.actions;
export default productSlice.reducer


