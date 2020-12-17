import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import OrderItem from "../../components/OrderItem";
import { API_ROOT } from "../..";

const OrderScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const { userInfo } = useSelector((state) => state.user);

  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_ROOT}/api/order`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setOrders(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-breadcrumb">
        <span>
          <Link to="/account">Your Account</Link>
        </span>
        <span className="mx-2">{">"}</span>
        <span>Your Orders</span>
      </div>

      <h1 className="my-4">Your Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderScreen;
