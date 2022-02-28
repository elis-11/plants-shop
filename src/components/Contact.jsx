import React from "react";
import emailjs from "emailjs-com";
import "./checkout/payment.scss";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.css";

const Contact = () => {
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
    navigate("/thankyou");

    emailjs
      .sendForm(
        "service_h61osmj",
        "template_lmz9sja",
        e.target,
        "user_RHA9wYucWpNkkR8eTG8Ky"
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.contact}>
      <div>
        <div>Have an inquiry or some feedback for us?</div>

        <form onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="name" />

          <label>Email</label>
          <input type="email" name="user_email" />

          <label>Message</label>
          <textarea name="message" />
          <button> Send message </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
