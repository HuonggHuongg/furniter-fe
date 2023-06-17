import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ProductImageUpload from "../../../userSide/pages/ProductImageUpload";
import { motion } from "framer-motion";

export default function FormCategory(props) {
  const { initialData, submitForm, cancelForm } = props;


  const formik = useFormik({
    initialValues: {
      ...initialData,
    },

    validationSchema: Yup.object().shape({
      categoryName: Yup.string().required("Category Name is required"),
    }),

    onSubmit: async (values) => {
      submitForm(values);
    },
  });

  const { values, touched, errors, handleChange, handleSubmit } = formik;

  return (
    <div className="col-12 ">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="form-group col-12 ">
            <label htmlFor="name_product">Category Name</label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="name_product"
              name="categoryName"
              aria-describedby="validationName"
              value={values.categoryName}
            />
            <span className="text-danger">{errors.categoryName}</span>
          </div>

          <div className="d-flex justify-content-center">
            <motion.button className="btn btn-dark me-3">Submit</motion.button>
            <motion.button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => {
                cancelForm();
              }}
            >
              <div>Cancel</div>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
