import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import CheckoutSteps from "../../components/CheckoutSteps";
import * as cartActions from "../../store/actions/cartActions";

interface ParamTypes {
  id: string;
}

const PlaceOrderScreen = (props) => {
  const dispatch = useDispatch();
  const {
    cartItems,
    shipping,
    payment,
    orderInfo,
    loading,
    error,
  } = useSelector((state) => state.cart);

  const itemsPrice = cartItems.reduce((acc, cur) => {
    return acc + cur.price * cur.qty;
  }, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    dispatch(
      cartActions.placeOrder({
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  useEffect(() => {
    if (orderInfo && orderInfo._id) {
      const orderId = orderInfo._id;
      dispatch(cartActions.clearCart());
      props.history.push(`/order_success/${orderId}`);
    }
  }, [orderInfo]);

  if (!shipping) {
    props.history.push("/shipping");
  }

  if (!payment) {
    props.history.push("/payment");
  }

  return (
    <div>
      <CheckoutSteps currentStep={3} />
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {`${shipping.address}, ${shipping.city}, ${shipping.country}, ${shipping.postalCode}`}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>{payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
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
                      <Link to="#">{item.name}</Link>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={() => placeOrderHandler()}
                disabled={loading}
              >
                Place Order
                {loading && (
                  <div className="loading-icon">
                    <ClipLoader size={20} color="#fff" />
                  </div>
                )}
              </button>
            </li>
            {error && (
              <li>
                <div className="text-danger">{error}</div>
              </li>
            )}
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
