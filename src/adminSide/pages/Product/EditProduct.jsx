import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormProduct from "./FormProduct";
import { toast } from "react-toastify";
import { editProductApi, getAllProductsApi } from "../../../redux/slices/productSlice";

export default function EditProduct() {
  const { idProduct } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const {
    productName,
    price,
    description,
    category,
    image,
    inventoryQuantity,
  } = state;
  let categoryId = category.categoryId;
  console.log(category.categoryId);

  const initialValues = {
    // imgProduct: image,
    image,
    productName,
    price,
    description,
    categoryId,
    inventoryQuantity,
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const editProduct = async (formData) => {
    await toast.success("The product has been successfully changed!");
    console.log("form data", formData);
    await dispatch(editProductApi(formData, navigate, idProduct));
    await dispatch(getAllProductsApi())

  };
  return (
    <div className="container" style={{ padding: "0px 60px" }}>
      <button className="btn btn-outline-dark mb-3" onClick={handleGoBack}>
        Go back
      </button>
      <div className="border border-black p-2 rounded mb-3">
        <h3 className=""> Edit Product</h3>
        <FormProduct initialData={initialValues} submitForm={editProduct} />
      </div>
    </div>
  );
}
