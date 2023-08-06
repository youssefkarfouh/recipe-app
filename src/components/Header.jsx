import React, { useState } from "react";
import logo from '../assets/images/logo.png';
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import useClickOutside from "../shared/hooks/useClickOutside";

function Header({setRandom, setRecipes, savedRecipes, setIsOpened }) {

  const [formData, setFormData] = useState({ search: '' })
  const [searchList, setSearchList] = useState([])
  const [show, setShow] = useState(false)

  const ref = useClickOutside(() => {
    setShow(false)
  });

  let mappedData = searchList && formData.search !== "" ?
    [<li className="text-center" key={0}>
      <button className="btn btn-warning" onClick={handlSearch}>You want to search for : {formData.search}</button></li>]
    : [<li><a>Ooops !! Nothing Found</a></li>]

  mappedData = [searchList?.map((ele, index) => {
    return (
      <>
        <li key={index + 1} >
          <Link to={`/recipe/${ele.idMeal}`} dangerouslySetInnerHTML={highlite(ele.strMeal, formData.search)}></Link>
        </li>
      </>
    )
  }), ...mappedData]


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
  function handlSearch(e) {
    if (e) {
      e.preventDefault();
      setRandom(false)
    }
    setRecipes(searchList)
    setShow(false)
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
          <form id="form" onSubmit={handlSearch}>
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
            {mappedData}
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
