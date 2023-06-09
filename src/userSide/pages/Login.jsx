import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup, Progress } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/login.css";
import { replace, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLoginApi } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserInfor = useSelector((state) => state.user);
  const messageLogin = currentUserInfor.message;
  const from = location.state?.from || "";
  console.log(from);

  useEffect(() => {
    if (messageLogin === "Login successfully!") {
      from ? navigate(from, { replace: true }) : navigate("/home");
      toast.success(messageLogin);
    }

    if (messageLogin === "Login fail!") {
      toast.error(messageLogin);
    }
  }, [messageLogin, navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      password: Yup.string().required(),
    }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = undefined;
    formik.values.name && formik.values.password
      ? formik.errors.name || formik.errors.password
        ? toast.error("Name or passworld invalid")
        : (data = formik.values)
      : toast.error("Name or Password invalid!");
    const fectLoginApi = async () => {
      await dispatch(userLoginApi(data));
      // await navigate("/home")
      // toast.success("Login successfully!")
    };

    if (data !== undefined) fectLoginApi();
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Helmet title="login">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-food fs-4">Login</h3>
              <Form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Enter your username"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="eye-icon"
                      />
                    </button>
                  </div>
                </FormGroup>
                <button className="buy__btn auth__btn">Login</button>
                <p>
                  <Link to="/forgot-password">Forgot password?</Link>
                </p>
                <p>
                  Don't have an account?
                  <Link to="/signup">Create an account</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
