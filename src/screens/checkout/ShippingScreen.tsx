import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as cartActions from "../../store/actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import ErrorMsg from "../../components/ErrorMsg";

const schema = yup.object().shape({
  address: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  postalCode: yup
    .string()
    .matches(/^\d+$/, "Postal Code must be a number")
    .required(),
});

const ShippingScreen = (props) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { userInfo } = useSelector((state) => state.user);
  const { shipping } = useSelector((state) => state.cart);

  const onSubmit = (data) => {
    dispatch(cartActions.saveShipping(data));
    props.history.push("payment");
  };

  useEffect(() => {
    if (shipping) {
      setValue("address", shipping.address, { shouldValidate: true });
      setValue("city", shipping.city, { shouldValidate: true });
      setValue("country", shipping.country, { shouldValidate: true });
      setValue("postalCode", shipping.postalCode, { shouldValidate: true });
    }
  }, [shipping]);

  if (!userInfo) {
    props.history.push("/cart");
  }

  return (
    <div>
      <CheckoutSteps currentStep={1} />
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                ref={register({ required: true })}
              />
              <ErrorMsg msg={errors.address?.message} />
            </li>

            <li>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                ref={register({ required: true })}
              />
              <ErrorMsg msg={errors.city?.message} />
            </li>

            <li>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                ref={register({ required: true })}
              />
              <ErrorMsg msg={errors.country?.message} />
            </li>

            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                ref={register({ required: true })}
              />
              <ErrorMsg msg={errors.postalCode?.message} />
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
