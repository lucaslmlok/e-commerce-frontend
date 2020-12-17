import axios from "axios";
import Cookie from "js-cookie";

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGN_OUT,
} from "../reducerIdentifiers";
import { API_ROOT } from "../..";

export const signin = (email: string, password: string) => {
  return async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });

    try {
      const { data } = await axios.post(`${API_ROOT}/api/users/signin`, {
        email,
        password,
      });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: err.response.data.msg });
    }
  };
};

export const register = (name: string, email: string, password: string) => {
  return async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
      const { data } = await axios.post(`${API_ROOT}/api/users/register`, {
        name,
        email,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookie.set("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({ type: USER_REGISTER_FAIL, payload: err.response.data.msg });
    }
  };
};

export const signOut = () => {
  Cookie.remove("userInfo");
  return {
    type: USER_SIGN_OUT,
  };
};
