import React from "react";
import AppContext from "../../AppContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./payment.scss";
import { FaCcMastercard } from "react-icons/fa";

const PaymentForm = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [card, setcard] = useState("");
  const [cardNummer, setcardNummer] = useState("");
  const [cardNummerIsValid, setcardNummerIsValid] = useState(false);
  const [cardIsValid, setcardIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(cardIsValid && cardNummerIsValid);
  }, [cardIsValid, cardNummerIsValid]);

  const handlecard = (e) => {
    let _card = e.target.value;
    setcard(_card);
    if (_card !== "" && _card.length === 16) {
      setcardIsValid(true);
    } else {
      setcardIsValid(false);
    }
  };

  const handlecardNummer = (e) => {
    let _cardNummer = e.target.value;
    setcardNummer(_cardNummer);
    if (
      _cardNummer !== "" &&
      // /^[0-1][0-9]-[2][2-9]-[0-9][0-9][0-9]$/.test(_cardNummer)
      /^\s*(1[012]|0?[1-9])\.([2][2-9])\.([0-9][0-9][0-9])\s*$/g.test(
        _cardNummer
      )
    ) {
      setcardNummerIsValid(true);
    } else {
      setcardNummerIsValid(false);
    }
  };

  const handleButton = (e) => {
    e.preventDefault();
    setTimeout(function () {
      navigate("/successful");
    }, 1000);
  };

  return (
    <div className="payment-form">
      <div className="col-md-2 tablestyle">
        <form action="">
          <div className="title">PaymentForm</div>
          <br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="50%">
                  {" "}
                  <h4>Order Summary</h4>
                </th>
                <th>Price</th>
                <th>Amount</th>
                <th>Total </th>
              </tr>
            </thead>
            <tbody>
              {context.items.map((product, id) => {
                return (
                  <tr key={id}>
                    <td className="text-start">{product.name}</td>
                    <td className="text-center">{product.price} $</td>
                    <td className="text-center">{product.amount}</td>
                    <td className="text-center">
                      {product.price * product.amount}$
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="3" className="text-start">
                  Grand Total
                </td>
                <td colSpan="2" className="text-center ">
                  {context.items.reduce((sum, item) => {
                    sum += item.price * item.amount;
                    return sum;
                  }, 0) + 10}
                  $
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <form>
        <fieldset>
          <legend>Payment method</legend>
          <div className="row">
            <label htmlFor="card">
              card <FaCcMastercard></FaCcMastercard>
            </label>
            <input
              type="number"
              id="card"
              value={card}
              onChange={handlecard}
              placeholder="card number"
            />
            <div className={"row " + (cardIsValid ? "valid" : "invalid")}></div>
            <div className={"note " + (cardIsValid ? "valid" : "invalid")}>
              required, 16 Number
            </div>
          </div>
          <div className="row">
            <label htmlFor="cardNummer">MYC</label>
            <input
              type="text"
              id="cardNummer"
              value={cardNummer}
              onChange={handlecardNummer}
              placeholder="MM-YY-CVC"
            />
            <div
              className={"row " + (cardNummerIsValid ? "valid" : "invalid")}
            ></div>
            <div
              className={"note " + (cardNummerIsValid ? "valid" : "invalid")}
            >
              e.g. 02.22.468
            </div>
          </div>
          <div className="buttons">
            <Link to="/checkout">
              <button className="back-btn"> Go Back{""}{""}</button>
            </Link>
            <div className="buttonRow">
              <button className="" disabled={!formIsValid} onClick={handleButton}>
                Pay {""}{" "}
                <span colSpan="2" className="text-center ">
                  {context.items.reduce((sum, item) => {
                    sum += item.price * item.amount;
                    return sum;
                  }, 0) + 10}
                  $
                </span>
              </button>
            </div>{" "}
          </div>
        </fieldset>
        <div className={"row " + (cardIsValid ? "valid" : "invalid")}></div>
      </form>
    </div>
  );
};

export default PaymentForm;
