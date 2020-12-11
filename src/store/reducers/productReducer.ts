import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
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

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  success: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAILS_REQUEST:
    case PRODUCT_SAVE_REQUEST:
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: payload };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: payload };
    case PRODUCT_SAVE_SUCCESS:
      return { ...state, loading: false, product: payload, success: true };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAILS_FAIL:
    case PRODUCT_SAVE_FAIL:
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: payload };
    case PRODUCT_RESET_SUCCESS:
      return { ...state, success: false };
    default:
      return state;
  }
};
