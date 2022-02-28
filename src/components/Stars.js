import React from "react";
import styles from "./Plants.module.css";

const getStars = (value) => {
  const stars = [];
  const [whole, part] = parseFloat(value).toString().split(".");
  for (let i = 0; i < whole; i++) stars.push(100);
  if (part) stars.push(50);
  for (let i = whole; i < (part ? 4 : 5); i++) stars.push(0);
  return stars;
};
const Stars = ({ value }) => {
  return (
    <div className={styles.stars} >
      {getStars(value).map((value,index) => (
        <img
          src={`images/stars/${value}.png`}
          width={15}
          height={15}
          alt="star"
          key={index}
        />
      ))}
    </div>
  );
};

export default Stars;
