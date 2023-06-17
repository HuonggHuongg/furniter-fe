import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from 'moment';
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

function Payment() {
  const state = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(state.search);
  const [orderId] = useState(queryParams.get("vnp_TxnRef"));
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
      {transactionStatus === "00" && <h1>Your payment is successful!!</h1>}
      {transactionStatus !== "00" && (
        <div>
          <h1>Your payment failed!!</h1>
          <a className="btn btn-outline-dark" href="/order">
            Payment continue
          </a>
        </div>
      )}
    </div>
  );
}

export default Payment;
