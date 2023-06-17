import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { changeStatusOrderApi } from "../../../redux/slices/orderPendingSlice";
import { USD } from "../../../utils/convertMoney";
import { Chip } from "@mui/material";

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
      width: 130,
      sortable: false,
      valueGetter: (params) => {
        return params.row.user.userName;
      }
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "fullName",
      headerName: "Customer",
      width: 130,
      sortable: false,
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "totalOrder",
      headerName: "Total price",
      width: 130,
      valueFormatter: (params) => {
        return USD.format(params.value);
      },
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "paymentStatus",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <div>
          {!params.value && (
            <Chip
              label="Unpaid"
              color="warning"
              sx={{
                height: 24,
                fontSize: "0.75rem",
                textTransform: "capitalize",
                "& .MuiChip-label": { fontWeight: 500 },
              }}
            />
          )}
          {params.value && (
            <Chip
              label="Paid"
              color="info"
              sx={{
                height: 24,
                fontSize: "0.75rem",
                textTransform: "capitalize",
                "& .MuiChip-label": { fontWeight: 500 },
              }}
            />
          )}
        </div>
      ),
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
      <div style={{ height: "90vh", width: "100%", padding: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[7]}
          checkboxSelection={false}
          disableSelectionOnClick
          getRowId={(row) => row.orderId}
        />
      </div>
    </>
  );
}
