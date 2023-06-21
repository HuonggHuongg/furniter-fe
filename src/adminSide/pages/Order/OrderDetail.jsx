import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getDetailsOrderService } from "../../../services/orderServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./order.css";
import { USD } from "../../../utils/convertMoney";
import ErrorPage from "../../../userSide/ErrorPage/ErrorPage";

export default function OrderDetail() {
  const [orderArray, setOrderArray] = useState([]);
  const { idOrder } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState();
  const order = state;

  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      getDetailsOrderService(idOrder).then((data) => {
        console.log(data);
        setStatus(data.status);
        setOrderArray(data.data);
      });
    };
    fetchGetAllOrderAnUserApi();
  }, [idOrder]);

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
      width: 400,
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "paymentOrderItem",
      headerName: "Total price",
      width: 130,
      type: "number",
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

  const rows =
    orderArray?.length > 0
      ? orderArray.map((orderItem) => {
          const product = orderItem.product;
          return {
            ...orderItem,
            productName: product.productName,
            image: product.image,
          };
        })
      : [];

  const converDate = (value) => {
    const date = new Date(value);
    const day = date.toLocaleDateString("en-US");
    const time = date.toLocaleTimeString();
    return day + " " + time;
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      {orderArray?.length > 0 && (
        <div className="container px-5">
          <button className="btn btn-outline-dark mb-3" onClick={handleGoBack}>
            Go back
          </button>
          <div className="mb-3">
            <h4>Order #{order?.orderId}</h4>
            <p>Create at {converDate(order?.createdAt)}</p>
          </div>
          <div style={{ height: "50vh", width: "100%" }}>
            <DataGrid
              rowHeight={80}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[4]}
              checkboxSelection={false}
              disableSelectionOnClick
              getRowId={(row) => row.orderItemId}
            />
          </div>
          <div className="container my-3">
            <div className="row">
              <div className=" col-6 ">
                <div className="info_user--order">
                  <div className="col-12">
                    <table>
                      <tbody>
                        <tr>
                          <td>Receiver</td>
                          <th>: {order?.fullName}</th>
                        </tr>
                        <tr>
                          <td>Address Delivery</td>
                          <th>: {order?.receivingAddress}</th>
                        </tr>
                        <tr>
                          <td>Phone Number</td>
                          <th>: {order?.phoneNumber}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-6 ">
                <div className="info_price--order">
                  <h4>Totalize</h4>
                  <p className="mt-2">
                    Subtotal({orderArray?.length} product) :{" "}
                    {USD.format(order?.totalOrder)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {status && status !== 200 && <ErrorPage status={status} />}
    </>
  );
}
