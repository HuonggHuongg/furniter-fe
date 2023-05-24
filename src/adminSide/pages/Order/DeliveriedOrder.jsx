import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { VND } from "../../../utils/convertVND";
import { useNavigate } from "react-router-dom";

export default function DeliveriedOrder() {
  const navigate = useNavigate();

  const orders = useSelector((state) => state.orderDeliveredSlice.listOrder);

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
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const order = params.row;

        return (
          <>
            <Button
              variant="contained"
              color="success"
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
          pageSize={5}
          rowsPerPageOptions={[6]}
          checkboxSelection={false}
          disableSelectionOnClick
          getRowId={(row) => row.orderId}
        />
      </div>
    </>
  );
}
