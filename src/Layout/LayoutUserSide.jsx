import React, { useEffect } from "react";
import Header from "../userSide/components/Header/Header";
import Footer from "../userSide/components/Footer/Footer";
import Routers from "../routers/RoutersUserSide";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsApi } from "../redux/slices/productSlice";
import { getAllCartItemApi } from "../redux/slices/cartSlice";
import ChatButton from "../userSide/components/Chat/ChatButton";

const LayoutUserSide = () => {
  const dispatch = useDispatch();
  const tokenRedux = useSelector((state) => state.user.token);
  const accessToken =
    JSON.parse(localStorage.getItem("currentUserInfor"))?.accessToken ===
    undefined
      ? tokenRedux
      : JSON.parse(localStorage.getItem("currentUserInfor")).accessToken;

  useEffect(() => {
    const fetchGetAllProductsApi = async () => {
      await dispatch(getAllProductsApi());
      await dispatch(getAllCartItemApi(accessToken));
    };

    fetchGetAllProductsApi();
  }, [accessToken]);

  return (
    <>
      <Header />
      <div>
        <Routers />
        <ChatButton />
      </div>
      <Footer />
    </>
  );
};

export default LayoutUserSide;
