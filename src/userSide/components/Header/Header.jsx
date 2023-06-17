import React, { useRef, useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import "./header.css";
import logo from "../../../assets/images/eco-logo.png";
import user_icon from "../../../assets/images/user-icon.png";
import { LogoutApi } from "../../../redux/slices/userSlice";
import { getAllCartItemApi,CartLogoutApi } from "../../../redux/slices/cartSlice";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
  {
    path: "order",
    display: "Order",
  },
];

const Header = () => {
  const currentUserInfor = JSON.parse(localStorage.getItem("currentUserInfor"));
  const currentUser = currentUserInfor ? currentUserInfor.currentUser : null;
  const userAvatar = currentUser?.avatar ? currentUser.avatar : user_icon;
  const userName = currentUser ? currentUser.userName : "";
  const menuRef = useRef(null);

  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalQuantity = cartItems?.length;
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(LogoutApi());
    dispatch(CartLogoutApi());
    navigate("/home");
    // dispatch(getAllCartItemApi());
  };

  const handleClickLogin = () => {
    navigate("/login");
  };
  return (
    <header className="sticky__header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Link to="/home">
              <div className="logo">
                <img src={logo} alt="logo" />
                <div>
                  <h1>Jolie House</h1>
                </div>
              </div>
            </Link>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {currentUser &&
                  nav__links.map((item, index) => {
                    return (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "nav__active" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    );
                  })}
                {currentUser === null &&
                  nav__links.map((item, index) => {
                    return (item.path !== "cart" && item.path !== "order" ) ? (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "nav__active" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    ) : (
                      <li style={{ display: "none" }} key={index}></li>
                    );
                  })}
                  
              </ul>
            </div>

            <div className="nav__icons">
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="user__group">
                <div>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle className="bg-white border-0">
                      {currentUserInfor && (
                        <span>
                          <motion.img
                            whileTap={{ scale: 1.2 }}
                            src={userAvatar}
                            alt="userIcon"
                          />
                        </span>
                      )}
                      {!currentUserInfor && (
                        <span className="text-dark">
                          <Link to={"/login"}>Login</Link>
                        </span>
                      )}
                    </DropdownToggle>
                    <DropdownMenu className="drop__menu">
                      {currentUser ? (
                        <>
                          {" "}
                          <NavLink
                            to="/profile"
                            className="text-dark"
                            style={{ textDecoration: "none" }}
                          >
                            <DropdownItem className="drop__menu--item">
                              {" "}
                              Settings
                            </DropdownItem>
                          </NavLink>
                          <DropdownItem
                            className="drop__menu--item"
                            onClick={handleLogout}
                          >
                            Log out
                          </DropdownItem>
                        </>
                      ) : (
                        <></>
                        // <DropdownItem
                        //   className="drop__menu--item"
                        //   onClick={handleClickLogin}
                        // >
                        //   Login
                        // </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div>
                  <span>{userName}</span>
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
