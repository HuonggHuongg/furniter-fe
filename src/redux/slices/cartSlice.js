import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToCartService,
  deleteCartItemService,
  getAllCartItemService,
} from "../../services/cartServices";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartItem: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCartItemApi.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        // state.totalAmount = action.payload[0].Cart.total_cart;
      })
      .addCase(CartLogoutApi.fulfilled, (state, action) => {
        state.cartItems = [];
      });
      // .addCase(getAllCartItemApi.rejected, (state, action) => {
      //   state.cartItems = [];
      //   state.totalAmount = 0;
      //   state.totalQuantity = 0;
      // })
      // .addCase(addProductToCartApi.fulfilled, (state, action) => {
      //   state.cartItems = action.payload;
      //   state.totalAmount = action.payload[0].Cart.total_cart;
      //   state.totalQuantity = action.payload.reduce(
      //     (total, item) => total + Number(item.quantity),
      //     0
      //   );
      // })
      // .addCase(deleteCartItemApi.fulfilled, (state, action) => {
      //   state.cartItems = action.payload;
      //   state.totalAmount = action.payload[0].Cart.total_cart;
      //   state.totalQuantity = action.payload.reduce(
      //     (total, item) => total + Number(item.quantity),
      //     0
      //   );
      // })
      // .addCase(deleteCartItemApi.rejected, (state, action) => {
      //   state.cartItems = [];
      //   state.totalAmount = 0;
      //   state.totalQuantity = 0;
      // });
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

export const getAllCartItemApi = createAsyncThunk(
  "cart/getAllCart",
  async (accessToken) => {
    const respone = await getAllCartItemService(accessToken);
    console.log(respone.data);
    if (
      respone === "There are no products in the cart" ||
      respone === "You don't login"
    ) {
      return Promise.reject();
    }
    return respone.data;
  }
);

export const CartLogoutApi = createAsyncThunk("cart/logout", async () => {
  return {};
});

export const addProductToCartApi = createAsyncThunk(
  "cart/addProduct",
  async (dataCart) => {

    console.log(dataCart.userName);
    const responeAddProductToCart = await addProductToCartService(dataCart,dataCart.userName);
    const respone = await getAllCartItemService();

    return respone.data;
  }
);

export const deleteCartItemApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await deleteCartItemService(id);
      dispatch(getAllCartItemApi());
    } catch (error) {
      console.log(error);
    }
  };
};