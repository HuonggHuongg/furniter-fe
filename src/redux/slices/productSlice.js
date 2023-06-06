import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductService,
  editProductService,
  getAllProductService,
} from "../../services/productService";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsApi.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const getAllProductsApi = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const respone = await getAllProductService();
    return respone.data;
  }
);

export const addProductApi = (formData, navigate) => {
  
  return async (dispatch) => {
    try {
      await addProductService(formData);
      await dispatch(getAllProductsApi());
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProductApi = (formData, navigate, id) => {
  return async (dispatch) => {
    try {
      await editProductService(formData, id);

      dispatch(getAllProductsApi());
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };
};
