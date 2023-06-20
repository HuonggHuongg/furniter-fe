import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme/theme";
import InputProduct from "./pages/Product/InputProduct";
import EditProduct from "./pages/Product/EditProduct";
import PendingOrder from "./pages/Order/PendingOrder";
import DeliveriedOrder from "./pages/Order/DeliveriedOrder";
import OrderDetail from "./pages/Order/OrderDetail";
import AdminChat from "./pages/Chat/AdminChat";
import Dashboard from "./pages/Dashboard/Dashboard";
import InputCategory from "./pages/Category/InputCategory";
import EditCategory from "./pages/Category/EditCategory";
import ErrorPage from "../userSide/ErrorPage/ErrorPage";

const HomeAdmin = () => {
  const mode = useSelector((state) => state.globalSlice.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* <Route path="/*" element={<Navigate to="/admin/products" />} /> */}
          <Route path="/admin/*" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="chat" element={<AdminChat />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Product />} />
            <Route path="add_product" element={<InputProduct />} />
            <Route path="edit_product/:idProduct" element={<EditProduct />} />
            <Route path="category" element={<Category />} />
            <Route path="add_category" element={<InputCategory />} />
            <Route
              path="edit_category/:idCategory"
              element={<EditCategory />}
            />
            <Route path="orders/*">
              <Route path="pending" element={<PendingOrder />} />
              <Route path="deliveried" element={<DeliveriedOrder />} />
              <Route path="view_detail/:idOrder" element={<OrderDetail />} />
            </Route>
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default HomeAdmin;
