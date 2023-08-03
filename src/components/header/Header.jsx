import React, { useRef, useState } from "react";
import logo from '../../assets/images/logo.png';
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import useClickOutside from "../../shared/hooks/useClickOutside";


function Header({ savedRecipes, setIsOpened }) {

  const [formData, setFormData] = useState({ search: '' })
  const [searchList, setSearchList] = useState([])
  const [show, setShow] = useState([])

  const ref = useClickOutside(() => {
    setShow(false)
  });

  console.log("ref in header" , ref);

  const mappedData = searchList?.map(ele => {
    return (
      <>
        <li>
          <Link to={`/recipe/${ele.idMeal}`} dangerouslySetInnerHTML={highlite(ele.strMeal, formData.search)}></Link>
        </li>
      </>
    )
  })

function handlSubmit(e){
  e.preventDefault();
  console.log("submitted")
}
  function highlite(sourceText, strHighlite) {

    let regex = new RegExp(strHighlite, "ig");
    let res = sourceText.replace(regex, `<span>${strHighlite}</span>`);

    return {
      __html: res // Wrap the result in an object with "__html" key
    };

  }

  function handlChange(e) {

    const value = e.target.value;

    setShow(true)
    setSearchList([]);
    setFormData({ search: value })

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((res) => {
        setSearchList(res.data.meals);
      });

  }
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="search-container">
          <form id="form" onSubmit={handlSubmit}>
            <input
              type="search"
              id="searchInput"
              name="search"
              placeholder="search..."
              onChange={handlChange}
              value={formData.search}
            />
          </form>
          <ul ref={ref} className={`search-list ${show ? 'show' : ""}`}>
            {mappedData ? mappedData : <li><a>Ooops !! Nothing Found</a></li>}
          </ul>
        </div>
        <div className="favorites-container">
          <button className="fav-icon" onClick={() => setIsOpened(true)}>
            <IoHeart />
            <span
              className="fav-number"
            >
              {savedRecipes.length}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
