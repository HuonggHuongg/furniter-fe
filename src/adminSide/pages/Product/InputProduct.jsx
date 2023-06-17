import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductApi, getAllProductsApi } from "../../../redux/slices/productSlice";
import FormProduct from "./FormProduct";
import { toast } from "react-toastify";

export default function InputProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    image: "",
    productName: "",
    price: "",
    description: "",
    categoryId: "",
    inventoryQuantity: "",
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const addProduct = async (formData) => {
    await toast.success("Add product successfully!");
    await dispatch(addProductApi(formData, navigate));
    await dispatch(getAllProductsApi())
  };
  return (
    <div className="container" style={{ padding: "0px 60px" }}>
      <button className="btn btn-outline-dark mb-3" onClick={handleGoBack}>
        Go back
      </button>
      <div className="border border-black p-2 rounded mb-3">
        <h3> Add Product</h3>
        <FormProduct initialData={initialValues} submitForm={addProduct} />
      </div>
    </div>
  );
}
