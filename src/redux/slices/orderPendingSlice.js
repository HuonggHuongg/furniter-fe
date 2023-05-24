import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  changeStatusOrderService,
  getAllOrderPendingService,
} from "../../services/orderServices";

const initialState = {
  listOrder: [],
};

const orderPendingSlice = createSlice({
  name: "orderPendingSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOrderPendingApi.fulfilled, (state, action) => {
      state.listOrder = action.payload;
    })
  },
});

export const { getAllOrderAction } = orderPendingSlice.actions;

export default orderPendingSlice.reducer;

export const getAllOrderPendingApi = createAsyncThunk(
  "orders/pending",
  async () => {
    try {
      const respone = await getAllOrderPendingService();
      return respone.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const changeStatusOrderApi = (idOrder) => {
  return async (dispatch) => {
    try {
      const result = await changeStatusOrderService(idOrder);
      dispatch(getAllOrderPendingApi());
    } catch (error) {
      console.log(error);
    }
  };
};
