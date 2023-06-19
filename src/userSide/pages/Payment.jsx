import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import {
  addProductToOrderService,
  changeStatusPaymentService,
  changeTotalOrderService,
  getDetailsOrderService,
} from "../../services/orderServices";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItemApi } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { sendEmailPaymentSuccessService } from "../../services/paymentService";
import "../styles/payment.css";
import { USD } from "../../utils/convertMoney";

function Payment() {
  const state = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(state.search);
  const [orderId] = useState(queryParams.get("vnp_TxnRef"));
  const [totalOrder] = useState(queryParams.get("vnp_Amount"));
  const [transactionStatus] = useState(
    queryParams.get("vnp_TransactionStatus")
  );
  const currentUser = JSON.parse(
    localStorage.getItem("currentUserInfor")
  ).currentUser;

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [productIdList, setProductIdList] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    getDetailsOrderService(orderId).then((data) => setOrderItems(data.data));
  }, [orderId]);

  console.log(orderItems);

  useEffect(() => {
    let productIdListAssign = [];
    if (productIdList.length === 0) {
      if (cartItems?.length > 0) {
        console.log(cartItems);
        cartItems.forEach((cartItem) => {
          productIdListAssign.push(cartItem.product.productId);
        });
        setProductIdList(productIdListAssign);
      } else if (orderItems?.length > 0) {
        orderItems.forEach((orderItem) => {
          productIdListAssign.push(orderItem.product.productId);
        });
        setProductIdList(productIdListAssign);
      }
    }
  }, [cartItems, orderId, orderItems, orderItems?.length, productIdList]);

  useEffect(() => {
    const currentDate = moment().format("DD MMMM YYYY");
    const dataSendEmailPayment = {
      userName: currentUser.userName,
      subject: "Successful Payment",
      email: currentUser.email,
      receiver: currentUser.lastName + " " + currentUser.firstName,
      orderId: orderId,
      createdAt: currentDate,
    };
    const fetchPaymentApi = async () => {
      if (cartItems?.length > 0) {
        console.log(productIdList);
        await addProductToOrderService(productIdList, orderId);
        await changeTotalOrderService(orderId);
        await dispatch(getAllCartItemApi());
      }

      if (transactionStatus === "00" && productIdList.length > 0) {
        changeStatusPaymentService(orderId).then((data) => {
          sendEmailPaymentSuccessService(dataSendEmailPayment);
          toast.success("Payment success");
        });
      }
    };
    fetchPaymentApi();
  }, [productIdList]);

  return (
    <div>
      {transactionStatus === "00" && (
        <div>
          <div className="animation-ctn">
            <div className="icon icon--order-success svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="154px"
                height="154px"
              >
                <g fill="none" stroke="#22AE73" strokeWidth={2}>
                  <circle
                    cx={77}
                    cy={77}
                    r={72}
                    style={{
                      strokeDasharray: "480px, 480px",
                      strokeDashoffset: 960,
                    }}
                  />
                  <circle
                    id="colored"
                    fill="#22AE73"
                    cx={77}
                    cy={77}
                    r={72}
                    style={{
                      strokeDasharray: "480px, 480px",
                      strokeDashoffset: 960,
                    }}
                  />
                  <polyline
                    className="st0"
                    stroke="#fff"
                    strokeWidth={10}
                    points="43.5,77.8 63.7,97.9 112.2,49.4 "
                    style={{
                      strokeDasharray: "100px, 100px",
                      strokeDashoffset: 200,
                    }}
                  />
                </g>
              </svg>
            </div>
            <br />
            <h2>Payment Success</h2>
            <p>Order Id: #{orderId}</p>
            <p>Total Payment: {USD.format(totalOrder / 23000 / 100)}</p>
            <div className="mt-2">
              <Link to="/shop">
                <button className="btn btn-dark">Continue Shopping</button>{" "}
              </Link>
            </div>
          </div>
        </div>
      )}
      {transactionStatus !== "00" && (
        <div>
          <div className="animation-ctn">
            <div className="icon icon--order-success svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="154px"
                height="154px"
              >
                <g fill="none" stroke="#FF0000" strokeWidth={2}>
                  <circle
                    cx={77}
                    cy={77}
                    r={72}
                    style={{
                      strokeDasharray: "480px, 480px",
                      strokeDashoffset: 960,
                    }}
                  />
                  <circle
                    id="colored"
                    fill="#fff"
                    cx={77}
                    cy={77}
                    r={72}
                    style={{
                      strokeDasharray: "480px, 480px",
                      strokeDashoffset: 960,
                    }}
                  />

                  <svg
                    id="payingSpinner3"
                    className="spinner spinner--fail"
                    viewBox="0 0 50 50"
                  >
                    <path
                      className="spinner__path checkmark"
                      fill="none"
                      d="M16 16 34 34 M34 16 16 34"
                    />
                  </svg>
                </g>
              </svg>
            </div>
            <br />
            <h2>Payment Failed</h2>
            <div className="mt-2">
              <Link to="/order">
                <button className="btn btn-dark">Continue Payment</button>{" "}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
