import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/auth/authSlice";
import productListReducer from "../features/products/product_listSlice";
import cartRedcer from "../features/products/cartSlice"
import navReducer from "../features/navigateSlice";

// export const secret = `$P#k2w!L^8gFvQ9YhEzXnAtZb7sU3mIoCcRlN6yV1`;

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: userReducer,
    products: productListReducer,
    cart: cartRedcer,
    nav: navReducer,
  },
});
