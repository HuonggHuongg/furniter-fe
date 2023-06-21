import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ProductImageUpload from "../../../userSide/pages/ProductImageUpload";

export default function FormProduct(props) {
  const { initialData, submitForm } = props;
  const categories = useSelector((state) => state.categorySlice.categories);
  const [uploadedImageURLs, setUploadedImageURLs] = useState("");
  const imgReview = useRef(null);
  const [errorsImage, setErrorsImage] = useState();
  const formik = useFormik({
    initialValues: {
      ...initialData,
    },

    validationSchema: Yup.object().shape({
      productName: Yup.string().required("Name Product is required"),
      price: Yup.string().required("Price is required"),
      description: Yup.string().required("Description is required"),
      categoryId: Yup.string().required("Category is required"),
      inventoryQuantity: Yup.string().required(
        "Inventory Quantity is required"
      ),
    }),

    onSubmit: async (values) => {
      const { image, ...restValues } = values;

      const data = typeof image == "string" ? restValues : values;

      let formData = new FormData();
      console.log(values.image);
      console.log(uploadedImageURLs);
      if (uploadedImageURLs !== "") {
        formData = { ...values, image: uploadedImageURLs };
        console.log(formData);
        submitForm(formData);
        setErrorsImage("");
      } else if (values.image !== "") {
        formData = { ...values, image: values.image };
        console.log(formData);
        submitForm(formData);
        setErrorsImage("");
      } else {
        setErrorsImage("Image is required");
      }
    },
  });

  const handleImageUpload = (url) => {
    setUploadedImageURLs(url);
    console.log(url);
  };

  const { values, touched, errors, handleChange, handleSubmit } = formik;
  const styleImgReview = {
    display: values.imgProduct ? "block" : "none",
    width: "240px",
  };
  return (
    <div className="container mt-3" style={{ padding: "0px 60px" }}>
      <img
        src={values.imgProduct}
        alt="img_product"
        ref={imgReview}
        display="none"
        style={styleImgReview}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="image" className="form-label">
              Image product
            </label>
            {errorsImage && <div className="text-danger">{errorsImage}</div>}
            <ProductImageUpload
              existingImages={values?.image ? values?.image : ""}
              onImageUpload={handleImageUpload}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name_product">Name Product</label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="name_product"
              name="productName"
              aria-describedby="validationName"
              value={values.productName}
            />
            <span className="text-danger">{errors.productName}</span>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={values.price}
            />
            <span className="text-danger">{errors.price}</span>
          </div>

          <div className="form-group">
            <label htmlFor="inventoryQuantity">Inventory Quantity</label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="inventoryQuantity"
              name="inventoryQuantity"
              value={values.inventoryQuantity}
            />
            <span className="text-danger">{errors.inventoryQuantity}</span>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              name="description"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            <span className="text-danger">{errors.description}</span>
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              className="custom-select"
              name="categoryId"
              onChange={handleChange}
              value={values.categoryId}
            >
              <option>Select Category</option>
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                );
              })}
            </select>
            <span className="text-danger">{errors.category_id}</span>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
