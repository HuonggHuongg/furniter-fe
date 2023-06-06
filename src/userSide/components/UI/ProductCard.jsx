import React from "react";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/product-card.css";

const ProductCard = (props) => {
  const { item } = props;
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.image}
            alt="productImg"
          />
          <div className="p-2 product__info">
            <h3 className="product__name">
              <Link reloadDocument to={`/shop/${item.productId}`}>{item.productName}</Link>
            </h3>
            <span>{item.category.categoryName}</span>
          </div>
          <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
            <span className="price">{item.price }VND</span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
