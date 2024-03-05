import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { IoHeart, IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useClickOutside from "../hooks/useClickOutside";
import { useAppContext } from "../context/SharedData";
import useLogout from "../hooks/useLogout";
import { IconContext } from "react-icons";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import useAuth from "../hooks/useAuth";

function Header() {
  const { savedRecipes, setIsOpened } = useAppContext();
  const { user } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const [formData, setFormData] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [show, setShow] = useState(false);

  // menu items
  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer">
          Hello {user}
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a  onClick={handleLogout} rel="noopener noreferrer">
          Logout
        </a>
      ),
      icon: <IoLogOutOutline />,
    },
  ];

  useEffect(() => {

    console.log("user logged" , user)
  }, []);

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

    setSearchList([]);
    setFormData(value);

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((res) => {
        console.log("res", res);
        setSearchList(res.data.meals);
        setShow(true);
      });
  }
  function handlSearch(e) {
    console.log("submitted");
    if (e) {
      e.preventDefault();
    }
    // setRecipes(searchList);
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <IconContext.Provider value={{ size: "25px" }}>
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
                <input
                  className="width-full block h-[2rem] w-full rounded-2xl border bg-slate-100  px-3 py-1 text-sm text-black outline-none"
                  type="input"
                  id="searchInput"
                  name="search"
                  placeholder="search..."
                  onChange={handlChange}
                  value={formData}
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
              <button
                className="relative cursor-pointer rounded-full border-none bg-none"
                onClick={() => setIsOpened(true)}
              >
                <IoHeart />
                <span className="bg-700 absolute -right-2 -top-2 inline-block size-4 rounded-full bg-main-600 text-xs  text-main-50">
                  {savedRecipes.length}
                </span>
              </button>
              <div className="logged-user">
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Hover me
                      <UserOutlined />
                    </Space>
                  </a>
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
