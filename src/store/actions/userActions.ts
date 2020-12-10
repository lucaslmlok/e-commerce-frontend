import axios from "axios";
import Cookie from "js-cookie";

import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from "../reducerIdentifiers";

export const signin = (email: string, password: string) => {
  return async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });

    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: err.message });
    }
  };
};
