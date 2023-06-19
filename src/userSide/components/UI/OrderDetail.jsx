import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import {
  changeFeedbackStatusService,
  getDetailsOrderService,
} from "../../../services/orderServices";
import "../../styles/order-detail.css";
import { USD } from "../../../utils/convertMoney";
import { postFeedBackService } from "../../../services/feedBackServices";
import { toast } from "react-toastify";
import { useRef } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ErrorPage from "../../ErrorPage/ErrorPage";

const RATINGS = [1, 2, 3, 4, 5];
export const OrderDetail = () => {
  const { id } = useParams();
  const [orderArray, setOrderArray] = useState([]);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();
  const [selectedOrderItemId, setSelectedOrderItemId] = useState();
  const [createAt, setCreateAt] = useState();
  const [errorPage, setErrorPage] = useState();

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      getDetailsOrderService(id).then((data) => {
        console.log(data);
        if (data?.status === 200) {
          setOrderArray(data?.data);
        } else {
          setErrorPage(data.response?.status || data.status);
        }
      });
    };
    fetchGetAllOrderAnUserApi();
  }, [id, selectedOrderItemId]);
  console.log(errorPage);
  console.log(selectedOrderItemId);
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFeedback = (productId, orderItemId) => {
    setModal(!modal);
    setSelectedProductId(productId);
    setSelectedOrderItemId(orderItemId);
  };

  const [rating, setRating] = useState(0);
  const currentUser = JSON.parse(
    localStorage.getItem("currentUserInfor")
  ).currentUser;
  const reviewMsg = useRef("");
  const submitHandler = (e) => {
    e.preventDefault();
    const reivewUserMsg = reviewMsg.current.value;
    const dataFeedBack = {
      comment: reivewUserMsg,
      rating,
    };

    const fetchFeedBackApi = async () => {
      postFeedBackService(selectedProductId, dataFeedBack).then((data) => {
        console.log(data);
        changeFeedbackStatusService(selectedOrderItemId).then(() => {
          setSelectedProductId(null);
          setSelectedOrderItemId(null);
        });
        toast.success("Review submitted");
      });

      setRating(0);
    };

    if (currentUser !== null) {
      fetchFeedBackApi();
      reviewMsg.current.value = "";
    } else {
      toast.error("You must login before comment");
    }

    setModal(false);
  };

  useEffect(() => {
    console.log(orderArray);
    if (orderArray?.length > 0) {
      const date = new Date(orderArray[0]?.orderUser?.createdAt);
      const formatDate = format(date, "dd/MM/yyyy HH:mm");
      setCreateAt(formatDate);
    }
  }, [orderArray]);
  return (
    <>
      {orderArray?.length > 0 && (
        <Container className="table__order">
          <div className="">
            <button
              className="btn btn-outline-dark mb-2 mt-2"
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>
          <h5 className="title__order--item">
            {" "}
            The order created at: <span>{createAt}</span>
          </h5>
          <Row>
            <Col lg="12">
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th className="col-6">Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderArray
                    ? orderArray.map((item, index) => {
                        return (
                          <Tr
                            handleFeedback={() =>
                              handleFeedback(
                                item.product.productId,
                                item.orderItemId
                              )
                            }
                            item={item}
                            key={index}
                          />
                        );
                      })
                    : 0}
                </tbody>
              </table>
              {orderArray.length > 0 ? (
                <div className="col-10 ms-3 mb-3 d-flex justify-content-end">
                  <div className="info_price--order">
                    <h4>Totalize</h4>
                    <p className="mt-2">
                      Subtotal({orderArray.length} product) :{" "}
                      {USD.format(orderArray[0].orderUser.totalOrder)}
                    </p>
                  </div>
                </div>
              ) : (
                0
              )}
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Leave your experience</ModalHeader>
            <ModalBody>
              <form action="" onSubmit={submitHandler}>
                <div className="form__rating d-flex align-items-center gap-3">
                  {RATINGS.map((item, key) => {
                    return (
                      <motion.span
                        whileTap={{ scale: 1.2 }}
                        onClick={() => setRating(item)}
                      >
                        {item}{" "}
                        <i
                          className={
                            rating >= item
                              ? "fa-star fa-solid"
                              : "fa-star fa-regular"
                          }
                        ></i>
                      </motion.span>
                    );
                  })}
                </div>
                <div className="form__group">
                  <textarea
                    rows={4}
                    type="text"
                    placeholder="Review Meassage ..."
                    ref={reviewMsg}
                    required
                  />
                </div>
                <motion.button className="btn btn-dark me-3">
                  Submit
                </motion.button>
                <motion.button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={toggle}
                >
                  <div>Cancel</div>
                </motion.button>
              </form>
            </ModalBody>
          </Modal>
        </Container>
      )}
      {orderArray?.length === 0 && errorPage && (
        <ErrorPage status={errorPage} />
      )}
    </>
  );
};
const Tr = (props) => {
  const { item, handleFeedback } = props;

  console.log(item);
  return (
    <>
      <tr>
        <td>
          <Link to={`/shop/${item.product.productId}`}>
            <img src={item.product.image} alt="#" />
          </Link>
        </td>
        <td>
          <Link to={`/shop/${item.product.productId}`}>
            {item.product.productName}
          </Link>
        </td>
        <td>{USD.format(item.product.price)}</td>
        <td>{item.quantity}</td>
        <td>{USD.format(item.product?.price * item.quantity)}</td>
        <td>
          {item.orderUser.statusOrder.statusId === 2 &&
            !item.feedbackStatus && (
              <button className="buy__btn detail__btn" onClick={handleFeedback}>
                Review
              </button>
            )}
          {!item.paymentStatus && item.feedbackStatus && (
            <button className="buy__btn detail__btn button__disable">
              Reviewed
            </button>
          )}
        </td>
      </tr>
    </>
  );
};
