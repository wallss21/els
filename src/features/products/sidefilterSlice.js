import { createSlice } from "@reduxjs/toolkit";
import Sidefilter from "../../pages/product/sidefilter";

const initialState = {
  price: { min: 0, max: 10000000 },
  availability: "",
};
export const side_filterSlice = createSlice({
  initialState,
  name: "sidefilters",
  reducers: {},
});

export const {}=Sidefilter.reducers
export default side_filterSlice.actions
