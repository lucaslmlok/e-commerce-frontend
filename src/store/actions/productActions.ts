import axios from "axios";

import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_RESET_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
} from "../reducerIdentifiers";
import { API_ROOT } from "../..";

export const listProduct = () => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    try {
      const { data } = await axios.get(`${API_ROOT}/api/products`);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: err.response.data.msg });
    }
  };
};

export const detailsProduct = (productId: string) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

    try {
      const { data } = await axios.get(`${API_ROOT}/api/products/${productId}`);
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: err.response.data.msg,
      });
    }
  };
};

export const saveProduct = (product) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().user;
    dispatch({ type: PRODUCT_SAVE_REQUEST });

    try {
      if (product._id) {
        const { data } = await axios.put(
          `${API_ROOT}/api/products/${product._id}`,
          product,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.post(`${API_ROOT}/api/products`, product, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
    } catch (err) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: err.response.data.msg });
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().user;
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    try {
      const { data } = await axios.delete(
        `${API_ROOT}/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: err.response.data.msg });
    }
  };
};

export const resetSuccess = () => ({
  type: PRODUCT_RESET_SUCCESS,
});
