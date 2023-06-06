import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { getDetailsOrderService } from "../../../services/orderServices";
import "../../styles/order-detail.css";
import USDollar from "../../../utils/FormatMoney";

export const OrderDetail = () => {
  const { id } = useParams();
  const [date, setDate] = useState();
  const [orderArray, setOrderArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetAllOrderAnUserApi = async () => {
      const respone = await getDetailsOrderService(id);
      setOrderArray(respone.data);
    };
    fetchGetAllOrderAnUserApi();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button className="btn btn-outline-dark mb-3" onClick={handleGoBack}>
        Go back
      </button>
      <Container className="table__order">
        <h5 className="title__order--item">
          {" "}
          The order created at:{" "}
          <span>{date ? date.toLocaleDateString("en-US") : ""}</span>
        </h5>
        <Row>
          <Col lg="12">
            <table className="table bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {orderArray
                  ? orderArray.map((item, index) => {
                      return <Tr item={item} key={index} />;
                    })
                  : 0}
              </tbody>
            </table>
            {orderArray.length > 0 ? (
              <div className="col-6 ">
                <div className="info_price--order">
                  <h4>Totalize</h4>
                  <p className="mt-2">
                    Subtotal({orderArray.length} product) :{" "}
                    {USDollar.format(orderArray[0].orderUser.totalOrder)}
                  </p>
                </div>
              </div>
            ) : (
              0
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
const Tr = (props) => {
  const { item } = props;
  console.log(item);
  return (
    <>
      <tr>
        <td>
          <img src={item.product.image} alt="#" />
        </td>
        <td>{item.product.productName}</td>
        <td>{item.product.price}</td>
        <td>{item.quantity}</td>
      </tr>
    </>
  );
};
