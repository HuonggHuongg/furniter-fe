import React from "react";
import { useSelector } from "react-redux";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { USD } from "../../../utils/convertMoney";
import { format } from "date-fns";

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
      },
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
      sortable: false,
      filterable: false,
      valueFormatter: (params) => {
        return USD.format(params.value);
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
        return format(date, "dd/MM/yyyy HH:mm");
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
              color="info"
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
      <div style={{ height: "90vh", width: "100%", padding: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[6]}
          checkboxSelection={false}
          disableSelectionOnClick
          getRowId={(row) => row.orderId}
          components={{
            Toolbar: GridToolbarQuickFilter,
          }}
        />
      </div>
    </>
  );
}
