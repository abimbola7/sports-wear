import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
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
        existingItem.amount  = existingItem.amount + 1;
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
    // console.log(carts)
    dispatch(cartAction.addToCart(item));
    console.log(item)
    const carts = getState().cart.cart;
    console.log(carts)
    const db = getFirestore();
    const collectionRef = collection(db, 'carts', dat.uid, 'cartData');

    const snapshot = await getDocs(collectionRef);
    console.log(snapshot)
    const data = snapshot.docs.map((doc) => ( doc.data().cart ));
    return data[0];
  }
);



export const fetchShoeData = (data) => {
        return async (dispatch) => {
            const fetchData = async () => {
              if (data) {
                console.log(data, "dataaaaa")
                const q = collection(db, "carts", data?.user?.uid, 'cartData');
                const querySnapShot = await getDocs(q);
                if (querySnapShot.empty){
                  await setDoc(doc(q), {
                    cart : []
                  })
                } else {
                  const cartData = [];
                  querySnapShot.forEach((doc) => {
                    cartData.push( ...doc.data().cart );
                  });
                  dispatch(cartAction.setCart(cartData))
                  
                }
              }
            }
            fetchData()
        }
}




export const cartAction = cartSlice.actions;
export default cartSlice.reducer;