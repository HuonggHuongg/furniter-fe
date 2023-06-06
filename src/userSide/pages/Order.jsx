import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";

const Order = () => {
  const accessToken = JSON.parse(
    localStorage.getItem("currentUserInfor")
  ).accessToken;
  const [orderArray, setOrderArray] = useState([]);
  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      const respone = await getAllOrderAnUserService(accessToken);
      setOrderArray(respone.data);
    };

    fetchGetAllOrderAnUserApi();
  }, []);
  return (
    <div>
      {orderArray.length !== 0 ? (
        orderArray.map((item, index) => {
          return <OrderCard item={item} key={index} />;
        })
      ) : (
        <div className="loading--api fs-5">
          You don't have any orders yet!!!
          {/* <Spinner animation="grow" variant="success" /> */}
        </div>
      )}
    </div>
  );
};

export default Order;
