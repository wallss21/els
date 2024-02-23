import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const root_url = "http://127.0.0.1:8000/apiv1/shop/";
// const root_url = "https://walse.pythonanywhere.com/apiv1/shop/";

const initialState = {
  isLoading: false,
  error: null,
  billingAddress: [],
};

export const createBillingAddres = createAsyncThunk(
  "billingAddress/create",
  async (payload, { extra }) => {
    // TODO make axios request to create data and return success status if successful or reject with value if error occur
    try {
      let { data } = await axios.post(
        `${root_url}billing/create/`,
        payload.data,
        { headers: { Authorization: `Bearer ${payload.token} ` } }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);
export const retriveBillingAddress = createAsyncThunk(
  "billingAddress/retrive",
  async (userId, { extra, getState, rejectWithValue }) => {
    let userToken = getState().auth.userDetails;
    console.log(userToken)
    try {
      let res = await axios.get(`${root_url}billing/create/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (res.status === 200) {
        return res.data;
      }
      return rejectWithValue();
    } catch (error) {
      return rejectWithValue();
    }
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
