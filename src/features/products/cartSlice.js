import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Store as InfoStore } from "react-notifications-component";
import axios from "axios";
const root_url = "http://127.0.0.1:8000/apiv1/shop/collections/";
// const root_url = "https://walse.pythonanywhere.com/apiv1/shop/collections/";

const createAlert = (data) => {
  return InfoStore.addNotification({
    title: data.title,
    message: data.message,
    type: data.type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 5000,
    },
  });
};

const initialState = JSON.parse(localStorage.getItem("cartItems")) || {
  cart_updating: false,
  cartMessage: "",
  items: [],
  count: 0,
  total_amount: 0,
  userId: "",
};

const add_remove_from_localStorage = (items) => {
  if (localStorage.getItem("cartItems")) {
    localStorage.removeItem("cartItems");
  }
  localStorage.setItem("cartItems",JSON.stringify(items));
};

export const addToCartdb = createAsyncThunk(
  "cart/addToCartdb",
  async ({ payload, token }, { rejectWithValue, getState }) => {
    const cart = getState().cart;
    if (token) {
      let product_;
      let exist = cart.items.filter((item) => {
        console.log(item.product_id === payload.product_id);
        return item.product_id === payload.product_id;
      });

      product_ = { ...payload };
      if (exist.length) {
        product_.count = parseInt(payload.count) + parseInt(exist[0].count);
      }

      return payload;
    }

    return payload;
  }
);
export const removeFromCartdb = createAsyncThunk(
  "cart/removeFromCartdb",
  async ({ payload, token }, { rejectWithValue, getState }) => {

  
    return payload;
  }
);
export const decreaseCartdb = createAsyncThunk(
  "decreaseCartdb/cart",
  (payload, { rejectWithValue, dispatch }) => {
    dispatch(reduceItemFromCart(payload.product));
  }
);

export const getCart = createAsyncThunk(
  "cart/getcart",
  async (userId, { extra }) => {
    // TODO get cart items using the userId  and return it or return rejectWithValue
  }
);
export const decreaseCart = createAsyncThunk(
  "cart/decreaseCart",
  async (userData, { extra, rejectWithValue, dispatch }) => {
    // dispatch( reduceItemFromCart(userData))
  }
);

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      const addItemCount = (count) => {
        state.count += count;
      };
      const total_price = (price) => {
        state.total_amount += price;
      };

      if (state.items.length) {
        let existingItem;
        let index;
        state.items = state.items.filter((item, i) => {
          if (item.name === action.payload.payload.name) {
            existingItem = item;
            index = i;
          }
          // state.count = -item.count;
          return item.name !== action.payload.payload.name;
        });
        if (existingItem?.name) {
          existingItem.count += action.payload.payload.count;
          state.items.splice(index, 0, existingItem);
          addItemCount(action.payload.payload.count);
          total_price(
            action.payload.payload.count * action.payload.payload.price
          );
        } else {
          state.items.push(action.payload.payload);
          addItemCount(action.payload.payload.count);
          total_price(
            action.payload.payload.count * action.payload.payload.price
          );
        }
      } else {
        state.items.push(action.payload.payload);
        addItemCount(action.payload.payload.count);
        total_price(
          action.payload.payload.count * action.payload.payload.price
        );
      }
      console.log(state);
      add_remove_from_localStorage(state, "setItem");
      // state.count = state.count + action.payload.payload.count;
    },
    removeFromCart: (state, action) => {
      const removeItemCount = (count) => {
        state.count -= count;
      };

      const minus_price = (price) => {
        state.total_amount -= price;
      };

      if (state.items.length) {
        let existingItem;
        state.items = state.items.filter((item, i) => {
          if (item.name === action.payload.payload.name) {
            existingItem = item;
          }
          // state.count = -item.count;
          return item.name !== action.payload.name;
        });
        if (existingItem?.count) {
          // existingItem.count -= action.payload.count;
          // state.items.push(existingItem);
          removeItemCount(action.payload.count);
          minus_price(action.payload.price * action.payload.count);
        } else {
          // removeItemCount(action.payload.count);
        }
      } else {
        createAlert({
          message: "Can't remove item from an Empty cart",
          type: "danger",
          title: "Cart Error",
        });
      }
    },
    reduceItemFromCart: (state, action) => {
      const removeItemCount = (count) => {
        state.count -= count;
      };
      const minus_price = (price) => {
        state.total_amount -= price;
      };

      if (state.items.length) {
        let existingItem;
        let index;
        state.items = state.items.filter((item, i) => {
          if (item.name === action.payload.name) {
            existingItem = item;
            index = i;
          }
          // state.count = -item.count;
          return item.name !== action.payload.name;
        });
        if (existingItem?.count > 1) {
          existingItem.count -= 1;
          state.items.splice(index, 0, existingItem);
          minus_price(existingItem.price);
          removeItemCount(1);
        } else {
          removeItemCount(1);
          minus_price(action.payload.price);
        }
      } else {
        createAlert({
          message: "Can't remove item from an Empty cart",
          type: "danger",
          title: "Cart Error",
        });
      }
      let ls = JSON.parse(JSON.stringify(state));
      add_remove_from_localStorage(ls);
    },
  },
  extraReducers: (builder) => {
    // Adding to cart
    builder.addCase(addToCartdb.pending, (state) => {});
    builder.addCase(addToCartdb.rejected, (state, action) => {});
    builder.addCase(addToCartdb.fulfilled, (state, action) => {
      const addItemCount = (count) => {
        state.count += count;
      };
      const total_price = (price) => {
        state.total_amount += price;
      };

      if (state.items.length) {
        let existingItem;
        let index;
        state.items = state.items.filter((item, i) => {
          if (item.name === action.payload.name) {
            existingItem = item;
            index = i;
          }
          // state.count = -item.count;
          return item.product_id !== action.payload.product_id;
        });
        if (existingItem?.name) {
          existingItem.count += action.payload.count;
          state.items.splice(index, 0, existingItem);
          addItemCount(action.payload.count);
          total_price(action.payload.count * action.payload.price);
        } else {
          state.items.push(action.payload);

          addItemCount(action.payload.count);
          total_price(action.payload.count * action.payload.price);
        }
      } else {
        state.items.push(action.payload);
        addItemCount(action.payload.count);
        total_price(action.payload.count * action.payload.price);
      }
      let ls = JSON.parse(JSON.stringify(state));
      add_remove_from_localStorage(ls);
    });
    //  remove from db
    builder.addCase(removeFromCartdb.pending, (state) => {});
    builder.addCase(removeFromCartdb.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(removeFromCartdb.fulfilled, (state, action) => {
      const removeItemCount = (count) => {
        state.count -= count;
      };

      const minus_price = (price) => {
        state.total_amount -= price;
      };

      if (state.items.length) {
        let existingItem;
        state.items = state.items.filter((item, i) => {
          if (item.name === action.payload.name) {
            existingItem = item;
          }
          // state.count = -item.count;
          return item.name !== action.payload.name;
        });
        if (existingItem?.count) {
          // existingItem.count -= action.payload.count;
          // state.items.push(existingItem);
          removeItemCount(action.payload.count);
          minus_price(action.payload.price * action.payload.count);
        } else {
          // removeItemCount(action.payload.count);
        }
      } else {
        createAlert({
          message: "Can't remove item from an Empty cart",
          type: "danger",
          title: "Cart Error",
        });
      }
      let ls = JSON.parse(JSON.stringify(state));
      add_remove_from_localStorage(ls);
      // state.count = state.count + action.payload.count;
    });
  },
});

export const { reduceItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
