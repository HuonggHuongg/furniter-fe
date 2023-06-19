import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/signup.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userLoginApi } from "../../redux/slices/userSlice";
import {
  sendEmailSignUpSuccessService,
  sendOTPSignUpService,
  signupServices,
} from "../../services/signupService";
import generateRandomCode from "../../utils/ramdomOTP";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [otpRandom, setOTPRandom] = useState();
  const [otpConfirm, setOTPConfirm] = useState();
  const [signupData, setSignUpData] = useState();
  const [otpError, setOtpError] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
      confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
      phone: Yup.string()
        .required("Required")
        .matches(/^0[1-9][0-9]{8}$/, "Must be a valid phone number"),
    }),
    onSubmit: (values) => {
      const dataSignup = { ...values };
      delete dataSignup.confirmedPassword;
      const ramdomOPT = generateRandomCode();
      setSignUpData(dataSignup);
      setOTPRandom(ramdomOPT);
      console.log(ramdomOPT);
      const fecthSendOTPApi = async () => {
        sendOTPSignUpService(dataSignup, ramdomOPT);
        setShowForm(false);
      };
      fecthSendOTPApi();

      const fectApiSignup = async () => {
        signupServices(dataSignup)
          .then((data) => {
            sendEmailSignUpSuccessService(dataSignup);
            const dataLogin = {
              name: formik.values.name,
              password: formik.values.password,
            };
            dispatch(userLoginApi(dataLogin));
            toast.success("Signup successfully!");
            navigate("/home");
          })
          .catch((error) => {
            console.log(error);
            setErrors(error?.response?.data);
            console.log(error?.response?.data);
          });
      };

      // fectApiSignup();
    },
  });
  const handleConfirm = (e) => {
    e.preventDefault();

    const fectApiSignup = async () => {
      if (signupData) {
        signupServices(signupData)
          .then((data) => {
            sendEmailSignUpSuccessService(signupData);
            const dataLogin = {
              name: formik.values.name,
              password: formik.values.password,
            };
            dispatch(userLoginApi(dataLogin));
            toast.success("Signup successfully!");
            navigate("/home");
          })
          .catch((error) => {
            console.log(error);
            setErrors(error?.response?.data);
            console.log(error?.response?.data);
          });
      }
    };

    if (otpConfirm === otpRandom) {
      fectApiSignup();
    } else {
      setOtpError("OTP is incorrect!!!");
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-food fs-4">Sign up</h3>
              {showForm && (
                <Form className="auth__form" onSubmit={formik.handleSubmit}>
                  {errors?.length > 0 &&
                    errors.map((error) => {
                      return (
                        <div className="text-left text-danger mb-2">
                          * {error.defaultMessage}{" "}
                        </div>
                      );
                    })}
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      id="name"
                      placeholder="Username"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && (
                      <p className="errorMsg"> {formik.errors.name} </p>
                    )}
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                      <p className="errorMsg"> {formik.errors.email} </p>
                    )}
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
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
                      type="password"
                      id="confirmedPassword"
                      placeholder="Confirm your passworld"
                      value={formik.values.confirmedPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.confirmedPassword && (
                      <p className="errorMsg">
                        {" "}
                        {formik.errors.confirmedPassword}{" "}
                      </p>
                    )}
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      id="phone"
                      placeholder="Enter your phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.phone && (
                      <p className="errorMsg"> {formik.errors.phone} </p>
                    )}
                  </FormGroup>
                  <button className="buy__btn auth__btn" type="submit">
                    Sign up
                  </button>
                  <p>
                    Do you already have an account?
                    <Link to="/login">Login</Link>
                  </p>
                </Form>
              )}
              {!showForm && (
                <Form className="auth__form" onSubmit={handleConfirm}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      id="otp"
                      placeholder="Please input OTP code sent to your email"
                      value={otpConfirm}
                      onChange={(e) => {
                        setOTPConfirm(e.target.value);
                        setOtpError("");
                      }}
                    />
                    {otpError && <p className="errorMsg"> {otpError} </p>}
                  </FormGroup>

                  <button className="buy__btn auth__btn" type="submit">
                    Confirm
                  </button>
                </Form>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
