import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import "./category.css";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import FormCategory from "./FormCategory";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

import {
  createCategoryServices,
  updateCategoryServices,
} from "../../../services/categoryServices";
import { getAllCategoryApi } from "../../../redux/slices/categorySlice";
import { getAllProductByCategoryService } from "../../../services/productService";
import { USD } from "../../../utils/convertMoney";

export default function Category() {
  const listCategory = useSelector((state) => state.categorySlice.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productList, setProductList] = useState([]);
  const handleViewProducts = (category) => {
    const fetchProductsByCategory = () => {
      if (category) {
        getAllProductByCategoryService(category.categoryId).then((data) =>
          setProductList(data.data)
        );
      }
    };
    fetchProductsByCategory();
  };
  console.log(productList);
  const columns = [
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "categoryId",
      headerName: "ID",
      width: 80,
    },
    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "categoryName",
      headerName: "Category Name",
      width: 300,
    },

    {
      renderHeader: (params) => <strong>{params.colDef.headerName} </strong>,
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const category = params.row;
        return (
          <>
            <Button
              variant="contained"
              color="warning"
              sx={{ marginLeft: "4px" }}
              onClick={() => {
                setSelectedCategory(category);
                setModal(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="info"
              sx={{ marginLeft: "4px" }}
              onClick={() => {
                handleViewProducts(category);
                setModalView(true);
              }}
            >
              View Products
            </Button>
          </>
        );
      },
    },
  ];

  const rows = listCategory.length > 0 ? listCategory : [];
  const [modal, setModal] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [errors, setErrors] = useState();

  const toggle = () => setModal(!modal);
  const toggleView = () => setModalView(!modalView);

  const initialValues = {
    categoryName: selectedCategory?.categoryName
      ? selectedCategory?.categoryName
      : "",
  };
  const dispatch = useDispatch();

  const addCategory = async (formData) => {
    const fetchCreateCategoryApi = async () => {
      if (selectedCategory) {
        updateCategoryServices(formData, selectedCategory.categoryId)
          .then((data) => {
            toast.success("The category has been successfully changed!");
            setModal(false);
            dispatch(getAllCategoryApi());
            setSelectedCategory(null);
            setErrors("");
          })
          .catch((error) => {
            setErrors(error.response.data);
          });
      } else {
        createCategoryServices(formData)
          .then((data) => {
            toast.success("Add category successfully!");
            setModal(false);
            dispatch(getAllCategoryApi());
          })
          .catch((error) => {
            setErrors(error.response.data);
          });
      }
    };
    fetchCreateCategoryApi();
  };

  return (
    <>
      <Button
        sx={{ ml: 2, mb: 2 }}
        variant="contained"
        onClick={() => {
          setModal(!modal);
        }}
      >
        Add Category
      </Button>

      <div style={{ height: "78vh", width: "100%", padding: "0px 20px" }}>
        <DataGrid
          rowHeight={80}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[3]}
          disableSelectionOnClick
          getRowId={(row) => row.categoryId}
        />
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {selectedCategory ? "Update Category" : "Create Category"}
        </ModalHeader>
        <ModalBody>
          {errors &&
            errors.map((error) => {
              return (
                <div className="text-danger ms-4">{error.defaultMessage}</div>
              );
            })}
          <div className="form__rating d-flex align-items-center gap-3">
            <FormCategory
              initialData={initialValues}
              submitForm={addCategory}
              cancelForm={() => {
                setModal(false);
                setSelectedCategory(null);
                setErrors("");
              }}
            ></FormCategory>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalView} toggle={toggleView}>
        <ModalHeader toggle={toggleView}>Product List</ModalHeader>
        <ModalBody>
          <div className="form__rating d-flex align-items-center gap-3">
            {productList && (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Image</th>
                    <th scope="col">Product name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>

                {productList.map((product) => {
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{product.productId}</th>
                        <td><img src={product.image} alt=""></img></td>
                        <td>{product.productName}</td>
                        <td>{USD.format(product.price)}</td>
                        <td>{product.inventoryQuantity}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
