import axios from "axios";
import Cookie from "js-cookie";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
} from "../reducerIdentifiers";

export const addToCart = (productId: string, qty: number) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
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
