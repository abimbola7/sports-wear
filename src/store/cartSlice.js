import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, getFirestore, query, queryEqual, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { showNotification, hideNotification } from "./uiSlice";

const initialCartState = {
  cart: [],
  cartName : null,
  totalAmount : 0,
  isLoading : false,
  error : null
}

const cartSlice = createSlice({
  name : "cart",
  initialState : initialCartState,
  reducers : {
    addToCart(state, action) {
      const existingItem = state.cart.find(item=>item.id === action.payload.item.id)
      if (existingItem) {
        if (action.payload.type === "PRODUCT") {
          existingItem.amount  = action.payload.item.amount; 
        } else{
          existingItem.amount++
        }
      } else {
        state.cart.push(action.payload.item);
      }
    },
    clearCart (state, action) {
      state.cart = state.cart.filter(item=>item.id !== action.payload)
    },
    setCart(state, action) {
      state.cart = action.payload
    },
    cartName(state, action) {
      state.cartName = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
})


export const fetchCart = createAsyncThunk(
  "content/fetchCart",
  async (dat, {dispatch, getState, rejectWithValue }) => {
    const previousCart = getState().cart.cart;
    try {
      dispatch(hideNotification());
      const { uid, item, type } = dat
      dispatch(cartAction.addToCart({item, type}));
      const carts = getState().cart.cart;
      const db = getFirestore();
      const collectionRef = doc(db, 'carts', dat.uid);
      await setDoc(collectionRef, { cart: carts }, { merge: true })
      dispatch(cartAction.cartName(item.name))
      dispatch(showNotification({
        type : 'add',
        status : "success",
        message : "Cart Updated Successfully"
      }))
    } catch (error) {
      dispatch(cartAction.setCart(previousCart));
      dispatch(showNotification({
        type : "error",
        status : "error",
        message : "Error Updating Cart, Try Again"
      }))
      return rejectWithValue({ message : "Failed to update cart" })
    }
  }
);


export const clearedCart = createAsyncThunk(
  "content/fetchCart",
  async (data, {dispatch, getState, rejectWithValue }) => {
    const previousCart = getState().cart.cart;
    try {
      const { uid, id, name} = data;
      dispatch(cartAction.clearCart(id));
      const carts = getState().cart.cart
      const db = getFirestore();
      const collectionRef = doc(db, 'carts', uid);
      await setDoc(collectionRef, { cart: carts }, { merge: true });
      dispatch(cartAction.cartName(name))
      dispatch(showNotification({
        type : "delete",
        status : "success",
        message : `"${name}" removed.`
      }))
    } catch (error) {
      dispatch(cartAction.setCart(previousCart));
      dispatch(showNotification({
        type : "error",
        status : "error",
        message : `Could not update cart.`
      }))
      return rejectWithValue({ message : "Failed to update cart" })
    }
  }
);



export const fetchShoeData = (data) => {
        return async (dispatch) => {
            const fetchData = async () => {
              try {
                  if (data) {
                    const q = doc(db, "carts", data?.user?.uid);
                    const querySnapShot = await getDoc(q)
                    if (querySnapShot.exists()){
                      dispatch(cartAction.setCart(querySnapShot?.data().cart))
                    } else {
                      await setDoc(q, {
                        cart : []
                      })
                    }
                  }
              } catch (error) {
                console.log(error)
                throw new Error(error.message)
              }
            }
            fetchData()
        }
}




export const cartAction = cartSlice.actions;
export default cartSlice.reducer;