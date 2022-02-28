import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import Cart from "./Cart";
import styles from "./Home.module.css";
// import AppContext from "../AppContext";
import Footer from "../layout/Footer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
//  import Stars from "./Stars"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import MapBox from "./MapBox";
import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  const [displayPlants, setDisplayPlants] = useState([]);
  const [displayReviews, setDisplayReviews] = useState([]);

  // const context = useContext(AppContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#023802",
      },
      secondary: {
        main: "#b3f5b3",
      },
    },
  });

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/plants`,
        requestOptions
      );

      if (response.ok) {
        const Plants = await response.json();
        setDisplayPlants(Plants);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reviews`,
        requestOptions
      );

      if (response.ok) {
        const reviews = await response.json();
        setDisplayReviews(reviews);
      }
    })();
  }, []);

  const filterPlantOutdoor = displayPlants.filter(function (product) {
    return product.location === "outdoor";
  });
  const filterPlantIndoor = displayPlants.filter(function (product) {
    return product.location === "indoor";
  });
  const filterPlantTrend = displayPlants.filter(function (product) {
    return product.location === "trend";
  });

  return (
    <div className={styles.plants}>
      <div className={styles.header}>
        <img src="images/plants/banner.jpg" alt="gr" />
        <div className={styles.banner}>
          <span>Floral Garden</span>
          <h1>Bring Nature Home</h1>
        </div>
      </div>

      <div className={styles.banner_three}>
        <h3>Plants for any occasion</h3>
        {filterPlantOutdoor.length > 0 && (
          <div className={styles.article}>
            <section>
              <div>
                <div>
                  Plants <br /> for garden
                </div>
                <div className={styles.action}>Buy now</div>
              </div>

              <img src={filterPlantOutdoor[4].image_small} alt="" />
            </section>

            <section>
              <div>
                <div>
                  Plants <br /> for interior
                </div>
                <div className={styles.action}>Buy now</div>
              </div>

              <img src={filterPlantIndoor[3].image_small} alt="" />
            </section>

            <section>
              <div>
                <div>
                  Plants <br /> for office
                </div>
                <div className={styles.action}>Buy now</div>
              </div>

              <img src={filterPlantTrend[4].image_small} alt="" />
            </section>
          </div>
        )}
      </div>

      <div className={styles.header}>
        <img
          src="images/plants/vadim-kaipov-8ZELrodSvTc-unsplash.jpg"
          alt="gr"
        />
        <div className={styles.banner}>
          <h2>styling trends,DIY projects, and much more</h2>
          <button>Read more</button>
        </div>
      </div>

      <div className={styles.banner_four}>
        <h3>Most popular </h3>

        <nav>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            {" "}
            trending plants{" "}
          </NavLink>
          <NavLink
            to="/garden"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            {" "}
            garden{" "}
          </NavLink>
          <NavLink
            to="/indoor"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            {" "}
            indoor{" "}
          </NavLink>
        </nav>

        <Outlet></Outlet>
      </div>
      <div className={styles.banner2}>
        <ThemeProvider theme={theme}>
          <h3>Why choose us ?</h3>
          <div className={styles.icons}>
            <section>
              <LocalShippingIcon
                fontSize="large"
                color="primary"
              ></LocalShippingIcon>
              <div>
                <p>Fast delivery</p>
                <div>We'll bring your plants to your door</div>
              </div>
            </section>

            <section>
              <StackedLineChartIcon
                fontSize="large"
                color="primary"
              ></StackedLineChartIcon>
              <div>
                <p>Grow with us</p>
                <div>Exclusive plants tips, new releases and sales</div>
              </div>
            </section>

            <section>
              <EmojiEventsIcon
                fontSize="large"
                color="primary"
              ></EmojiEventsIcon>
              <div>
                <p>Best quality</p>
                <div>We source directly from top-rated growers</div>
              </div>
            </section>
          </div>
        </ThemeProvider>
      </div>

      <div className={styles.commentsSection}>
        <h3>Reviews</h3>
        <div>
          {displayReviews.map((comment) => {
            return (
              <div className={styles.comment} key={comment._id}>
                <div>
                  <RiDoubleQuotesL
                    style={{ marginBottom: "15px" }}
                  ></RiDoubleQuotesL>{" "}
                  <br />
                  {comment.review}
                  <RiDoubleQuotesR
                    style={{ marginBottom: "15px", marginLeft: "15px" }}
                  ></RiDoubleQuotesR>
                </div>
                <div className={styles.info}>
                  <div className={styles.user}>
                    <div className={styles.photo}>
                      <img src={`/images/users/${comment.user.photo}`} alt="" />
                    </div>
                    <div>
                      <div className={styles.name}>
                        {comment.user.firstName} {comment.user.lastName}
                      </div>
                      <div className={styles.date}>
                        {new Date(comment.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={styles.rating}>
                    {[1, 2, 3, 4, 5].map((star, index) => {
                      if (comment.rating >= star) {
                        return (
                          <AiFillStar
                            className={styles.fill}
                            key={index}
                          ></AiFillStar>
                        );
                      } else {
                        return <AiOutlineStar key={index}></AiOutlineStar>;
                      }
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.contacts}>
        <div className={styles.address}>
          <h3>Our contact</h3>
          <h4>Address</h4>
          <div>
            Flower Avenue <br />
            11-222 Eden
          </div>

          <h4>Email</h4>
          <div>info@flowergarden.com</div>
          <h4>Phone</h4>
          <div>+12 34 56789</div>
        </div>

        <MapBox />
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
