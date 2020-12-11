import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import * as cartActions from "../../store/actions/cartActions";

interface ParamTypes {
  id: string;
}

const CartScreen = (props) => {
  const { id: paramId } = useParams<ParamTypes>();
  const query = new URLSearchParams(useLocation().search);
  const qty = +query.get("qty") || 1;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const removeFormCartHandler = (productId) => {
    dispatch(cartActions.removeFormCart(productId));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (paramId) {
      dispatch(cartActions.addToCart(paramId, qty));
    }
  }, []);

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li className="pb-2">
            <h1>Shopping Cart</h1>
            <h4>Price</h4>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-name">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <div>
                    Qty:{" "}
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          cartActions.addToCart(item.product, +e.target.value)
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => removeFormCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3 className="font-weight-normal">
          Subtotal ({cartItems.reduce((acc, cur) => acc + cur.qty, 0)} items) :{" "}
          <b>
            $ {cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)}
          </b>
        </h3>
        <button
          className="button primary full-width mt-4"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
