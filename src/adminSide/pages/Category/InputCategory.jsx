import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductApi } from "../../../redux/slices/productSlice";
import { toast } from "react-toastify";
import FormCategory from "./FormCategory";

export default function InputCategory() {
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
  };
  return (
    <div className="container" style={{ padding: "0px 60px" }}>
      <div className="border border-black p-2 rounded mb-3">
        <FormCategory initialData={initialValues} submitForm={addProduct} />
      </div>
    </div>
  );
}
