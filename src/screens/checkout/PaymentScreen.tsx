import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CheckoutSteps from "../../components/CheckoutSteps";

import * as cartActions from "../../store/actions/cartActions";

const PaymentScreen = (props) => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  const redirect = query.get("redirect");

  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const { shipping } = useSelector((state) => state.cart);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(cartActions.savePayment({ paymentMethod }));
    props.history.push("placeorder");
  };

  if (!shipping) {
    props.history.push("/shipping");
  }

  return (
    <div>
      <CheckoutSteps currentStep={2} />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paymentMethod" className="ml-3">
                  Paypal
                </label>
              </div>
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
