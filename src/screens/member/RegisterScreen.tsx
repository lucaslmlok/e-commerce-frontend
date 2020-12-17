import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as userActions from "../../store/actions/userActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import ErrorMsg from "../../components/ErrorMsg";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  rePassword: yup.string().required("Re-Enter Password is a required field"),
});

const RegisterScreen = (props) => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  const redirect = query.get("redirect");

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [rePasswordError, setRePasswordError] = useState(false);

  const { loading, userInfo, error } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    if (data.password !== data.rePassword) {
      setRePasswordError(true);
      return;
    }
    dispatch(userActions.register(data.name, data.email, data.password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect || "/");
    }
  }, [userInfo]);

  return (
    <div>
      {redirect && <CheckoutSteps currentStep={0} />}
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="form-container">
            <li>
              <h2>Create Account</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li>
            <li>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" ref={register} />
              <ErrorMsg msg={errors.name?.message} />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" ref={register} />
              <ErrorMsg msg={errors.email?.message} />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                ref={register}
                onChange={() => {
                  setRePasswordError(false);
                }}
              />
              <ErrorMsg msg={errors.password?.message} />
            </li>
            <li>
              <label htmlFor="rePassword">Re-Enter Password</label>
              <input
                type="rePassword"
                name="rePassword"
                id="rePassword"
                ref={register}
                onChange={() => {
                  setRePasswordError(false);
                }}
              />
              <ErrorMsg msg={errors.rePassword?.message} />
              <ErrorMsg
                msg={
                  rePasswordError &&
                  "Re-Enter Password must be the same as Password"
                }
              />
            </li>
            <li>
              <button type="submit" className="button primary">
                Register
              </button>
            </li>
            <li>
              Already have an account?
              <Link
                to={`/signin${redirect ? `?redirect=${redirect}` : ''}`}
                className="button secondary text-center"
              >
                Sign-in
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
