import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  billingAddress: {},
};

export const createBillingAddres = createAsyncThunk(
  "billingAddress/create",
  async (userId, { extra }) => {
    // TODO make axios request to create data and return success status if successful or reject with value if error occur
  }
);
export const retriveBillingAddress = createAsyncThunk(
  "billingAddress/retrive",
  async (userId, { extra }) => {
    // TODO  Make axios  fetch request to and repeat the process on the createBillingAddress above
  }
);

export const billingSlice = createSlice({
  initialState,
  name: "billingAddress",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBillingAddres.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBillingAddres.fulfilled, (state, action) => {
      state.isLoading = false;
      state.billingAddress = action.payload;
    });
    builder.addCase(createBillingAddres.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // retriving Billingaddress data
    builder.addCase(retriveBillingAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(retriveBillingAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.billingAddress = action.payload;
    });
    builder.addCase(retriveBillingAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

// export const {} = billingSlice.actions;
export default billingSlice.reducer;
