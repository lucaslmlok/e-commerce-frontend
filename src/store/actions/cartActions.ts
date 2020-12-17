import axios from "axios";
import Cookie from "js-cookie";
import { API_ROOT } from "../..";

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

export const addToCart = (productId: string, qty: number) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${API_ROOT}/api/products/${productId}`);
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty: qty,
        },
      });
      const { cartItems } = getState().cart;
      Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (err) {
      dispatch({});
    }
  };
};

export const removeFormCart = (productId) => {
  return (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId,
    });
    const { cartItems } = getState().cart;
    Cookie.set("cartItems", JSON.stringify(cartItems));
  };
};

export const saveShipping = (data) => ({
  type: CART_SAVE_SHIPPING,
  payload: data,
});

export const savePayment = (data) => ({
  type: CART_SAVE_PAYMENT,
  payload: data,
});

export const placeOrder = (price) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().user;
    const { cartItems, shipping, payment } = getState().cart;
    dispatch({ type: PLACE_ORDER_REQUEST });

    try {
      const { data } = await axios.post(
        `${API_ROOT}/api/order`,
        { cartItems, shipping, payment, price },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: PLACE_ORDER_SUCCESS, payload: data.data });
    } catch (err) {
      dispatch({ type: PLACE_ORDER_FAIL, payload: err.response.data.msg });
    }
  };
};

export const clearCart = () => {
  Cookie.remove("cartItems");
  return {
    type: CART_CLEAR,
  };
};
