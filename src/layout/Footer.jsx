import React from "react";
import styles from "./Footer.module.css";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>Floral Garden</div>
      <div>
        <h4>About Us</h4>
        <h5>Home</h5>
        <h5>Blog</h5>
        <h5>Products</h5>
 
        <h5>News</h5>
      </div>
      <div>
        <h4>Contact us</h4>
        <h5>Flower Avenue</h5>
        <h5> 11-222 Eden</h5>
       
        <h5>info@flowergarden.com</h5>
      </div>
      <div className={styles.icons}>
        <AiFillFacebook></AiFillFacebook>
        <AiFillInstagram></AiFillInstagram>
        <AiFillTwitterSquare></AiFillTwitterSquare>
      </div>
    </div>
  );
};

export default Footer;
