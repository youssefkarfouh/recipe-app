import React from "react";
import logo from '../../assets/images/logo.png';
import { IoHeart } from "react-icons/io5";

import { Link } from "react-router-dom";

function Header({savedRecipes , setIsOpened}) {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="search-container">
          <form id="form">
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
          <button onClick={()=>setIsOpened(true)}>
            <span className="fav-icon">
              <IoHeart />
            </span>
            <span className="fav-number">{savedRecipes.length}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
