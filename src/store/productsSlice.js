import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const initialProductsState = {
  products : null,
  latest : [],
  men : [],
  women : [],
  search : [],
  isLoading : true,
  error : null
}

const productsSlice = createSlice({
  name : 'products',
  initialState : initialProductsState,
  reducers : {},
  extraReducers : (builder) => {
    builder.addCase( fetchProducts.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase( fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase( fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    });

    builder.addCase( fetchLatest.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase( fetchLatest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.latest = action.payload;
    });
    builder.addCase( fetchLatest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase( fetchSearch.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase( fetchSearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.search = action.payload;
    });
    builder.addCase( fetchSearch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

  }
})

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (dat, { rejectWithValue }) => {
    try {
      const q = collection(db, "products");
      const querySnapshot  = await getDocs(q)
      // console.log(querySnapshot)
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
      // console.log(error);
      return rejectWithValue("Something went wrong");
    }
  }
)

export const fetchLatest = createAsyncThunk(
  'product/fetchLatest',
  async (data, {rejectWithValue}) => {
    try {
      const q = query(collection(db, "products"), where("latest", "==", true));
      const querySnapshot = await getDocs(q);
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
      return rejectWithValue(error.message)
    }
  }
)

export const fetchSearch = createAsyncThunk(
  'product/fetchSearch',
  async (data, {dispatch, rejectWithValue}) => {
    try {
      const queryByName = query(collection(db, "products"), where("name", ">=", data));
      const queryByCategory = query(collection(db, "products"), where('category', 'array-contains', data)); 
      const queryByTags = query(collection(db, "products"), where('tags', 'array-contains', data)); 
      const nameQuerySnapshot = await getDocs(queryByName);
      const categoryQuerySnapshot = await getDocs(queryByCategory);
      const tagsQuerySnapshot = await getDocs(queryByTags);
      if (nameQuerySnapshot.empty && categoryQuerySnapshot.empty && tagsQuerySnapshot.empty) { 
        throw new Error("Cannot Find Item")
      }else {
        const nameData = nameQuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        const categoryData = categoryQuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        const tagsData = tagsQuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        const uniqueArray = [...nameData, ...categoryData, ...tagsData].filter((item, index, self) => {
          return index === self.findIndex(obj => obj.id === item.id);
        });
        return uniqueArray;
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)


export default productsSlice.reducer