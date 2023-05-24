import React, { useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addProductApi } from "../../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

export default function FormProduct(props) {
  const { initialData, submitForm } = props;
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categorySlice.categories);

  const imgReview = useRef(null);
  const formik = useFormik({
    initialValues: {
      ...initialData,
    },

    validationSchema: Yup.object().shape({
      productName: Yup.string().required("Name Product is required"),
      price: Yup.string().required("Price is required"),
      description: Yup.string().required("Description is required"),
      categoryId: Yup.string().required("Category is required"),
      inventoryQuantity: Yup.string().required("Inventory Quantity is required"),
      image: Yup.string().required("Image is required"),
    }),

    onSubmit: async (values) => {
      const { image, ...restValues } = values;
      
      //vì trường hợp add imgProduct là 1 file
      //nhưng edit thì nó là 1 string link hình
      const data = typeof image == "string" ? restValues : values;

      let formData = new FormData();
      formData = {...data}
      submitForm(formData);
    },
  });

  const showImgProduct = (fileToLoad) => {
    let fileReader = new FileReader();
    fileReader.onload = function (fileLoadEvent) {
      let srcData = fileLoadEvent.target.result;
      imgReview.current.src = srcData;
      imgReview.current.style.display = "block";
    };

    // Đọc thông tin tập tin đã được đăng tải
    fileReader.readAsDataURL(fileToLoad);
  };

  const { values, touched, errors, handleChange, handleSubmit } = formik;
  const styleImgReview = {
    display: values.imgProduct ? "block" : "none",
    width: "240px",
  };
  return (
    <div className="container mt-5" style={{ padding: "0px 60px" }}>
      <img
        src={values.imgProduct}
        alt="img_product"
        ref={imgReview}
        display="none"
        style={styleImgReview}
      />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Image product
          </label>
          <input
            className="form-control"
            id="image"
            name="image"
            type="file"
            accept=".jpg, .png"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
              showImgProduct(event.currentTarget.files[0]);
            }}
          />
          <span className="text-danger">{errors.image}</span>
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
            rows="3"
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
      </form>
    </div>
  );
}
