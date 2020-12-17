import { useSelector } from "react-redux";
import { parseISO, format } from "date-fns";
import { Link, useHistory } from "react-router-dom";

const OrderItem = ({ order }) => {
  const { userInfo } = useSelector((state) => state.user);
  const history = useHistory();

  const orderDate = format(parseISO(order.orderDate), "MMMM d, yyyy");

  return (
    <div className="orders-item">
      <div className="order-item-header">
        <div className="order-item-header-left">
          <div>
            <div>ORDER PLACED</div>
            <div>{orderDate}</div>
          </div>
          <div>
            <div>TOTAL</div>
            <div>${order.price.totalPrice}</div>
          </div>
          <div>
            <div>SHIP TO</div>
            <div>{userInfo.name}</div>
          </div>
        </div>
        <div className="order-item-header-right">
          <div>ORDER # {order._id}</div>
          <div>
            <Link to="#">Order Details</Link>
          </div>
        </div>
      </div>
      <div className="order-item-main">
        <div className="order-delivered">Delivered {orderDate}</div>
        {order.items.map((item) => (
          <div className="order-item" key={`${order._id}_${item.productId}`}>
            <div className="order-item-info">
              <img src={item.image} alt={item.name} />
              <div className="order-item-details">
                <Link to={`/product/${item.productId}`}>{item.name}</Link>
                <div>QTY: {item.qty}</div>
                <div className="price-text">
                  Price: ${item.price * item.qty}
                </div>
              </div>
            </div>
            <button
              className="button primary mt-2"
              onClick={() => history.push(`/product/${item.productId}`)}
            >
              Buy it again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
