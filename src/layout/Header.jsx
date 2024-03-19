import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import {
  IoHeartOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useClickOutside from "../hooks/useClickOutside";
import { useAppContext } from "../context/SharedData";
import useLogout from "../hooks/useLogout";
import { IconContext } from "react-icons";
import { Dropdown } from "antd";
import useAuth from "../hooks/useAuth";
import DynamicInput from "../components/DynamicInput";
import useDebounce from "../hooks/useDebounce";

function Header() {
  const { savedRecipes, setIsOpened } = useAppContext();
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const [show, setShow] = useState(false);

  const debouncedSearchValue = useDebounce(formData, 1000);

  // menu items
  const items = [
    {
      key: "1",
      label: <span>Hello {auth.user}</span>,
    },
    {
      key: "2",
      label: <Link onClick={handleLogout}>Logout</Link>,
      icon: <IoLogOutOutline />,
      danger: true,
    },
  ];

  useEffect(() => {
    // check if debouncedSearchValue not falsy value 
    Boolean(debouncedSearchValue)  && getResults(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const ref = useClickOutside(() => {
    setShow(false);
  });

  let mappedData = [
    searchList?.map((ele, index) => {
      return (
        <>
          <li key={index + 1} className="cursor-pointer p-3">
            <Link
              to={`category/${ele.strCategory}/${ele.idMeal}`}
              dangerouslySetInnerHTML={highlite(ele.strMeal, formData)}
            ></Link>
          </li>
        </>
      );
    }),
  ];

  // highlite text in the search list
  function highlite(sourceText, strHighlite) {
    let regex = new RegExp(strHighlite, "ig");
    let res = sourceText.replace(regex, `<span>${strHighlite}</span>`);

    return {
      __html: res,
    };
  }
  function handlChange(e) {
    const value = e.target.value;
    setFormData(value);
  }
  function handlSearch(e) {
    console.log("submitted");
    if (e) {
      e.preventDefault();
    }
    // setRecipes(searchList);
  }
  function getResults(searchTerm) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => {
        console.log("res", res);
        setSearchList(res.data.meals);
        setShow(true);
      });
  }
  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <IconContext.Provider value={{ size: "25px", className: "cursor-pointer" }}>
      <header className="fixed top-0 z-10 h-20 w-full bg-white">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="max-w-48">
              <Link to="/" className="block">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="relative basis-[300px]">
              <form id="form" onSubmit={handlSearch}>
                <DynamicInput
                  type="input"
                  id="searchInput"
                  name="search"
                  placeholder="search..."
                  change={handlChange}
                  inputValue={formData}
                  isRequired={false}
                />
              </form>
              <ul
                ref={ref}
                className={`absolute left-0 max-h-80 w-full overflow-auto bg-main-50 p-0 transition-all duration-300 ${show ? "visible translate-y-0 opacity-100" : "invisible translate-y-1/4 opacity-0"}`}
              >
                {mappedData}
              </ul>
            </div>
            <div className="flex gap-8">
              <div className="relative">
                <IoHeartOutline onClick={() => setIsOpened(true)} />
                <span className="absolute -right-2 -top-2 inline-block size-4 rounded-full bg-main-600 text-center text-xs  text-main-50">
                  {savedRecipes.length}
                </span>
              </div>
              <div>
                <Dropdown menu={{ items }}>
                  <IoPersonOutline />
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header>
    </IconContext.Provider>
  );
}

export default Header;
