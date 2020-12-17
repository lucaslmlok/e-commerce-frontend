import { Link, useParams } from "react-router-dom";

interface ParamTypes {
  order_no: string;
}

const OrderSuccessScreen = (props) => {
  const { order_no } = useParams<ParamTypes>();

  return (
    <div className="success-page">
      <div className="success-msg-box">
        <h1>Order is Placed Successfully.</h1>
        {order_no && (
          <div className="success-msg-box-info">
            Order No: <b>{order_no}</b>
          </div>
        )}
        <div className="success-msg-box-container">
          <Link to="/orders">View Orders</Link>
          <Link to="/account">My Account</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessScreen;
