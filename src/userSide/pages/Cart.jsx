import React, { useState } from "react";
import { Container, Row, Col, Progress } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { motion } from "framer-motion";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import {
  deleteCartItemApi,
  getAllCartItemApi,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { USD } from "../../utils/convertMoney";
import { useEffect } from "react";
import { updateQuantityCartItemService } from "../../services/cartServices";

const Cart = () => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  const subTotal = cartItems
    ? cartItems.reduce((total, item) => total + Number(item.paymentCartItem), 0)
    : 0;
  const dispatch = useDispatch();
  const removeProductFromCart = (id) => {
    // console.log(dataCartDelete);
    const fetchRemoveProductFromCartApi = async () => {
      setLoadingDelete(true);
      await dispatch(deleteCartItemApi(id));
      setLoadingDelete(false);
      toast.success("Delete sucessfully!");
    };

    fetchRemoveProductFromCartApi();
  };

  const updateQuantity = async (cartItemId, quantity) => {
    updateQuantityCartItemService(quantity, cartItemId).then(() =>
      dispatch(getAllCartItemApi())
    );
  };

  return (
    <Helmet title="Cart">
      {loadingDelete ? (
        <Progress animated value="100" className="progress"></Progress>
      ) : (
        ""
      )}
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems?.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th className="col-4">Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((item, index) => (
                      <Tr
                        item={item}
                        key={index}
                        onRemoveProductFromCart={removeProductFromCart}
                        onUpdateQuantity={updateQuantity}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">{USD.format(subTotal)}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <button className="buy__btn w-100 ">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { item, onRemoveProductFromCart, onUpdateQuantity } = props;
  const [quantity, setQuantity] = useState(item.quantity);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < item.product.inventoryQuantity) {
      setQuantity(quantity + 1);
    } else {
      toast.warn(
        `${item.product.productName} has only ${item.product.inventoryQuantity} products left in stock`
      );
    }
  };

  useEffect(() => {
    onUpdateQuantity(item.cartItemId, quantity);
  }, [item.cartItemId, quantity]);

  return (
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

      <td>
        <div
          className={
            item.product.inventoryQuantity === 0
              ? "d-none"
              : "btn--group__addCart mr-2"
          }
        >
          <button className="btn--sub__addCart" onClick={decreaseQuantity}>
            <i className="ri-subtract-fill"></i>
          </button>

          <div className="btn--sub__count">
            <p>{quantity}</p>
          </div>

          <button className="btn--sub__addCart" onClick={increaseQuantity}>
            <i className="ri-add-fill"></i>
          </button>
        </div>
      </td>
      <td>{USD.format(item.product.price*quantity)}</td>
      <td>
        <motion.span
          whileTap={{ scale: 1.2 }}
          onClick={() => onRemoveProductFromCart(item.cartItemId)}
        >
          <i className="ri-delete-bin-line"></i>
        </motion.span>
      </td>
    </tr>
  );
};
export default Cart;
