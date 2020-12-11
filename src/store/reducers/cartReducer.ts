import Cookie from "js-cookie";

import {
  CART_ADD_ITEM,
  CART_CLEAR,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "../reducerIdentifiers";

const initialState = {
  cartItems: Cookie.getJSON("cartItems") || [],
  shipping: null,
  payment: null,
  loading: false,
  orderInfo: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      const existingProduct = state.cartItems.find((item) => {
        return item.product === payload.product;
      });
      if (existingProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            return item.product === existingProduct.product ? payload : item;
          }),
        };
      }
      return { ...state, cartItems: [...state.cartItems, payload] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: payload };
    case PLACE_ORDER_REQUEST:
      return { ...state, loading: true };
    case PLACE_ORDER_SUCCESS:
      return { ...state, loading: false, orderInfo: payload };
    case PLACE_ORDER_FAIL:
      return { ...state, loading: false, error: payload };
    case CART_CLEAR:
      return initialState;
    default:
      return state;
  }
};
