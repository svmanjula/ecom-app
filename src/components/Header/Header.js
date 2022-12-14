import React, { useContext, useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import { BiHeart } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { CartContext } from "../../context/CartContext/CartContext";
import { FilterContext } from "../../context/FilterContext/FilterContext";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Header = () => {
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const location = useLocation();
  const { authUser, logout } = useContext(AuthContext);

  const {
    filterDispatch,
    filterState: { bySearch },
  } = useContext(FilterContext);

  const {
    productState: { wishlist, cart },
  } = useContext(CartContext);

  const handleToggle = () => {
    setHamburgerClick(!hamburgerClick);
  };

  return (
    <div className="navbar">
      <div className="nav-elements">

      <Link
          className="toggle-button"
          onClick={() => {
            handleToggle();
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </Link>
        <div className="brand-title">TrendsZone</div>
       

        {hamburgerClick && (
          <div className="hamburger">
            <div className="hamburger-user">
              <div>
                <FaRegUserCircle />
              </div>
              <div> Welcome </div>

              <div
                className="cancel-icon "
                onClick={() => {
                  handleToggle();
                }}
              >
                X
              </div>
            </div>
            <div className="hamburger-links">
              <Link exact to="/" className="hamburger-link ">
                Home
              </Link>
              <Link to="/product" className="hamburger-link ">
                Shop now
              </Link>
              <Link to="/login" className="hamburger-link ">
                Login
              </Link>
            </div>
          </div>
        )}

        <Link exact to="/" className="nav-link  linkStyle media-query">
          Home
        </Link>
        <Link to="/product" className="nav-link linkStyle media-query">
          Shop now
        </Link>
      </div>
      <div className="nav-elements">
        {location.pathname === "/product" && (
          <input
            placeholder="search..."
            className="search-element"
            onChange={(e) => {
              filterDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
            
          />
        )}
      </div>
      <div className="nav-elements  nav-icons-container">
        <Link
          to="/login"
          className=" linkStyle nav-element media-query nav-profile"
        >
          <MdPersonOutline className="nav-icons " />
          <div className="icon-type">
            {authUser ? (
              <div
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </div>
            ) : (
              <div>Login </div>
            )}
          </div>
        </Link>

        <Link to="/wishlist" className="nav-element linkStyle ">
          <BiHeart className="nav-icons " />
          <div className="icon-type ">Wishlist</div>
          <div className="badge">{wishlist.length} </div>
        </Link>
        <Link to="/checkout" className="nav-element linkStyle">
          <BsCart3 className="nav-icons" />
          <div className="icon-type">Cart</div>
          <div className="badge">{cart.length}</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
