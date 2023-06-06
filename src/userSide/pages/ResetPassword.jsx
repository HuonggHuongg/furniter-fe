import { useFormik } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup } from "reactstrap";
import * as Yup from "yup";
import { resetPasswordService } from "../../services/loginServices";
import { toast } from "react-toastify";

function ResetPassword() {
  const [error, setError] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [email] = useState(queryParams.get("email"));
  const [token] = useState(queryParams.get("token"));
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",

      confirmedPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
      confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: (values) => {
      const dataResetPass = { ...values };

      const fectApiResetPassword = async () => {
        resetPasswordService(dataResetPass, email, token)
          .then((data) => {
            toast.success("Reset password successfully!");
            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
            setError(error?.response?.data);
            console.log(error?.response?.data);
          });
      };
      fectApiResetPassword();
    },
  });
  return (
    <div className="row text-center m-3">
      <Form
        className="auth__form m-auto col-lg-6 mb-3"
        onSubmit={formik.handleSubmit}
      >
        <h4 className="text-light mb-3">Please input new password!!</h4>
        {error?.length > 0 &&
          error.map((err) => {
            return <div className="text-left text-danger mb-2">* {err.defaultMessage} </div>;
          })}

        <FormGroup className="form__group">
          <input
            type="text"
            id="password"
            placeholder="Enter your password"
            value={formik.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className="errorMsg"> {formik.errors.password} </p>
          )}
        </FormGroup>
        <FormGroup className="form__group">
          <input
            type="text"
            id="confirmedPassword"
            placeholder="Confirm your passworld"
            value={formik.values.confirmedPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmedPassword && (
            <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
          )}
        </FormGroup>
        <button className="buy__btn auth__btn" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}

export default ResetPassword;
