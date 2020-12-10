import Cookie from "js-cookie";

import {
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
      return { ...state, loading: true };
    case USER_SIGNIN_SUCCESS:
      return { ...state, loading: false, userInfo: payload };
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
