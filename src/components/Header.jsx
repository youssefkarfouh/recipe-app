import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

import { IoHeart } from "react-icons/io5";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="search-container">
          <form id="form" action="">
            <input
              type="search"
              id="searchInput"
              name="search"
              placeholder="search..."
            />
          </form>
          <ul className="search-list"></ul>
        </div>
        <div className="favorites-container">
          <button className="fav-icon">
            <IoHeart />
            <span className="fav-number">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
