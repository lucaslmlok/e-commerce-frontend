import Cookie from "js-cookie";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../reducerIdentifiers";

const initialState = {
  cartItems: Cookie.getJSON("cartItems") || [],
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
    default:
      return state;
  }
};
