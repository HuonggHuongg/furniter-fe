import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Form, FormGroup } from "reactstrap";
import "../styles/signup.css";
import { forgotPasswordService } from "../../services/loginServices";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [error, setError] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
    }),
    onSubmit: (values) => {
      const email = { ...values };
      const fectApiForgotPass = async () => {
        forgotPasswordService(email)
          .then((data) => {
            toast.success("Please check your email to reset password");
            setError("")
          })
          .catch((error) => {
            console.log(error);
            setError(error?.response?.data);
          });
      };

      fectApiForgotPass();
    },
  });
  return (
    <div className="row text-center m-3">
      <Form
        className="auth__form m-auto col-lg-6 mb-3"
        onSubmit={formik.handleSubmit}
      >
        <h4 className="text-light mb-3">Please input your email!!</h4>
        {error?.length > 0 &&
          error.map((err) => {
            return (
              <div className="text-left text-danger mb-2">
                * {err.defaultMessage}{" "}
              </div>
            );
          })}

        <FormGroup className="form__group">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="errorMsg"> {formik.errors.email} </p>
          )}
        </FormGroup>
        <button className="buy__btn auth__btn" type="submit">
          Send
        </button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
