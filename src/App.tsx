import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { OverlayTrigger, Popover } from "react-bootstrap";

import "./App.css";
import * as userActions from "./store/actions/userActions";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import SigninScreen from "./screens/member/SigninScreen";
import RegisterScreen from "./screens/member/RegisterScreen";
import CartScreen from "./screens/checkout/CartScreen";
import ShippingScreen from "./screens/checkout/ShippingScreen";
import PaymentScreen from "./screens/checkout/PaymentScreen";
import PlaceOrderScreen from "./screens/checkout/PlaceOrderScreen";
import AccountScreen from "./screens/member/AccountScreen";

function App() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const overlay = useRef(null);

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const popoverClick = (type: string) => {
    switch (type) {
      case "account":
        break;
      case "sign-out":
        dispatch(userActions.signOut());
        break;
    }
    document.body.click();
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/" className="ml-3">
              amazonify: React Online Shopping
            </Link>
          </div>
          <div className="header-links">
            <Link to="/cart">
              <FaShoppingCart className="topbar-icon" />
              Cart
            </Link>

            {userInfo ? (
              <OverlayTrigger
                placement="bottom"
                trigger="click"
                rootClose={true}
                overlay={
                  <Popover id="popover-positioned-bottom">
                    <Popover.Content className="popover">
                      <h5>Your Account</h5>
                      <ul>
                        <li>
                          <Link
                            to="/account"
                            onClick={() => popoverClick("account")}
                          >
                            Account
                          </Link>
                        </li>
                        <li>
                          <Link to="#" onClick={() => popoverClick("sign-out")}>
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </Popover.Content>
                  </Popover>
                }
              >
                <Link to="#">
                  <FaUser className="topbar-icon" />
                  {userInfo.name}
                </Link>
              </OverlayTrigger>
            ) : (
              <Link to="/signin">
                <FaUser className="topbar-icon" />
                Signin
              </Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-btn" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="#">Pants</a>
            </li>
            <li>
              <a href="#">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/account" component={AccountScreen} />

            <Route path="/products" component={ProductsScreen} />
            <Route path="/product/:id" component={ProductScreen} />

            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />

            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
