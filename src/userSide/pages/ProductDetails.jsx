import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Spinner, Progress } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCartApi,
  getAllCartItemApi,
} from "../../redux/slices/cartSlice";
import user_icon from "../../assets/images/user-icon.png";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/product-details.css";
import { toast } from "react-toastify";
import { getDetailService } from "../../services/productService";
import { getProductDetailFeedBackService } from "../../services/feedBackServices";
import { USD } from "../../utils/convertMoney";
import ErrorPage from "../ErrorPage/ErrorPage";

const ProductDetails = () => {
  const currentUser =
    JSON.parse(localStorage.getItem("currentUserInfor"))?.currentUser || null;
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState({});
  const [countAddCart, setCountAddCart] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetailProductApi = async () => {
      setLoading(true);
      const responeProduct = await getDetailService(id);
      setErrorStatus(responeProduct.response?.status || responeProduct?.status);
      const responeFeedBack = await getProductDetailFeedBackService(id);
      const productDetail = {
        name: responeProduct.data.productName,
        image: responeProduct.data.image,
        price: responeProduct.data.price,
        inventoryQuantity: responeProduct.data.inventoryQuantity,
        description: responeProduct.data.description,
        category: responeProduct.data.category.categoryName,
        feedBack: responeFeedBack.data,
      };
      await setProductDetail(productDetail);
      setLoading(false);
    };
    fetchDetailProductApi();
  }, [id]);
  console.log(errorStatus);
  const [avgRatings, setAvgRatings] = useState();
  const [star, setStar] = useState();
  useEffect(() => {
    console.log(productDetail?.feedBack);
    const totalRating = productDetail?.feedBack
      ? productDetail?.feedBack.reduce(
          (total, item) => total + Number(item.rating),
          0
        )
      : 0;
    const avgRating =
      productDetail?.feedBack?.length > 0
        ? totalRating / productDetail?.feedBack.length
        : 0;
    setAvgRatings(avgRating);

    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ri-star-s-fill"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-s-line"></i>);
    }
    setStar(stars);

    console.log(avgRating, totalRating);
  }, [productDetail?.feedBack]);

  const [tab, setTab] = useState("desc");

  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const addToCart = () => {
    let isValid = true;

    cartItems?.forEach((item) => {
      console.log(typeof item.product.productId);
      console.log(productDetail);
      if (item.product.productId == id) {
        if (item.quantity + countAddCart > productDetail.inventoryQuantity) {
          toast.warning(
            `${item.product.productName} has only ${item.product.inventoryQuantity} products left in stock`
          );
          isValid = false;
        }
      }
    });
    const dataCart = {
      id,
      price: productDetail.price,
      quantity: countAddCart,
      userName: currentUser?.userName,
    };
    const fetchAddProductToCartApi = async () => {
      setLoadingCart(true);
      await dispatch(addProductToCartApi(dataCart));
      setLoadingCart(false);
      toast.success(`${productDetail.name} added successfully`);
      await dispatch(getAllCartItemApi());
    };
    if (currentUser !== null) {
      if (isValid) {
        fetchAddProductToCartApi();
      }
    } else {
      toast.error("You must login before add product to cart");
      navigate("/login");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetail]);

  return (
    <>
      {errorStatus === 200 && (
        <Helmet title={productDetail.name}>
          {loadingCart ? (
            <Progress animated value="100" className="progress"></Progress>
          ) : (
            ""
          )}
          <CommonSection title={productDetail.name} />
          {loading === true ? (
            <div className="loading--api">
              <Spinner animation="grow" variant="success" />
            </div>
          ) : (
            <>
              <section>
                <Container>
                  <Row>
                    <Col lg="6">
                      <img src={productDetail.image} alt="" />
                    </Col>
                    <Col>
                      <div className="product__details">
                        <h2>{productDetail.name}</h2>
                        <div className="product__rating d-flex align-items-center gap-5 mb-3">
                          <div style={{ color: "#FFC107" }}>{star}</div>
                          <p>
                            {avgRatings !== 0 ? (
                              <div>
                                <span>{avgRatings?.toFixed(1)} ratings </span>
                                <span className="text-dark">
                                  ({productDetail?.feedBack?.length} reviews)
                                </span>
                              </div>
                            ) : (
                              <div>No reviews yet</div>
                            )}
                          </p>
                        </div>
                        <div className="d-flex align-items-center gap-5">
                          <span className="product__price">
                            {USD.format(productDetail.price)}
                          </span>
                          <span>
                            Category:{" "}
                            {productDetail.category
                              ? productDetail.category.toUpperCase()
                              : ""}
                          </span>
                        </div>
                        <p className="mt-3">{productDetail.description}</p>
                        <div className="d-flex mt-3">
                          <div
                            className={
                              productDetail.inventoryQuantity === 0
                                ? "d-none"
                                : "btn--group__addCart mr-2"
                            }
                          >
                            <button
                              className="btn--sub__addCart"
                              onClick={() => {
                                let count =
                                  countAddCart === 1 ? 1 : countAddCart - 1;
                                setCountAddCart(count);
                              }}
                            >
                              <i className="ri-subtract-fill"></i>
                            </button>

                            <div className="btn--sub__count">
                              <p>{countAddCart}</p>
                            </div>

                            <button
                              className="btn--sub__addCart"
                              onClick={() => {
                                let count =
                                  countAddCart ===
                                  productDetail.inventoryQuantity
                                    ? countAddCart
                                    : countAddCart + 1;
                                setCountAddCart(count);
                              }}
                            >
                              <i className="ri-add-fill"></i>
                            </button>
                          </div>
                          {productDetail.inventoryQuantity > 0 ? (
                            <p>
                              {productDetail.inventoryQuantity} products are
                              available
                            </p>
                          ) : (
                            <p>Out of stock</p>
                          )}
                        </div>

                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          disabled={productDetail.inventoryQuantity === 0}
                          className={
                            productDetail.inventoryQuantity === 0
                              ? "buy__btn btn__addCart_disabled"
                              : "buy__btn btn__addCart"
                          }
                          onClick={addToCart}
                        >
                          Add to cart
                        </motion.button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section>
                <Container>
                  <Row>
                    <Col lg="12">
                      <div className="tab__wrapper d-flex align-items-center gap-5">
                        <h6
                          className={`${tab === "desc" ? "active__tab" : ""}`}
                          onClick={() => setTab("desc")}
                        >
                          Description
                        </h6>
                        <h6
                          className={`${tab === "rev" ? "active__tab" : ""}`}
                          onClick={() => setTab("rev")}
                        >
                          Reviews (
                          {productDetail.feedBack
                            ? productDetail.feedBack.length
                            : ""}
                          )
                        </h6>
                      </div>
                      {tab === "desc" ? (
                        <div className="tab__content mt-5">
                          <p>{productDetail.description}</p>
                        </div>
                      ) : (
                        <div className="product__review mt-5">
                          <div className="review__wrapper">
                            <ul>
                              {productDetail.feedBack.map((item, index) => {
                                console.log(item);
                                return item?.user?.userName ===
                                  currentUser?.userName ? (
                                  <li key={index}>
                                    <div className="user__comment__block">
                                      <div>
                                        {item.user?.avatar ? (
                                          <img
                                            className="avatarUser__comment"
                                            src={item.user?.avatar}
                                            alt="#"
                                          />
                                        ) : (
                                          <img
                                            className="avatarUser__comment"
                                            src={user_icon}
                                            alt="#"
                                          />
                                        )}
                                      </div>
                                      <div>
                                        <h6>{item.user?.userName}</h6>

                                        <span>
                                          {item.rating} (average rating)
                                        </span>
                                      </div>
                                    </div>

                                    <p>{item.commentText}</p>
                                  </li>
                                ) : (
                                  <></>
                                );
                              })}
                              {productDetail.feedBack.map((item, index) => {
                                console.log(item);
                                return item?.user?.userName !==
                                  currentUser?.userName ? (
                                  <li key={index}>
                                    <div className="user__comment__block">
                                      <div>
                                        {item.user?.avatar ? (
                                          <img
                                            className="avatarUser__comment"
                                            src={item.user?.avatar}
                                            alt="#"
                                          />
                                        ) : (
                                          <img
                                            className="avatarUser__comment"
                                            src={user_icon}
                                            alt="#"
                                          />
                                        )}
                                      </div>
                                      <div>
                                        <h6>{item.user?.userName}</h6>

                                        <span>
                                          {item.rating} (average rating)
                                        </span>
                                      </div>
                                    </div>

                                    <p>{item.commentText}</p>
                                  </li>
                                ) : (
                                  <></>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </Col>
                    <Col lg="12" className="mt-5">
                      <h2 className="related__title">You might also like</h2>
                    </Col>
                    {/* {productRecommend ? (
                  <ProductsList data={productRecommend} />
                ) : (
                  <></>
                )} */}
                  </Row>
                </Container>
              </section>
            </>
          )}
        </Helmet>
      )}
      {errorStatus && errorStatus !== 200 && <ErrorPage status={errorStatus} />}
    </>
  );
};

export default ProductDetails;
