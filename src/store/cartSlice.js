import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, getFirestore, query, queryEqual, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

const initialCartState = {
  cart: [],
  totalAmount : 0,
  isLoading : false,
  error : null
}

const cartSlice = createSlice({
  name : "cart",
  initialState : initialCartState,
  reducers : {
    addToCart(state, action) {
      console.log(action.payload)
      const existingItem = state.cart.find(item=>item.id === action.payload.id)
      if (existingItem) {
        existingItem.amount  = action.payload.amount;
      } else {
        state.cart.push(action.payload);
      }
      console.log(state.cart)
    },
    removeFromCart(state, action) {},
    clearCart (state, action) {

    },
    setCart(state, action) {
      state.cart = action.payload
      console.log(state.cart)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.cart = action.payload;
      // console.log(action.payload)
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
})


export const fetchCart = createAsyncThunk(
  "content/fetchCart",
  async (dat, {dispatch, getState }) => {
    const { uid, item } = dat
    dispatch(cartAction.addToCart(item));
    const carts = getState().cart.cart;
    const db = getFirestore();
    const collectionRef = doc(db, 'carts', dat.uid);
    await setDoc(collectionRef, { cart: carts }, { merge: true })
  }
);



export const fetchShoeData = (data) => {
        return async (dispatch) => {
            const fetchData = async () => {
              if (data) {
                console.log(data, "dataaaaa")
                const q = doc(db, "carts", data?.user?.uid);
                const querySnapShot = await getDoc(q)
                console.log(querySnapShot.exists())
                if (querySnapShot.exists()){
                  console.log('User already exists');
                  dispatch(cartAction.setCart(querySnapShot?.data().cart))
                } else {
                  await setDoc(q, {
                    cart : []
                  })
                }
              }
            }
            fetchData()
        }
}




export const cartAction = cartSlice.actions;
export default cartSlice.reducer;