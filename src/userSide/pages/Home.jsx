import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";

import "../styles/home.css";
import Services from "../components/UI/Services";
import Clock from "../components/UI/Clock";

import ProductsList from "../components/UI/ProductsList";
// import products from "../../assets/data/products";

import Helmet from "../components/Helmet/Helmet";
import heroImg from "../../assets/images/hero-img.png";
import counterImg from "../../assets/images/counter-timer-img.png";

import {  useSelector } from "react-redux";
import { getAllProductRecommend } from "../../services/recommendServices";
import { trendingProductByPeriodTime } from "../../services/productService";
const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const products = useSelector((state) => state.product.products);
  const pageable = useSelector((state) => state.product.pageable);
  console.log("pageable", pageable);
  // console.log("products", products);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [productRecommend, setProductRecommend] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const currentDate = new Date();
    if (products.length !== 0) {
      const filterNewProducts = products.filter((item) => {
        const productCreatedDate = new Date(item.createdAt);
        return (
          parseFloat(
            (currentDate - productCreatedDate) / (1000 * 60 * 60 * 24)
          ) < 30
        );
      });
      const sortedProducts = filterNewProducts
        .sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        })
        .slice(0, 8);
      console.log(sortedProducts);

      const filterTrendingProducts = bestSellingProducts.slice(0, 4);

      setNewProducts(sortedProducts);
      setTrendingProducts(filterTrendingProducts);
    }
  }, [bestSellingProducts, products]);
  useEffect(() => {
    const fetchBestSellingProduct = async () => {
      const currentDate = moment().format("YYYY-MM-DD");
      const oneMonthAgo = moment(currentDate)
        .subtract(1, "month")
        .format("YYYY-MM-DD");
      const startDate = moment(oneMonthAgo).add(1, "day").format("YYYY-MM-DD");
      const productList = await trendingProductByPeriodTime(startDate, currentDate);
      console.log(startDate, currentDate, productList.data);
      setBestSellingProducts(productList.data);
    };
    fetchBestSellingProduct();
  }, []);

  useEffect(() => {
    if (products.lenght !== 0) {
      const accessToken = JSON.parse(
        localStorage.getItem("currentUserInfor")
      )?.accessToken;
      const fetchApiGetAllProductRecommend = async () => {
        const responeProductRecommend = await getAllProductRecommend(
          accessToken
        );
        // const responeProductRecommend = [
        //   {
        //     rating: 1.7802607829281465,
        //     idProduct: 12,
        //   },
        //   {
        //     rating: 1.7802607829281465,
        //     idProduct: 11,
        //   },
        // ];
        let arrayProductRecommend = [];
        // responeProductRecommend.forEach((item) => {
        //   if (
        //     products.findIndex((itemFind) => itemFind.id === item.idProduct) !==
        //     -1 && item.rating !== null
        //   ) {
        //     arrayProductRecommend.push(
        //       products[
        //         products.findIndex((itemFind) => itemFind.id === item.idProduct)
        //       ]
        //     );
        //   }
        // });

        console.log(arrayProductRecommend);
        setProductRecommend(arrayProductRecommend.slice(0, 8));
      };
      fetchApiGetAllProductRecommend();

      // const fectchApi = async () => {
      //   const accessToken = JSON.parse(localStorage.getItem("token"));
      //   const responeProductRecommend = await getAllProductRecommend(accessToken);
      //    console.log("responeProductRecommend", responeProductRecommend);
      // }

      // fectchApi();
    }
  }, [products]);
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Meet our best professional design consultants to be guided and
                  consulted, helping you fulfill your wish for the best home
                  ever.
                </p>
                <motion.button whileTap={{ scale: 1.1 }} className="buy__btn">
                  <Link to={currentUser ? "/shop" : "/login"}>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6">
              <img src={heroImg} alt="heroImg" />
            </Col>
          </Row>
        </Container>
      </section>
      <Services />

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {trendingProducts ? (
              <ProductsList data={trendingProducts} />
            ) : (
              <></>
            )}
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row className="timer__count--row">
            <Col lg="6" md="6" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end counter__img">
              <img src={counterImg} alt="#" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {newProducts ? <ProductsList data={newProducts} /> : <></>}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
