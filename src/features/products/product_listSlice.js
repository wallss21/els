import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const root_url = "https://walse.pythonanywhere.com/apiv1/shop/collections/";

const initialState = {
  isLoading: false,
  displaylist: [],
  products: [],
  product: {},
  topProducts: [],
};

export const getJewellery = createAsyncThunk(
  "products/getJewellery",
  async (payload, { extra, rejectWithValue }) => {
    let url = `${root_url}${payload.category}?page=${payload.current_page}&filter=${payload.filters}&price_max=${payload.maxv}&price-min=${payload.minv}`;
    console.log(url)
    try {
      let { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue({ message: "error" });
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getProdctDetail",
  async (payload, { extra, rejectWithValue }) => {
    let url = `${root_url}products/${payload}?}`;
    try {
      let res = await axios.get(url);
      if (res.status===200){

        return res.data;
      }
      return rejectWithValue({ message: "error" })
    } catch (error) {
      return rejectWithValue({ message: "error" });
    }
  }
);

export const featureProducts = createAsyncThunk(
  "products/featuredProducts",
  async (payload, {  rejectWithValue }) => {
    try {
      let res= await axios.get(`${root_url}featured_products`);
      if(res.status===200){

        return res.data;
      }
      return rejectWithValue();

    } catch (error) {
      console.log(error)
      return rejectWithValue();
    }
  }
);

export const productListSlice = createSlice({
  extraReducers: (builder) => {
    // Get jewellery
    builder.addCase(getJewellery.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJewellery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getJewellery.rejected, (state) => {
      state.isLoading = false;
      state.products = [];
    });
    //  Endd Get jewellery
    builder.addCase(getProductDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductDetail.rejected, (state) => {
      state.isLoading = false;
      state.product = {};
    });
    //  top product
    builder.addCase(featureProducts.pending, (state) => {
      state.isLoading = true;
      // state.topProducts=[]
      
    });
    builder.addCase(featureProducts.rejected, (state,action) => {
      state.isLoading = false;
      state.topProducts = [];
      // TODO display a retry message for the user to refresh the page for the product to come up
    });
    builder.addCase(featureProducts.fulfilled, (state,action) => {
      state.isLoading = false;
      state.topProducts = action.payload
    });
  },
  initialState,
  name: "products",
  reducers: {
 
   
  },
});

export const { filterProduct, all_products, all_watches, getTopProduct } =
  productListSlice.actions;
export default productListSlice.reducer;
