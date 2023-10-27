import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const initialProductsState = {
  products : [],
  isLoading : false,
  error : null
}

const productsSlice = createSlice({
  name : 'products',
  initialState : initialProductsState,
  reducers : {},
  extraReducers : (builder) => {
    builder.addCase( fetchProducts.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase( fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase( fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
})

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    console.log("ddddddddddd")
    const q = collection(db, "products");
    console.log(q)
    const querySnapshot  = await getDocs(q)
    const newData = querySnapshot.docs.map(doc=>(
      {
        ...doc.data(), id:doc.id
      })
    )
    return newData;
  }
)

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;