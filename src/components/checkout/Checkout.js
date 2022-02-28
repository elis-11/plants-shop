import React from "react";
import { useContext, useState } from "react";
import AppContext from "../../AppContext";
import { useNavigate, Link } from "react-router-dom";
import "./payment.scss";

const Checkout = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AppContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [empty, setEmpty] = useState(false);
  // const [items, setItems] = useState([]);

  const handleFirstName = (e) => {
    let firstName = e.target.value;
    setFirstName(firstName);
  };

  const handleLastName = (e) => {
    let lastName = e.target.value;
    setLastName(lastName);
  };

  const handleState = (e) => {
    let state = e.target.value;
    setState(state);
  };

  const handleZipCode = (e) => {
    let zipcode = e.target.value;
    setZipcode(zipcode);
  };

  const handleEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
  };

  const handleCity = (e) => {
    let city = e.target.value;
    setCity(city);
  };

  const handleAddress = (e) => {
    let address = e.target.value;
    setAddress(address);
  };

  const handlePhone = (e) => {
    let phone = e.target.value;
    setPhone(phone);
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      email === "" ||
      phone === "" ||
      zipcode === "" ||
      lastName === "" ||
      state === ""
    )
      setTimeout(function () {
        setEmpty(true);
        setTimeout(function () {
          setEmpty(false);
        }, 3000);
      }, 500);

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          phone: phone,
          email: email,
          city: city,
          zipcode: zipcode,
          state: state,
          items: context.items,
        },
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/checkout`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setCurrentUser((prev) => ({ ...prev, ...data.userAdded }));

      navigate("/paymentform");
    }
  };

  return (
    <>
      {empty && (
        <div className="empty">
          Warning: Your entry was partially incomplete or invalid{" "}
        </div>
      )}

      <div className="checkout">
        <div className="py-4">
          <div className="container">
            <h2>Checkout</h2>
          </div>
        </div>

        <div className="py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstname"
                            onChange={handleFirstName}
                            value={firstName}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastname"
                            onChange={handleLastName}
                            value={lastName}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            name="phone"
                            onChange={handlePhone}
                            value={phone}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Email Address</label>
                          <input
                            type="text"
                            name="email"
                            onChange={handleEmail}
                            value={email}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label>Full Address</label>
                          <textarea
                            rows="3"
                            name="address"
                            onChange={handleAddress}
                            value={address}
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            onChange={handleCity}
                            value={city}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            onChange={handleState}
                            value={state}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>Zip Code</label>
                          <input
                            type="text"
                            name="zipcode"
                            onChange={handleZipCode}
                            value={zipcode}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group text-end"></div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link
                            variant="contained"
                            type="button"
                            className="btn btn-success"
                            // variant="outlined"
                            to="/cart"
                          >
                            Back to Cart
                          </Link>
                          <Link
                            to="/paymentForm"
                            variant="contained"
                            type="button"
                            className="btn btn-success"
                            onClick={submitOrder}
                          >
                            Next
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
