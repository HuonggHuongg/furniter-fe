import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { editProductApi } from "../../../redux/slices/productSlice";
import FormCategory from "./FormCategory";
import { updateCategoryServices } from "../../../services/categoryServices";

export default function EditCategory() {
  const { idCategory } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const {
    categoryName,
  } = state;


  const initialValues = {
    categoryName
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  const editProduct = async (formData) => {
    updateCategoryServices(formData,idCategory).then((data) => {
      toast.success("The category has been successfully changed!");
    });
  };
  return (
    <div className="container" style={{ padding: "0px 60px" }}>
      <button className="btn btn-outline-dark mb-3" onClick={handleGoBack}>
        Go back
      </button>
      <div className="border border-black p-2 rounded mb-3">
        <h3 className=""> Edit Category</h3>
        <FormCategory initialData={initialValues} submitForm={editProduct} />
      </div>
    </div>
  );
}
