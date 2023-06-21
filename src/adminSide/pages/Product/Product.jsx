import React from "react";

import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import "./product.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { USD } from "../../../utils/convertMoney";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useState } from "react";
import { format } from "date-fns";

export default function Product() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toggle = () => setModal(!modal);
  console.log(selectedProduct);

  const listProduct = useSelector((state) => state.product.products);
  const sortList = listProduct
    ? listProduct?.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      })
    : [];
  console.log(sortList);

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
            <Button
              variant="contained"
              color="info"
              sx={{ marginLeft: "4px" }}
              onClick={() => {
                setSelectedProduct(product);
                setModal(true);
              }}
            >
              Detail
            </Button>
          </>
        );
      },
    },
  ];

  const rows = sortList.length > 0 ? sortList : [];

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
          components={{
            Toolbar: GridToolbarQuickFilter,
          }}
        />
      </div>
      <Modal
        size="lg"
        style={{ marginRight: "10%" }}
        zIndex={"1050"}
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          {selectedProduct && selectedProduct?.productName}
        </ModalHeader>
        <ModalBody>
          <div className="form__rating d-flex align-items-center gap-3">
            {selectedProduct && (
              <>
                {console.log(selectedProduct)}
                <div className="row">
                  <div className="col-5">
                    <img src={selectedProduct?.image} alt="" />
                    <div className="ps-4">
                      <p>
                        Category:{" "}
                        <strong>
                          {selectedProduct?.category?.categoryName}
                        </strong>
                      </p>
                      <p>
                        Quantity:{" "}
                        <strong>{selectedProduct?.inventoryQuantity}</strong>
                      </p>
                      <p>
                        Price:{" "}
                        <strong>{USD.format(selectedProduct?.price)}</strong>
                      </p>
                      <p>
                        Created At:{" "}
                        <strong>
                          {format(
                            new Date(selectedProduct?.createdAt),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="col-7">
                    <h5>{selectedProduct?.productName}</h5>
                    <p>{selectedProduct?.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div></div>
        </ModalBody>
      </Modal>
    </>
  );
}
