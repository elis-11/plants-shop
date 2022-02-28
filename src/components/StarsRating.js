import React, { useState, useEffect } from "react";
import { FaStar, FaUser } from "react-icons/fa";
import styles from "./StarsRating.module.css";

const StarRating = (props) => {
  const [ratings, setRatings] = useState([]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const palntName = props.starRating.name;
  const plantId = props.starRating.id;
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const handleName = (e) => {
    let firstName = e.target.value;
    setName(firstName);
  };
  const handleMessage = (e) => {
    let message = e.target.value;
    setMessage(message);
  };

  const submitRating = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ratingData: {
          plantName: palntName,
          plantId: plantId,
          star: rating,
          customer: name,
          message: message,
        },
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/stars`,
      requestOptions
    );
    if (response.ok) {
      await response.json();
    }
    window.location.reload();
    setName("");
    setMessage("");
  };

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/stars`,
        requestOptions
      );
      if (response.ok) {
        const _ratings = await response.json();
        setRatings([..._ratings]);
      }
    })();
  }, []);
  const filterId = ratings.filter((m) => m.plantId === plantId);

  return (
    <div className={styles.starcontainer}>
      <div className={styles.main}>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                //  color ={"#e4e5e9"}
              />
              <FaStar
                className={styles.star}
                color={ratingValue > (rating || hover) ? "#e4e5e9" : "#024e02"}
                size={50}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
        {rating !== null && (
          <>
            <div className={styles.inputName}>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Your name.."
                onChange={handleName}
              />
            </div>
            <div className={styles.textarea}>
              <textarea
                name=""
                id=""
                value={message}
                onChange={handleMessage}
                placeholder="Write Comment.."
              ></textarea>
            </div>
            <div className={styles.button}>
              <button type="button" onClick={submitRating}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
      {filterId.map((rating, i) => {
        return (
          <div key={i} className={styles.ratingContainer}>
            <div className={styles.starContainer}>
              {rating.star === 1 && (
                <>
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                </>
              )}
              {rating.star === 2 && (
                <>
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                </>
              )}
              {rating.star === 3 && (
                <>
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                </>
              )}
              {rating.star === 4 && (
                <>
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#e4e5e9"} size={15} />
                </>
              )}
              {rating.star === 5 && (
                <>
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                  <FaStar className={styles.star} color={"#024e02"} size={15} />
                </>
              )}
            </div>
            <div className={styles.customer}>
              <div>
                <FaUser size={18} color={"black"} />
              </div>
              <div>{rating.customer}: </div>
            </div>
            <div className={styles.message}>{rating.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
