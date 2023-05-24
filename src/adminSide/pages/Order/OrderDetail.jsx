import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getDetailsOrderService } from "../../../services/orderServices";
import { useLocation } from "react-router-dom";
import "./order.css";
import { VND } from "../../../utils/convertVND";
import USDollar from "../../../utils/FormatMoney";

export default function OrderDetail() {
  const [orderArray, setOrderArray] = useState([]);
  const { state } = useLocation();
  const order = state;

  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      const respone = await getDetailsOrderService(state.orderId);
      setOrderArray(respone.data);
    };
    fetchGetAllOrderAnUserApi();
  }, [state]);

  const columns = [
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "image",
      headerName: "Image",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <img
            className="img__product--admin"
            src={params.value}
            alt="product"
          />
        );
      },
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "productName",
      headerName: "Name Product",
      width: 150,
      sortable: false,
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "paymentOrderItem",
      headerName: "Total price",
      width: 130,
      type: "number",
      sortable: false,
      filterable: false,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "quantity",
      headerName: "Quantity",
      width: 130,
      type: "number",
      sortable: false,
      filterable: false,
    },
  ];

  const rows = orderArray?.length > 0? orderArray.map((orderItem) => {
    const product = orderItem.product;
    return {
      ...orderItem,
      productName: product.productName,
      image: product.image,
    };
  }):[];

  const converDate = (value) => {
    const date = new Date(value);
    const day = date.toLocaleDateString("en-US");
    const time = date.toLocaleTimeString();
    return day + " " + time;
  };
console.log(order)
  return (
    <div className="container px-5">
      <h3 className="mb-2">OrderDetail</h3>
      <div className="mb-3">
        <p>Order {order.id}</p>
        <p>Create at {converDate(order.createdAt)}</p>
      </div>
      <div style={{ height: "40vh", width: "100%" }}>
        <DataGrid
          rowHeight={80}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick
          getRowId={(row) => row.orderItemId}
        />
      </div>
      <div className="container mt-5">
        <div className="row ">
          <div className=" col-6 ">
            <div className="info_user--order">
              <p>{order.fullName}</p>
              <p>{order.receivingAddress}</p>
              <p>{order.phoneNumber}</p>
            </div>
          </div>
          <div className="col-6 ">
            <div className="info_price--order">
              <h4>Totalize</h4>
              <p className="mt-2">
                Subtotal({orderArray.length} product) :{" "}
                {USDollar.format(order.totalOrder)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
