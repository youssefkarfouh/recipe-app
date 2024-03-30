import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import {
  IoHeartOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoLaptopOutline,
  IoPhonePortraitOutline,
  IoTabletPortraitOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useClickOutside from "../hooks/useClickOutside";
import { useAppContext } from "../context/SharedData";
import useLogout from "../hooks/useLogout";
import { IconContext } from "react-icons";
import { Dropdown } from "antd";
import useAuth from "../hooks/useAuth";
import DynamicInput from "../components/DynamicInput";
import useDebounce from "../hooks/useDebounce";
import useAxios from "../hooks/useAxios";
import useResize from "../hooks/useResize";
import useModeToglle from "../hooks/useModeToglle";

function Header() {
  const { savedRecipes, setIsOpened } = useAppContext();
  const [response, error, loading, axiosFetch] = useAxios();
  // const windowSize = useResize();
  const [theme, setTheme] = useModeToglle();

  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
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
  // when click outside
  const ref = useClickOutside(() => {
    setShow(false);
  });

  useEffect(() => {
    // check if debouncedSearchValue not falsy value
    Boolean(debouncedSearchValue) && getResults(debouncedSearchValue);
  }, [debouncedSearchValue]);

  function handleClick(meal) {
    navigate(`/category/${meal.strCategory}/${meal.idMeal}`);
    setShow(false);
  }

  let mappedData = [
    response.meals?.map((ele, index) => {
      return (
        // dangerouslySetInnerHTML={highlite(ele.strMeal, formData)}
        <>
          <li
            key={index}
            onClick={() => handleClick(ele)}
            className="cursor-pointer p-3"
            dangerouslySetInnerHTML={highlite(ele.strMeal, formData)}
          ></li>
        </>
      );
    }),
  ];

  // highlite text in the search list
  function highlite(sourceText, strHighlite) {
    let regex = new RegExp(strHighlite, "ig");
    let res = sourceText.replace(
      regex,
      `<span className='font-bold'>${strHighlite}</span>`,
    );

    return {
      __html: res,
    };
  }
  function handlChange(e) {
    setFormData(e.target.value);
  }

  function getResults(searchTerm) {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: `/search.php`,
      requestConfig: {
        params: {
          s: searchTerm,
        },
      },
    });

    setShow(true);
  }
  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <IconContext.Provider value={{ size: "25px", className: "cursor-pointer" }}>
      <header className="fixed top-0 z-10 w-full bg-white shadow-sm">
        <div className="px©-2 container md:px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 py-4 md:justify-between">
            <div className="max-w-48">
              <Link to="/" className="block">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="relative order-2 basis-[300px] md:order-1">
              <form id="form">
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
            <div className="order-1   flex gap-8  md:order-2">
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
              <div className="flex gap-2">
                {theme === "light" && (
                  <IoMoonOutline onClick={() => setTheme("dark")} />
                )}
                {theme === "dark" && (
                  <IoSunnyOutline onClick={() => setTheme("light")} />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </IconContext.Provider>
  );
}

export default Header;

{
  /* {windowSize < 576 ? (
                  <IoPhonePortraitOutline />
                ) : windowSize < 992 ? (
                  <IoTabletPortraitOutline />
                ) : (
                  <IoLaptopOutline />
                )} */
}
