import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const initialProductsState = {
  products : [],
  latest : [],
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

    builder.addCase( fetchLatest.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase( fetchLatest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.latest = action.payload;
      console.log(state.latest)
    });
    builder.addCase( fetchLatest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
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

export const fetchLatest = createAsyncThunk(
  'product/fetchLatest',
  async (data, {rejectWithValue}) => {
    console.log("fff")
    try {
      const q = query(collection(db, "products"), where("latest", "==", true));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
      if (querySnapshot.empty) { 
        throw new Error("Something went wrong")
      }else {
        const newData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        return newData;
      }
    } catch (error) {
      console.log(error.message)
      return rejectWithValue(error.message)
    }
  }
)


export default productsSlice.reducer