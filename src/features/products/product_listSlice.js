import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { products } from "../../assets/data";
import axios from "axios";
// const root_url = "http://127.0.0.1:8000/apiv1/shop/collections/";
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
    console.log(url);
    try {
      let { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ message: "error" });
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "products/getProdctDetail",
  async (payload, { extra, rejectWithValue }) => {
    let url = `${root_url}products/${payload}?}`;
    try {
      let { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({ message: "error" });
    }
  }
);

export const featureProducts = createAsyncThunk(
  "products/featuredProducts",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      let { data } = await axios.get(`${root_url}featured_products`);
      return data;
    } catch (error) {
      rejectWithValue({ message: "Please try Again" });
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
      
    });
    builder.addCase(featureProducts.rejected, (state,action) => {
      state.isLoading = false;
      state.product = {};
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
    filterProduct: (state, action) => {
      const queries = action.payload.filter;

      if (state.queries) {
        if (queries !== state.queries) {
          state.products = products.filter((pro) => {
            for (let i = 0; i < queries.length; i++) {
              if (
                pro.name
                  .toLowerCase()
                  .indexOf(
                    queries[i].toLowerCase() === "rings"
                      ? "ring"
                      : queries[i].toLowerCase() === "sets"
                      ? "set"
                      : queries[i].toLowerCase() === "watches"
                      ? "watch"
                      : queries[i].toLowerCase()
                  ) !== -1
              ) {
              } else {
                return false;
              }
            }
            return true;
          });
        }
      } else {
        state.products = products.filter((pro) => {
          for (let i = 0; i < queries.length; i++) {
            if (
              pro.name
                .toLowerCase()
                .includes(
                  queries[i].toLowerCase() === "rings"
                    ? "ring"
                    : queries[i].toLowerCase() === "sets"
                    ? "set"
                    : queries[i].toLowerCase() === "watches"
                    ? "watch"
                    : queries[i].toLowerCase() === "bracelets"
                    ? "bracelet"
                    : queries[i].toLowerCase() === "bracelets"
                    ? "Bracelet"
                    : queries[i].toLowerCase()
                ) !== -1
            ) {
            } else {
              return false;
            }
          }
          return true;
        });
      }
      //   TODO make sure you convert the query parameter to a regex pattern

      let page =
        action.payload.page === 1
          ? 1
          : action.payload.page === null || 0
          ? 1
          : action.payload.page;
      state.availablepage = Math.ceil(state.products.length / 12);

      try {
        state.products
          ? (state.displaylist = state.products.slice(
              12 * (page - 1),
              page * 12
            ))
          : (state.displaylist = []);
      } catch (error) {
        state.displaylist = [];
      }

      state.queries = queries;
    },

    all_watches: (state, action) => {
      state.prodcts = products.filter((item) => {
        if (item.name.toLowerCase().indexOf("watch") !== -1) {
          return true;
        }
        return false;
      });
      //  set pagination on the resolved data
      let page =
        action.payload.page === 1
          ? 1
          : action.payload.page === null || 0
          ? 1
          : action.payload.page;
      state.availablepage = Math.ceil(state.products.length / 12);

      try {
        state.products
          ? (state.displaylist = state.products.slice(
              12 * (page - 1),
              page * 12
            ))
          : (state.displaylist = []);
      } catch (error) {
        state.displaylist = [];
      }
    },

    all_products: (state, action) => {
      state.products = products.sort(() => Math.random() - 0.5);
      console.log(state.products);
      // pagination
      let page =
        action.payload.page === 1
          ? 1
          : action.payload.page === null || 0
          ? 1
          : action.payload.page;
      state.availablepage = Math.ceil(state.products.length / 12);

      try {
        state.products
          ? (state.displaylist = state.products.slice(
              12 * (page - 1),
              page * 12
            ))
          : (state.displaylist = []);
      } catch (error) {
        state.displaylist = [];
      }
    },
   
  },
});

export const { filterProduct, all_products, all_watches, getTopProduct } =
  productListSlice.actions;
export default productListSlice.reducer;
