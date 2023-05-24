import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "reactstrap";
import { changeStatusPaymentService, getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { useLocation, useParams } from "react-router-dom";


const Order = () => {
  const accessToken = JSON.parse(localStorage.getItem("currentUserInfor")).accessToken;
  const [orderArray, setOrderArray] = useState([]);
  const state  = useLocation();

  console.log(state)
  const queryParams = new URLSearchParams(state.search);
    const [idOrder] = useState([JSON.parse(queryParams.get("vnp_TxnRef"))]);
console.log(idOrder)
  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      await changeStatusPaymentService(idOrder[0])
      const respone = await getAllOrderAnUserService(accessToken);
      
      console.log(respone.data);
      setOrderArray(respone.data);
    };

    fetchGetAllOrderAnUserApi();
  }, []);
  return (
    <div>
      {orderArray.length !== 0
        ? orderArray.map((item, index) => {
            return <OrderCard item={item} key={index} />;
          })
        : <div className="loading--api">
          <Spinner animation="grow" variant="success" />
        </div>}
    </div>
  );
};

export default Order;
