import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrderAnUserService } from "../../services/orderServices";
import OrderCard from "../components/UI/OrderCard";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Link } from "react-router-dom";
import OrderPending from "./OrderPending";
import OrderDelivered from "./OrderDelivered";

const Order = () => {
  const [tab, setTab] = useState("pending");
  console.log(tab);
  return (
    <div className="ms-5 mt-3">
      <ul className="nav nav-tabs ms-5">
        <li
          className="nav-item col-2 text-center p-0"
          onClick={() => setTab("pending")}
        >
          <div
            className={
              tab === "pending"
                ? "nav-link active text-light bg-dark "
                : "nav-link disabled border border-dark"
            }
          >
            Pending
          </div>
        </li>

        <li
          className="nav-item col-2 text-center p-0"
          onClick={() => setTab("delivered")}
        >
          <div
            className={
              tab === "delivered"
                ? "nav-link active text-light bg-dark "
                : "nav-link disabled border border-dark"
            }
          >
            Delivered
          </div>
        </li>
      </ul>
      {tab === "pending" && <OrderPending />}
      {tab === "delivered" && <OrderDelivered />}
    </div>
  );
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const accessToken =
  //     JSON.parse(localStorage.getItem("currentUserInfor"))?.accessToken || "";
  //   const [orderArray, setOrderArray] = useState([]);
  //   const [orderDisplayArray, setOrderDisplayArray] = useState([]);
  //   const [filterValue, setFilterValue] = useState("");
  //   const [filterOrders, setFilterOrders] = useState([]);
  //   useEffect(() => {
  //     const fetchGetAllOrderAnUserApi = async () => {
  //       const respone = await getAllOrderAnUserService(accessToken);
  //       const list = respone?.data || [];
  //       const sortList = list
  //         ? list?.sort((a, b) => {
  //             const dateA = new Date(a.createdAt);
  //             const dateB = new Date(b.createdAt);
  //             return dateB - dateA;
  //           })
  //         : [];
  //       setOrderArray(sortList);
  //     };

  //     fetchGetAllOrderAnUserApi();
  //   }, []);
  //   useEffect(() => {
  //     let filterOrders = [];
  //     if (filterValue === "") {
  //       filterOrders = orderArray;
  //     } else if (filterValue === "paid") {
  //       filterOrders = orderArray.filter((item) => item.paymentStatus);
  //     } else if (filterValue === "unpaid") {
  //       filterOrders = orderArray.filter((item) => !item.paymentStatus);
  //     }
  //     setFilterOrders(filterOrders);
  //     const itensPerPage = 5;
  //     const start = (currentPage - 1) * itensPerPage;
  //     const end = currentPage * itensPerPage;
  //     const orderDisplayArray = filterOrders.slice(start, end);
  //     setOrderDisplayArray(orderDisplayArray);

  //     console.log(orderArray);
  //   }, [currentPage, orderArray, filterValue]);

  //   const handleFilter = (e) => {
  //     const filter = e.target.value;
  //     setFilterValue(filter);
  //     setCurrentPage(1);
  //   };

  //   return (
  //     <div>
  // {orderDisplayArray?.length !== 0 ? (
  //         <>
  //           <div className=" col-11 filter__widget d-flex justify-content-end ms-5 mt-3">
  //             <select value={filterValue}  onChange={handleFilter}>
  //               <option value="">Filter By</option>
  //               <option value="unpaid">Unpaid</option>
  //               <option value="paid">Paid</option>
  //             </select>
  //           </div>
  //           {orderDisplayArray.map((item, index) => {
  //             return <OrderCard item={item} key={index} />;
  //           })}
  //         </>
  //       ) : (
  //         <div className="loading--api fs-5">
  //           You don't have any orders yet!!!
  //         </div>
  //       )}
  //       <div className="custom__pagination">
  //         <PaginationControl
  //           page={currentPage}
  //           between={3}
  //           total={filterOrders?.length}
  //           limit={5}
  //           changePage={(page) => {
  //             setCurrentPage(page);
  //           }}
  //           ellipsis={1}
  //         />
  //       </div>
  // </div>
  //   );
};

export default Order;
