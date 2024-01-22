import React, { useEffect, useRef } from "react";

import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoRemoveCircleSharp } from "react-icons/io5";
import useClickOutside from "../hooks/useClickOutside";
import { useAppContext } from "../context/SharedData";
import { IconContext } from "react-icons";

const Aside = () => {
  const { savedRecipes, setSavedRecipes, isOpened, setIsOpened } =
    useAppContext();

  // styling
  const asideStyle = `fixed text-base right-0 bg-white top-0 w-[300px] min-h-screen overflow-auto p-4 z-50 shadow-[0_0_13px_-7px_black] transition  ${isOpened ? "translate-x-0" : "translate-x-full"}`;

  useEffect(() => {
    function getSavedRecipes() {
      const data = JSON.parse(localStorage.getItem("recipes"));

      if (data) setSavedRecipes(data);
    }
    getSavedRecipes();
  }, []);

  const ref = useClickOutside(() => {
    setIsOpened(false);
  });

  function removeMeal(idMeal) {
    const filteredData = savedRecipes.filter((ele) => ele.idMeal !== idMeal);
    setSavedRecipes((prev) => filteredData);
    localStorage.setItem("recipes", JSON.stringify(filteredData));
  }

  const savedData = savedRecipes.map((ele, index) => {
    return (
      <li key={index} className="relative basis-16">
        {/* /category/Pork/52885 */}
        <Link to={`/category/${ele.idMeal}`}>
          <img
            className="block rounded-full"
            src={ele.strMealThumb}
            alt={ele}
          />
        </Link>
        <span
          className="absolute right-0 top-0 h-5 w-5 "
          onClick={() => removeMeal(ele.idMeal)}
        >
          <IoRemoveCircleSharp title="Remove meal from saved recipes" />
        </span>
      </li>
    );
  });

  return (
    <IconContext.Provider
      value={{
        className:
          "text-slate-950 hover:text-main cursor-pointer transition-colors",
      }}
    >
      <aside ref={ref} className={asideStyle}>
        <span
          className="absolute right-4 top-4"
          onClick={() => setIsOpened(false)}
        >
         
          <IoClose size={20}/>
        </span>
        <h4 className="text-lg">Favorite Meals</h4>
        <ul className="my-4 flex flex-wrap justify-center gap-4">
          {savedData}
        </ul>
      </aside>
    </IconContext.Provider>
  );
};

export default Aside;
