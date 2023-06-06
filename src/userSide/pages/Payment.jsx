import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addProductToOrderService,
  changeStatusPaymentService,
  changeTotalOrderService,
  getAllOrderAnUserService,
} from "../../services/orderServices";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItemApi } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

function Payment() {
  const state = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(state.search);
  const [orderId] = useState(queryParams.get("vnp_TxnRef"));
  const [transactionStatus] = useState(
    queryParams.get("vnp_TransactionStatus")
  );

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [productIdList, setProductIdList] = useState([]);

  useEffect(() => {
    let productIdListAssign = [];
    if (cartItems.length !== 0 && productIdList.length === 0) {
      cartItems.forEach((cartItem) => {
        productIdListAssign = [...productIdList, cartItem.product.productId];
      });
    }
    setProductIdList(productIdListAssign);
  }, [cartItems]);

  useEffect(() => {
    const fetchPaymentApi = async () => {
      console.log(cartItems);
      await addProductToOrderService(productIdList, orderId);
      await changeTotalOrderService(orderId);
      if (transactionStatus === "00") {
        await changeStatusPaymentService(orderId);
        await dispatch(getAllCartItemApi());
        toast.success("Payment success");
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
