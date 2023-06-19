import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Link } from "react-router-dom";

const OrderDelivered = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken =
    JSON.parse(localStorage.getItem("currentUserInfor"))?.accessToken || "";
  const [orderArray, setOrderArray] = useState([]);
  const [orderDisplayArray, setOrderDisplayArray] = useState([]);

  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      const respone = await getAllOrderAnUserService(accessToken);
      const list =
        respone?.data.filter((item) => item.statusOrder.statusId === 2) || [];
      const sortList = list
        ? list?.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          })
        : [];
      setOrderArray(sortList);
    };

    fetchGetAllOrderAnUserApi();
  }, []);
  useEffect(() => {
    const itensPerPage = 5;
    const start = (currentPage - 1) * itensPerPage;
    const end = currentPage * itensPerPage;
    const orderDisplayArray = orderArray.slice(start, end);
    setOrderDisplayArray(orderDisplayArray);

    console.log(orderArray);
  }, [currentPage, orderArray]);

  return (
    <div>
      {orderDisplayArray?.length !== 0 ? (
        <>
          {orderDisplayArray.map((item, index) => {
            return <OrderCard item={item} key={index} />;
          })}
        </>
      ) : (
        <div className="loading--api fs-5">
          You don't have any delivered orders yet!!!
        </div>
      )}
      <div className="custom__pagination">
        <PaginationControl
          page={currentPage}
          between={3}
          total={orderArray?.length}
          limit={5}
          changePage={(page) => {
            setCurrentPage(page);
          }}
          ellipsis={1}
        />
      </div>
    </div>
  );
};

export default OrderDelivered;
