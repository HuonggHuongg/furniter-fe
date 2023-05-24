import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrderDeliveredService,
} from "../../services/orderServices";

const initialState = {
  listOrder: [],
};

const orderDeliveredSlice = createSlice({
  name: "orderDeliveredSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOrderDeliveredApi.fulfilled, (state, action) => {
      state.listOrder = action.payload;
    })
  },
});

export const { getAllOrderAction } = orderDeliveredSlice.actions;

export default orderDeliveredSlice.reducer;

export const getAllOrderDeliveredApi = createAsyncThunk(
  "orders/delivered",
  async () => {
    try {
      const respone = await getAllOrderDeliveredService();
      return respone.data;
    } catch (error) {
      console.log(error);
    }
  }
);
