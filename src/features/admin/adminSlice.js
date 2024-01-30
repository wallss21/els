import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { users } from "../../assets/MOCK_DATA";
import { products } from "../../assets/data";

const root_url = "https://webcode2.pythonanywhere.com/apiv1/";
// const root_url = "http://127.0.0.1:8000/apiv1/accounts/";

const initialState = {
  all_users: [],
  all_products: [],
  isLoading: false,
};

export const fetch_all_products = createAsyncThunk(
  "admin/fetch_all_products",
  async (payload, { extra, rejectWithValue }) => {
    try {
      return products.slice(0, 30);
      let res = await axios.get(`${root_url}users/all`);
      if (res.staus === 200) {
        return res.data;
      }
      return rejectWithValue({ message: "Something went Wrong! " });
    } catch (error) {
      rejectWithValue({ message: "An Error occur" });
    }
  }
);

export const fetch_all_users = createAsyncThunk(
  "admin/fetch_all_users",
  async (payload, { extra, rejectWithValue }) => {
    try {
      return users.slice(0, 30);
      let res = await axios.get(`${root_url}users/all`);
      if (res.staus === 200) {
        return res.data;
      }
      return rejectWithValue({ message: "Something went Wrong! " });
    } catch (error) {
      rejectWithValue({ message: "An Error occur" });
    }
  }
);

export const adminSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetch_all_users.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetch_all_users.fulfilled, (state, action) => {
      console.log(action.payload);
      state.all_users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetch_all_users.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetch_all_products.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetch_all_products.fulfilled, (state, action) => {
      console.log(action.payload);
      state.all_products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetch_all_products.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
  name: "admin",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = adminSlice.actions;

export default adminSlice.reducer;
