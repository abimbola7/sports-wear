import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialProductState = {
  product : {},
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
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload
      console.log(state.product)

    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message
    });
  }
})

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, { dispatch, getState }) => {
    const eventRef = doc(db, 'products', id);
    const querySnapshot = await getDoc(eventRef)
    console.log(querySnapshot.id)
    return {...querySnapshot.data(), id: querySnapshot.id}
  }
)

export const productAction = productSlice.actions;
export default productSlice.reducer


