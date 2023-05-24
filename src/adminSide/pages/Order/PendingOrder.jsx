import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { VND } from "../../../utils/convertVND";
import { changeStatusOrderApi } from "../../../redux/slices/orderPendingSlice";

export default function PendingOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderPendingSlice.listOrder);
  // const products = useSelector((state) => state.product.products);
  console.log( "order",orders)

  const columns = [
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "orderId",
      headerName: "ID",
      width: 30,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "username",
      headerName: "Username",
      width: 150,
      sortable: false,
      valueGetter: (params) => {
        return params.row.user.userName;
      }
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "fullName",
      headerName: "Customer",
      width: 150,
      sortable: false,
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "totalOrder",
      headerName: "Total price",
      width: 130,
      type: "number",
      sortable: false,
      filterable: false,
      valueFormatter: (params) => {
        return VND.format(params.value);
      },
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "createdAt",
      headerName: "Created at",
      width: 130,
      sortable: false,
      filterable: false,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("en-US");
      },
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "action",
      headerName: "Action",
      width: 250,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const order = params.row;
        const {orderId} = order;
        return (
          <>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(changeStatusOrderApi(orderId));
              }}
            >
              Deliveried
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ marginLeft: "5px" }}
              onClick={() => {
                navigate(`/admin/orders/view_detail/${order.orderId}`, {
                  state: order,
                });
              }}
            >
              View Detail
            </Button>
          </>
        );
      },
    },
  ];

  const rows = orders?.length > 0 ? orders : [];

  return (
    <>
      <div style={{ height: "78vh", width: "100%", padding: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[6]}
          checkboxSelection={false}
          disableSelectionOnClick
          getRowId={(row) => row.orderId}
        />
      </div>
    </>
  );
}
