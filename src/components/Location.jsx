import { useEffect, useState } from "react";
import styles from "./Location.module.css";

export const Trending = () => {
  const [displayPlants, setDisplayPlants] = useState([]);

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

  const filterPlantTrend = displayPlants.filter(function (product) {
    return product.location === "trend";
  });

  return (
    <div className={styles.banner_four}>
      {filterPlantTrend.length > 0 &&
        filterPlantTrend
          .filter((article, index) => index < 3)
          .map((product) => {
            return (
              <div className={styles.article} key={product._id}>
                <div>
                  <div className={styles.name}>{product.name} </div>
                  <div className={styles.price}>{`$${product.price}`}</div>
                </div>

                <div>
                  <img src={product.image_small} alt="" />
                </div>
              </div>
            );
          })}
    </div>
  );
};

export const Garden = () => {
  const [displayPlants, setDisplayPlants] = useState([]);

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

  const filterPlantOutdoor = displayPlants.filter(function (product) {
    return product.location === "outdoor";
  });

  return (
    <div className={styles.banner_four}>
      {filterPlantOutdoor.length > 0 &&
        filterPlantOutdoor
          .filter((article, index) => index < 3)
          .map((product) => {
            return (
              <div className={styles.article} key={product._id}>
                <div>
                  <div className={styles.name}>{product.name} </div>
                  <div className={styles.price}>{`$${product.price}`}</div>
                </div>

                <div>
                  <img src={product.image_small} alt="" />
                </div>
              </div>
            );
          })}
    </div>
  );
};

export const Indoor = () => {
  const [displayPlants, setDisplayPlants] = useState([]);

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

  const filterPlantIndoor = displayPlants.filter(function (product) {
    return product.location === "indoor";
  });

  return (
    <div className={styles.banner_four}>
      {filterPlantIndoor.length > 0 &&
        filterPlantIndoor
          .filter((article, index) => index < 3)
          .map((product) => {
            return (
              <div className={styles.article} key={product._id}>
                <div>
                  <div className={styles.name}>{product.name} </div>
                  <div className={styles.price}>{`$${product.price}`}</div>
                </div>

                <div>
                  <img src={product.image_small} alt="" />
                </div>
              </div>
            );
          })}
    </div>
  );
};
