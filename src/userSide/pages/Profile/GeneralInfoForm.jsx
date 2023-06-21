import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editProfileService } from "../../../services/userService";

import ImageUpload from "../ImageUpload";
import { getUserInfoApi } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const GeneralInfoForm = () => {
  const userLogin = JSON.parse(localStorage.getItem("currentUserInfor"));
  const token = JSON.parse(
    localStorage.getItem("currentUserInfor")
  ).accessToken;
  const [uploadedImageURLs, setUploadedImageURLs] = useState(
    userLogin.currentUser?.avatar || ""
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userLogin.currentUser);
  const formik = useFormik({
    initialValues: {
      firstName: userLogin.currentUser?.firstName
        ? userLogin.currentUser?.firstName
        : "",
      lastName: userLogin.currentUser?.lastName
        ? userLogin.currentUser?.lastName
        : "",
      avatar: userLogin.currentUser?.avatar
        ? userLogin.currentUser?.avatar
        : "",
      phoneNumber: userLogin.currentUser?.phoneNumber
        ? userLogin.currentUser?.phoneNumber
        : "",
      email: userLogin.currentUser?.email ? userLogin.currentUser?.email : "",
      address: userLogin.currentUser?.address
        ? userLogin.currentUser?.address
        : "",
    },
    validationSchema: Yup.object({
      // firstName: Yup.string().required("Required"),
      // lastName: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(/^0[1-9][0-9]{8}$/, "Must be a valid phone number"),
      // avatar: Yup.string()
      // .required("Required")
    }),

    onSubmit: async (values) => {
      // const dataProfile = { ...values };

      editProfileService(
        userLogin.currentUser.userName,
        values,
        token,
        uploadedImageURLs
      )
        .then((data) => {
          toast.success("Profile Changed Successfully");
          // console.log(JSON.stringify({userLogin.currentUser.userName, values, token}));
          const local = JSON.parse(localStorage.getItem("currentUserInfor"));
          console.log(local);
          console.log(data);
          localStorage.setItem(
            "currentUserInfor",
            JSON.stringify({ ...local, currentUser: data })
          );
          dispatch(getUserInfoApi());
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const handleImageUpload = (url) => {
    setUploadedImageURLs(url);
    console.log(url);
  };
  console.log(uploadedImageURLs);
  const { values, touched, errors, handleChange, handleSubmit } = formik;
  console.log("values", values);
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <button
        type="submit"
        className="col-1 ms-3 btn btn-outline-dark"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <h5 className="mb-4">General information</h5>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      value={values.firstName}
                      name="firstName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Also your last name"
                      value={values.lastName}
                      name="lastName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="emal">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@company.com"
                      value={values.email}
                      disabled
                      name="email"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="phone">
                    <Form.Label>Phone<strong className="text-danger">*</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="+12-345 678 910"
                      value={values.phoneNumber}
                      name="phoneNumber"
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <p className="errorMsg text-danger">
                        {errors.phoneNumber}{" "}
                      </p>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      value={values.address}
                      name="address"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="mt-3">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "#0a1d37" }}
                >
                  Update
                </Button>
              </div>
            </Col>
            <Col md={4} className="text-center">
              <div>
                <h1>Avatar</h1>
                <ImageUpload
                  existingImages={
                    userLogin.currentUser?.avatar
                      ? userLogin.currentUser?.avatar
                      : ""
                  }
                  onImageUpload={handleImageUpload}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
