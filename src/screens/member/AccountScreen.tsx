import React from "react";
import { FaBox } from "react-icons/fa";

const MenuButton = (props) => {
  const { title, desc, onClick } = props;
  return (
    <div className="account-btn" onClick={onClick}>
      <div className="account-btn-left">
        <FaBox />
      </div>
      <div className="account-btn-right">
        <h4>{title}</h4>
        <div>{desc}</div>
      </div>
    </div>
  );
};

const Account = (props) => {
  return (
    <div className="account-page">
      <div>
        <h3>Your Account</h3>
      </div>

      <div className="account-btn-list">
        <MenuButton
          title="Your Orders"
          desc="track, return or buy things again"
          onClick={() => props.history.push("/orders")}
        />
        <MenuButton
          title="Login & security"
          desc="Edit login, name, and mobile number"
          onClick={() => props.history.push("/account-info")}
        />
      </div>
    </div>
  );
};

export default Account;
