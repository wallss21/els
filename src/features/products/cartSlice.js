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
    localStorage.removeItem("cartItems");  
  localStorage.setItem("cartItems", JSON.stringify(items));
};

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
          if (item.name === action.payload.item.name) {
            existingItem = item;
            index = i;
          }
          // state.count = -item.count;
          return item.name !== action.payload.item.name;
        });
        if (existingItem?.name) {
          existingItem.count += action.payload.item.count;
          state.items.splice(index, 0, existingItem);
          addItemCount(action.payload.item.count);
          total_price(
            action.payload.item.count * action.payload.item.display_price
          );
        } else {
          state.items.push(action.payload.item);
          addItemCount(action.payload.item.count);
          total_price(
            action.payload.item.count * action.payload.item.display_price
          );
        }
      } else {
        state.items.push(action.payload.item);
        addItemCount(action.payload.item.count);
        total_price(
          action.payload.item.count * action.payload.item.display_price
        );
      }
      let ls = JSON.parse(JSON.stringify(state));
      add_remove_from_localStorage(ls);
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
          if (item.name === action.payload.item.name) {
            existingItem = item;
          }
          // state.count = -item.count;
          return item.name !== action.payload.item.name;
        });
        if (existingItem?.count) {
          // existingItem.count -= action.payload.count;
          // state.items.push(existingItem);
          removeItemCount(action.payload.item.count);
          minus_price(action.payload.display_item.price * action.payload.item.count);
        } else {
          createAlert({
            message: "Item not found",
            type: "danger",
            title: "Cart Error",
          });
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
          if (item.name === action.payload.item.name) {
            existingItem = item;
            index = i;
          }
          // state.count = -item.count;
          return item.name !== action.payload.item.name;
        });
        if (existingItem?.count > 1) {
          existingItem.count -= 1;
          minus_price(existingItem.display_price);
          removeItemCount(1);
          state.items.splice(index, 0, existingItem);
        } else if (existingItem?.count === 1) {
          removeItemCount(1);
          minus_price(action.payload.display_price);
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
  extraReducers: (builder) => {},
});

export const { reduceItemFromCart, addToCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
