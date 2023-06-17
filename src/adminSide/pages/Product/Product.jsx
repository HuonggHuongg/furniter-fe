import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import "./product.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { USD } from "../../../utils/convertMoney";

export default function Product() {
  const navigate = useNavigate();

  const listProduct = useSelector((state) => state.product.products);

  console.log(listProduct);

  const columns = [
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "productId",
      headerName: "ID",
      width: 80,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "image",
      headerName: "Image",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img className="img__product--admin" src={params.value} alt="product" />
      ),
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "productName",
      headerName: "Name Product",
      width: 300,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "price",
      headerName: "Price",
      width: 130,
      // type: "number",
      valueFormatter: (params) => {
        return USD.format(params.value);
      },
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "inventoryQuantity",
      headerName: "Quantity",
      width: 130,
      valueFormatter: (params) => {
        const inventoryQuantity = params.value;
        return inventoryQuantity;
      },
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const product = params.row;
        console.log(product.inventoryQuantity);
        return (
          <>
            <Button
              variant="contained"
              color="warning"
              sx={{ marginLeft: "4px" }}
              onClick={() => {
                navigate(`/admin/edit_product/${product.productId}`, {
                  state: product,
                });
              }}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];

  const rows = listProduct.length > 0 ? listProduct : [];

  return (
    <>
      <Button
        sx={{ ml: 2, mb: 2 }}
        variant="contained"
        onClick={() => {
          navigate("/admin/add_product");
        }}
      >
        Add Product
      </Button>

      <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
        <DataGrid
          rowHeight={80}
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row.productId}
        />
      </div>
    </>
  );
}
