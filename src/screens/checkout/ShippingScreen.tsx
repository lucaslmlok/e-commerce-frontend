import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";

import * as cartActions from "../../store/actions/cartActions";

const ShippingScreen = (props) => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  const redirect = query.get("redirect");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { userInfo } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(cartActions.saveShipping({ address, city, country, postalCode }));
    props.history.push("payment");
  };

  if (!userInfo) {
    props.history.push("/cart");
  }

  return (
    <div>
      <CheckoutSteps currentStep={1} />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="name">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </li>

            <li>
              <label htmlFor="name">Postal Code</label>
              <input
                type="number"
                name="postalCode"
                id="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </li>

            <li>
              <button type="submit" className="button primary mt-3">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
