import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editProfileApi } from "../../../redux/slices/userSlice";

export const GeneralInfoForm = () => {
  const userLogin = JSON.parse(localStorage.getItem("currentUserInfor"));
  const token = JSON.parse(localStorage.getItem("currentUserInfor")).accessToken;
  const dispatch = useDispatch();
  console.log(userLogin.currentUser)
  const formik = useFormik({
    initialValues: {
      firstName: userLogin.currentUser.firstName,
      lastName: userLogin.currentUser.lastName,
      email: userLogin.currentUser.email,
      avatar: userLogin.currentUser.avatar,
      phoneNumber: userLogin.currentUser.phoneNumber,
    },

    onSubmit: async (values) => {
      // console.log(values);
      await dispatch(editProfileApi(userLogin.userName, values, token));
      toast.success("Profile Changed Successfully");
    },
  });

  const { values, touched, errors, handleChange, handleSubmit } = formik;
  console.log("values",values);
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
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
                  required
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
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="+12-345 678 910"
                  value={values.phoneNumber}
                  name="phoneNumber"
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
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={values.email}
                  name="email"
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
        </Form>
      </Card.Body>
    </Card>
  );
};
