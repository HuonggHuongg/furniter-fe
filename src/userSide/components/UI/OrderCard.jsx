import React from "react";
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
import USDollar from "../../../utils/FormatMoney";

const OrderCard = (props) => {
  const { item } = props;
  console.log(item)
  const date = new Date(item.createdAt);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/order/${item.orderId}`)
  };
  return (
    <>
      <Container>
        <Card className="card__container">
          <CardTitle className="card__title">
            The order created at:{" "}
            <span>{date.toLocaleDateString("en-US")}</span>
          </CardTitle>
          <CardBody>
            <Row>
              <Col md={8}>
                <CardText>
                  Phone Number: <span>{item.phoneNumber}</span>
                </CardText>
                <CardText>
                  Receiving Address: <span>{item.receivingAddress}</span>
                </CardText>
              </Col>
              <Col md={4} className="drop__detail">
                <CardText>
                  Total Order: <span>{USDollar.format(item.totalOrder)} </span>
                </CardText>
                <button className="buy__btn detail__btn" onClick={handleClick}>
                  Detail
                </button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default OrderCard;
