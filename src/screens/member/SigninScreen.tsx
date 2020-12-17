import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as userActions from "../../store/actions/userActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import ErrorMsg from "../../components/ErrorMsg";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SigninScreen = (props) => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  const redirect = query.get("redirect");

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const { loading, userInfo, error } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(userActions.signin(data.email, data.password));
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
              <h2>Sign-In</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div className="text-danger">{error}</div>}
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
              />
              <ErrorMsg msg={errors.password?.message} />
            </li>
            <li>
              <button type="submit" className="button primary">
                Signin
              </button>
            </li>
            <li>
              <Link
                to={`/register${redirect ? `?redirect=${redirect}` : ''}`}
                className="button secondary text-center"
              >
                Create your Amazonify account
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default SigninScreen;
