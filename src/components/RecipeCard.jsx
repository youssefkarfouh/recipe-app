import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { useAppContext } from "../context/SharedData";
import ImageFallback from "./ImageFallback";
import useLocalStorage from "../hooks/useLocalStorage";

function RecipeCard({ recipe }) {
  const { name } = useParams();

  const { setSavedRecipes, savedRecipes } = useAppContext();
  const [ , setStorageData] = useLocalStorage("recipes", []);
  function isMealExist(savedData, idMeal) {
    return savedData.some((recipe) => recipe.idMeal === idMeal);
  }

  function saveRecipe(recipe) {
    const { strMealThumb, strMeal, idMeal } = recipe;
    const recipeObj = { strMealThumb, strMeal , idMeal  };
    const isRecipeExist = isMealExist(savedRecipes, idMeal);

    // if exist delete it
    if (isRecipeExist) {
      const filteredData = savedRecipes.filter((ele) => ele.idMeal !== idMeal);
      setSavedRecipes(filteredData);
      setStorageData(filteredData);
    }
    // otherwise  save it
    else {
      setSavedRecipes((prev) => [...prev, recipeObj]);
      setStorageData([...savedRecipes, recipeObj]);
    }
  }

  return (
    <div className="shadow-[0_0_10px_2px_#3333331a]">
      <div className="relative">
        <Link to={`/category/${name}/${recipe.idMeal}`}>
          <ImageFallback
            src={recipe.strMealThumb}
            alt={`${recipe.strMeal}`}
            title={`${recipe.strMeal}`}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between px-4 py-6">
        <h5 className="max-w-56 overflow-hidden text-ellipsis whitespace-nowrap text-base">
          {recipe.strMeal}{" "}
        </h5>
        <button
          className={`cursor-pointer border-0 bg-transparent p-0 text-lg  transition-all`}
        >
          <IoHeart
            size={25}
            className={`transition-colors hover:text-main ${isMealExist(savedRecipes, recipe.idMeal) ? "text-main" : "text-slate-200"}`}
            onClick={() => saveRecipe(recipe)}
          />
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
