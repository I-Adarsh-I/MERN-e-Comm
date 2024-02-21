import React from "react";
import Img1 from "../../assets/carousel images/1.png";
import Img2 from "../../assets/carousel images/2.png";
import Img3 from "../../assets/carousel images/3.png";
import "./carousel.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HeadCarousel() {

  const userInfo = useSelector((state) => state.auth);

  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img src={Img1} alt="Winter collection" width={"100%"} />
        <Carousel.Caption>
          {!userInfo.isLoggedIn && (
            <div className="container">
              <div className="alert alert-success mt-5 " role="alert">
                Please{" "}
                <Link to={"/"} className="text-black">
                  login
                </Link>{" "}
                to explore website.
              </div>
            </div>
          )}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img src={Img2} alt="Winter collection" width={"100%"} />
        <Carousel.Caption>
          {!userInfo.isLoggedIn && (
            <div className="container">
              <div className="alert alert-success mt-5 " role="alert">
                Please{" "}
                <Link to={"/"} className="text-black">
                  login
                </Link>{" "}
                to explore website.
              </div>
            </div>
          )}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={Img3} alt="Winter collection" width={"100%"} />
        <Carousel.Caption>
          {!userInfo.isLoggedIn && (
            <div className="container">
              <div className="alert alert-success mt-5 " role="alert">
                Please{" "}
                <Link to={"/"} className="text-black">
                  login
                </Link>{" "}
                to explore website.
              </div>
            </div>
          )}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeadCarousel;
