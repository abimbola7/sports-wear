
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//   contents : [],
//   isLoading :false,
//   error : null
// }

// export const fetchCart  = createAsyncThunk(
//   'content/fetchCart',
//   async () =>{
//     // const q = query(collection(db, "products"), where("latest", "==", true));
//     //   console.log(q)
//     //   await getDocs(q)
//     //   .then(querySnaphot => {
//     //     const newData = querySnaphot.docs.map(doc=>(
//     //       {
//     //         ...doc.data(), id:doc.id
//     //       }
//     //     ))
//     //     return newData;
//     //   })
//     const res = await axios('https://jsonplaceholder.typicode.com/photos')
//     const data = await res.data
//     return data
//   }
// )

// export const contentSlice = createSlice({
//   name : 'content',
//   initialState,
//   reducers : {
//     add(state) {
//       state.contents.push({
//         name :"oladosu"
//       })
//     }
//   },
//   extraReducers : (builder) => {
//     builder.addCase(fetchCart.pending, (state, action) => {
//       state.isLoading = true
//     })

//     builder.addCase(fetchCart.fulfilled, (state, action) => {
//       state.isLoading = false;
//       console.log(action.payload)
//       state.contents = action.payload
//     })

//     builder.addCase(fetchCart.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.error.message
//     })
//   }
// })


// export default contentSlice.reducer;
// export const contentAction = contentSlice.actions;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "content/fetchCart",
  async (uid, { getState }) => {
    console.log(uid)
    const db = getFirestore();
    const collectionRef = collection(db, 'carts', uid, 'cartData');

    const snapshot = await getDocs(collectionRef);
    console.log(snapshot)
    const data = snapshot.docs.map((doc) => ( doc.data().cart ));
    return data[0];
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
      console.log(action.payload)
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const selectContents = (state) => state.content.contents;
export const selectIsLoading = (state) => state.content.isLoading;
export const selectError = (state) => state.content.error;

export default contentSlice.reducer;
