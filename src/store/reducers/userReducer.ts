import Cookie from "js-cookie";

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
} from "../reducerIdentifiers";

const initialState = {
  loading: false,
  userInfo: Cookie.getJSON("userInfo") || null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: payload };
    case USER_SIGNIN_FAIL:
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
