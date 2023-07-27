import React from "react";
import logo from '../assets/images/logo.png';

function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <a href="index.html">
            <img src={logo} alt="logo" />
          </a>
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
          <button>
            <span className="fav-icon">
              <i className="fa-solid fa-heart"></i>
            </span>
            <span className="fav-number">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
