import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  CardTitle,
  CardBody,
  CardText,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/order-card.css";
import { getPaymentService } from "../../../services/paymentService";
import { USD } from "../../../utils/convertMoney";
import { format } from "date-fns";

const OrderCard = (props) => {
  const { item } = props;
  const [loading, setLoading] = useState(false);

  const date = new Date(item.createdAt);
  const createAt =  format(date, "dd/MM/yyyy HH:mm");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/order/${item.orderId}`);
  };

  const handlePayment = () => {
    setLoading(true);
    getPaymentService(item.totalOrder, item.orderId)
      .then((data) => {
        window.location.href = data.data;
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };
  return (
    <>
      <Container>
        <Card className="card__container">
          <CardTitle className="card__title">
            <div className="d-flex justify-content-between">
              <div>
                The order created at: 
                <span> {createAt}</span>
              </div>
              <div className="me-4">
                Order status: <span>{item.statusOrder.statusName}</span>
              </div>
            </div>
          </CardTitle>

          <CardBody>
            <Row>
              <Col md={6}>
                <CardText>
                  Phone Number: <span>{item.phoneNumber}</span>
                </CardText>
                <CardText>
                  Receiving Address: <span>{item.receivingAddress}</span>
                </CardText>
                <CardText>
                  Payment status:{" "}
                  {item.paymentStatus ? <span>Paid</span> : <span>UnPaid</span>}
                </CardText>
              </Col>
              <Col md={4} className="drop__detail">
                <CardText>
                  Total Order: <span>{USD.format(item.totalOrder)} </span>
                </CardText>
              </Col>
              <Col md={2}>
                <div className="row">
                  <button
                    className="buy__btn detail__btn mb-2"
                    onClick={handleClick}
                  >
                    Detail
                  </button>
                  {!item.paymentStatus && (
                    <button
                      className="buy__btn detail__btn"
                      onClick={handlePayment}
                    >
                      Payment
                    </button>
                  )}
                </div>
              </Col>
            </Row>
            
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default OrderCard;
