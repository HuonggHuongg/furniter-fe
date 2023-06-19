import React from "react";
import "./error-page.css";
import { Link } from "react-router-dom";

function ErrorPage({ status }) {
  return (
    <div class="error-page bg-purple">
      <div class="stars">
        <div class="central-body">
          {status === 204 && (
            <>
              <h1 style={{ color: "white", fontSize: "50px" }}>204</h1>
              <h1 style={{ color: "white", fontSize: "50px" }}>NO CONTENT</h1>
            </>
          )}
          {status === 404 && (
            <>
              <h1 style={{ color: "white", fontSize: "50px" }}>404</h1>
              <h1 style={{ color: "white", fontSize: "50px" }}>NOT FOUND</h1>
            </>
          )}
          {status === 401 && (
            <>
              <h1 style={{ color: "white", fontSize: "50px" }}>401</h1>
              <h1 style={{ color: "white", fontSize: "50px" }}>YOU DON'T HAVE PERMISSION</h1>
            </>
          )}
          <Link to="/">
            <div class="btn-go-home">GO BACK HOME</div>
          </Link>
        </div>
        <div class="objects">
          <img
            class="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            style={{ width: "30px" }}
            alt=""
          />
          <div class="earth-moon">
            <img
              class="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              style={{ width: "100px" }}
              alt=""
            />
            <img
              class="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              style={{ width: "80px" }}
              alt=""
            />
          </div>
          <div class="box_astronaut">
            <img
              class="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              style={{ width: "140px" }}
              alt=""
            />
          </div>
        </div>
        <div class="glowing_stars">
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
