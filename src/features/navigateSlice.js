import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {},
};

export const navSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToNav: (state, action) => {
      console.log(action);
    },
    remove: (state, action) => {
      console.log(action);
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = navSlice.actions;

export default navSlice.reducer;
