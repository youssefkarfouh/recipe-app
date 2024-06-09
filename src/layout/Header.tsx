import React, { useState } from "react";

import {
  IoHeartOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";
import { useAppContext } from "../context/SharedData";
import useLogout from "../hooks/useLogout";
import { IconContext } from "react-icons";
import { Button, Dropdown, Form, FormProps, Input } from "antd";
import useAuth from "../hooks/useAuth";
import useDebounce from "../hooks/useDebounce";
import useModeToglle from "../hooks/useModeToglle";
import Logo from "../components/svg/Logo";
import { useQuery } from "@tanstack/react-query";
import { searchRecipe } from "../api/endpoints";

type FieldType = {
  search?: string;
}

function Header() {
  const [formData, setFormData] = useState("");
  const [show, setShow] = useState(false);

  const debouncedSearchValue = useDebounce(formData, 1000);

  const { data, error, isLoading } = useQuery({
    queryKey: ["searchResults", debouncedSearchValue],
    queryFn: () => searchRecipe(debouncedSearchValue),
    enabled: Boolean(debouncedSearchValue),
  });

  const { savedRecipes, setIsOpened } = useAppContext();
  const [theme, setTheme] = useModeToglle();

  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  // menu items
  const items = [
    {
      key: "1",
      label: <span>Hello {auth.user}</span>,
    },
    {
      key: "2",
      label: <Button onClick={handleLogout}>Logout</Button>,
      icon: <IoLogOutOutline />,
      danger: true,
    },
  ];
  // when click outside
  const ref = useClickOutside(() => {
    setShow(false);
  });

  function handleClick(meal) {
    navigate(`/category/${meal.strCategory}/${meal.idMeal}`);
    setShow(false);
  }

  let mappedData = [
    data?.meals?.map((ele, index) => {
      return (
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
  function highlite(sourceText: string, strHighlite: string) {
    let regex = new RegExp(strHighlite, "ig");
    let res = sourceText.replace(
      regex,
      `<span className='font-bold'>${strHighlite}</span>`,
    );

    return {
      __html: res,
    };
  }

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  }

  return (
    <IconContext.Provider
      value={{
        className: "cursor-pointer text-darkColor text-xl dark:text-white",
      }}
    >
      <header className="fixed top-0 z-10 w-full bg-white shadow-sm dark:bg-darkColor">
        <div className="container px-2 md:px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 py-2 md:justify-between">
            <div>
              <Link to="/" className="block">
                <Logo color={theme === "dark" ? "white" : "black"} />
              </Link>
            </div>
            <div className="relative order-2 basis-[300px] md:order-1">
              <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item<FieldType>
                  name="search"
                >
                  <Input placeholder="username" />
                </Form.Item>

              </Form>
              <ul
                ref={ref}
                className={`absolute left-0 max-h-80 w-full overflow-auto bg-main-50 p-0 transition-all duration-300 ${show ? "visible translate-y-0 opacity-100" : "invisible translate-y-1/4 opacity-0"}`}
              >
                {mappedData}
              </ul>
            </div>
            <div className="order-1 flex items-center gap-6 md:order-2">
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
              <div className="flex">
                <span
                  className={`rounded-full p-1 shadow-[inset_0px_0px_5px_0px_#514f4f59]`}
                >
                  {theme === "light" && (
                    <IoMoonOutline onClick={() => setTheme("dark")} />
                  )}
                  {theme === "dark" && (
                    <IoSunnyOutline onClick={() => setTheme("light")} />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </IconContext.Provider>
  );
}

export default Header;
