import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPayModalOpen: false,
  isPayLoading: false,
};

export const makePayment = createAsyncThunk(
  "modal/makePayment",
  async (payload, { rejectWithValue, getState }) => {
    const choice = () => {
      const waitingTimes = [2000, 4500, 5500, 3900];
      let ms = waitingTimes[Math.floor(Math.random() * waitingTimes.length)];
      console.log(ms);
      return ms;
    };
    function delay(ms) {
      return new Promise((resolve, reject) => setTimeout(resolve, ms));
    }
    // console.log(Math.random() * waitingTimes.length);
    await delay(choice());
    // loadingTime.clear()
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openPayModal: (state) => {
      state.isPayModalOpen = true;
    },
    closePayModal: (state) => {
      state.isPayModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makePayment.pending, (state) => {
      state.isPayModalOpen = true;
      state.isPayLoading = true;
    });
    builder.addCase(makePayment.rejected, (state) => {
      state.isPayLoading = false;
    });
    builder.addCase(makePayment.fulfilled, (state) => {
      state.isPayLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { openPayModal, closePayModal } = modalSlice.actions;

export default modalSlice.reducer;
