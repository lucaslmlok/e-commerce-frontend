import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import * as userActions from "../../store/actions/userActions";

const SigninScreen = (props) => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  const redirect = query.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, userInfo, error } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userActions.signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect || "/");
    }
  }, [userInfo]);

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>
            <Link
              to={`/register${redirect && `?redirect=${redirect}`}`}
              className="button secondary text-center"
            >
              Create your Amazonify account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SigninScreen;
