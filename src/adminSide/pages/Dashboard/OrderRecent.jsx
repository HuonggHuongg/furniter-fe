// ** MUI Imports

import { styled } from "@mui/material/styles";

import MuiDivider from "@mui/material/Divider";
import { useEffect } from "react";
import {
  orderRecentByPeriodTime,
  topProductByPeriodTime,
} from "../../../services/RevenueService";
import { useState } from "react";
import { USD } from "../../../utils/convertMoney";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { Button, Menu, MenuItem } from "@mui/material";
import { Download } from "@mui/icons-material";
import ExportExcel from "./ExportExcel";

const OrderRecent = (props) => {
  const [orderRecentList, setOrderRecentList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const fetchData = async () => {
      if (props.startDate && props.endDate) {
        const categoryData = await orderRecentByPeriodTime(
          props.startDate,
          props.endDate
        );
        setOrderRecentList(categoryData.data);
      }
    };

    fetchData();
  }, [props.startDate, props.endDate]);
  console.log(setOrderRecentList);

  const columns = [
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "orderId",
      headerName: "Order Id",
      width: 80,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "customer",
      headerName: "Customer",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <img
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            className="img__product--admin me-2"
            src={params.row.avatar}
            alt="product"
          />
          <strong>{params.row.username}</strong>
        </>
      ),
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "productName",
      headerName: "Product Name",
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
          {params.value}
        </div>
      ),
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "price",
      headerName: "Price",
      width: 100,
      valueFormatter: (params) => {
        return USD.format(params.value);
      },
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "quantity",
      headerName: "Quantity",
      width: 80,
      valueFormatter: (params) => {
        const inventoryQuantity = params.value;
        return inventoryQuantity;
      },
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "amount",
      headerName: "Amount",
      width: 100,
      valueFormatter: (params) => {
        return USD.format(params.value);
      },
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "statusId",
      headerName: "Status",
      width: 80,
      renderCell: (params) => (
        <div>
          {params.value === "1" && (
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
          {params.value === "2" && (
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
      field: "rating",
      headerName: "Rating",
      width: 80,
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
          {params.value} <i class="fa-solid fa-star text-warning"></i>
        </div>
      ),
    },
  ];

  const rows = orderRecentList?.length > 0 ? orderRecentList : [];

  return (
    <div style={{ height: "83vh", width: "100%" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-semibold ms-2 ">Orders Recent</h5>

        <Button
          onClick={handleClick}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textTransform: "none",
            gap: "1rem",
          }}
        >
          <Download sx={{ color: "#CCA752", fontSize: "25px" }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MenuItem>
            {" "}
            <ExportExcel
              data={[orderRecentList]}
              label={["Orders Recent"]}
            />
          </MenuItem>
        </Menu>
      </div>
      <DataGrid
        rowHeight={80}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowId={(row) => {
          return `${row.orderId}-${row.productId}`;
        }}
      />
    </div>
  );
};

export default OrderRecent;
