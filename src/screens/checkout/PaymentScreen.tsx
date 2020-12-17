import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as cartActions from "../../store/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import ErrorMsg from "../../components/ErrorMsg";

const schema = yup.object().shape({
  paymentMethod: yup.string().required(),
});

const PaymentScreen = (props) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentMethod: "",
    },
  });

  const { shipping, payment } = useSelector((state) => state.cart);

  const onSubmit = (data) => {
    dispatch(cartActions.savePayment(data));
    props.history.push("placeorder");
  };

  useEffect(() => {
    if (payment) {
      setValue("paymentMethod", payment.paymentMethod, {
        shouldValidate: true,
      });
    }
  }, [shipping]);

  if (!shipping) {
    props.history.push("/shipping");
  }

  return (
    <div>
      <CheckoutSteps currentStep={2} />
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  value="paypal"
                  ref={register({ required: true })}
                />
                <label htmlFor="paypal" className="ml-3">
                  Paypal
                </label>
                <ErrorMsg msg={errors.paymentMethod?.message} />
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
