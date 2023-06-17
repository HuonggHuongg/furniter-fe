import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { USD } from "../../utils/convertMoney";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Order = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken = JSON.parse(
    localStorage.getItem("currentUserInfor")
  ).accessToken;
  const [orderArray, setOrderArray] = useState([]);
  const [orderDisplayArray, setOrderDisplayArray] = useState([]);
  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      const respone = await getAllOrderAnUserService(accessToken);
      const sortList = respone.data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
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
  }, [currentPage, orderArray]);

  return (
    <div>
      {orderDisplayArray?.length !== 0 ? (
        orderDisplayArray.map((item, index) => {
          return <OrderCard item={item} key={index} />;
        })
      ) : (
        <div className="loading--api fs-5">
          You don't have any orders yet!!!
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

export default Order;
