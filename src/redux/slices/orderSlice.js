import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  listOrder: [],
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(getAllOrderPendingApi.fulfilled, (state, action) => {
    //   state.listOrder = action.payload;
    // })
  },
});

export const { getAllOrderAction } = orderSlice.actions;

export default orderSlice.reducer;

// export const addProductToOrderApi = createAsyncThunk(
//   "cart/addProduct",
//   async (dataCart) => {

//     console.log(dataCart.productIds);
//     await addProductToOrderService(dataCart);
//     const respone = await getAllOrderAnUserService();
//     return respone.data;
//   }
// );

// export const viewDetailOrderApi = (id) => {
//   return async (dispatch) => {
//     try {
//       const result = await getDetailsOrderService(id);
//       result 
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const viewDetailOrderApi = createAsyncThunk(
//   "orders/view_detail",
//   async (id) => {
//     try {
//       const respone = await getDetailsOrderService(id);
//       return respone.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
