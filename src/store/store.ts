import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";

const state = {};

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
});

const composeEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  state,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
